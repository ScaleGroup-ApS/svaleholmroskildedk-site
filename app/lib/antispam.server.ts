// ─────────────────────────────────────────────────────────────────────────────
// Server-only spam defence for the contact form (app/routes/kontakt.tsx).
//
// Layered, cheapest-first — a bot has to beat all of them, a human meets none
// of them:
//
//   1. Honeypot      – hidden fields no human can see; bots fill them in.
//   2. Signed timing – the form carries an HMAC-signed issue-time. A submit
//                      faster than MIN_FILL_SECONDS, with no token, or with a
//                      forged/expired one, is not a human filling a form.
//   3. Rate limit    – per-IP sliding windows, in-memory.
//   4. Heuristics    – link count, non-Latin script, SEO/crypto spam phrases,
//                      junk phone numbers. Scored, not absolute.
//   5. Turnstile     – Cloudflare's privacy-friendly CAPTCHA, verified here.
//                      Only active when TURNSTILE_SECRET_KEY is set, so the
//                      form keeps working untouched until keys are provisioned.
//
// Env vars (set them in App Settings in the CRM — customer 24 → app `api` —
// the same place CRM_API_TOKEN comes from, not in a manifest in this repo):
//
//   TURNSTILE_SITE_KEY    – public key; presence renders the widget
//   TURNSTILE_SECRET_KEY  – private key; presence enforces verification
//   FORM_TOKEN_SECRET     – optional HMAC secret for the timing token
//
// FORM_TOKEN_SECRET falls back to CRM_API_TOKEN because that value is already
// shared by every replica, so a token minted by one pod validates on another.
// Only when neither is set do we fall back to a per-process random secret —
// and without CRM_API_TOKEN the form cannot deliver anything anyway.
// ─────────────────────────────────────────────────────────────────────────────

import { createHmac, randomBytes, timingSafeEqual } from "node:crypto";

// ── Tunables ─────────────────────────────────────────────────────────────────

/** A human cannot fill in name + phone faster than this. */
const MIN_FILL_SECONDS = 3;
/** How long a rendered form stays submittable before it must be reloaded. */
const MAX_FORM_AGE_SECONDS = 12 * 60 * 60;
/** Per-IP sliding windows: [seconds, max submissions]. */
const RATE_WINDOWS: Array<[seconds: number, max: number]> = [
  [15 * 60, 5],
  [24 * 60 * 60, 20],
];
/** Heuristic score at or above which a submission is treated as spam. */
const SPAM_SCORE_THRESHOLD = 5;
/** Field length caps — anything longer is a bot, not an enquiry. */
const MAX_LEN = { name: 120, phone: 40, email: 200, message: 5000 } as const;

// ── Signed timing token ──────────────────────────────────────────────────────

const TOKEN_SECRET =
  process.env.FORM_TOKEN_SECRET ||
  process.env.CRM_API_TOKEN ||
  randomBytes(32).toString("hex");

/** Name of the hidden field carrying the timing token. */
export const FORM_TOKEN_FIELD = "_fts";
/**
 * Names of the honeypot fields. Deliberately NOT `company` / `website` /
 * `address`: those match Chrome's address-profile schema and password-manager
 * heuristics, so a customer with autofill on would fill them in and have a
 * genuine enquiry thrown away. These two are plausible to a form-scraping bot
 * (which fills every input it finds) and meaningless to an autofiller.
 */
export const HONEYPOT_FIELDS = ["subject_line", "contact_url"] as const;

function sign(payload: string): string {
  return createHmac("sha256", TOKEN_SECRET).update(payload).digest("base64url");
}

/** Mint a token for a freshly rendered form. Call this from the loader. */
export function issueFormToken(nowMs = Date.now()): string {
  const payload = `${nowMs}.${randomBytes(6).toString("base64url")}`;
  return `${payload}.${sign(payload)}`;
}

type TokenVerdict = "ok" | "missing" | "invalid" | "expired" | "too-fast";

function verifyFormToken(raw: string | null, nowMs: number): TokenVerdict {
  if (!raw) return "missing";
  const idx = raw.lastIndexOf(".");
  if (idx < 1) return "invalid";
  const payload = raw.slice(0, idx);
  const given = Buffer.from(raw.slice(idx + 1));
  const expected = Buffer.from(sign(payload));
  if (given.length !== expected.length || !timingSafeEqual(given, expected)) {
    return "invalid";
  }
  const issuedAt = Number(payload.slice(0, payload.indexOf(".")));
  if (!Number.isFinite(issuedAt)) return "invalid";
  const ageSeconds = (nowMs - issuedAt) / 1000;
  if (ageSeconds > MAX_FORM_AGE_SECONDS || ageSeconds < -60) return "expired";
  if (ageSeconds < MIN_FILL_SECONDS) return "too-fast";
  return "ok";
}

// ── Per-IP rate limiting ─────────────────────────────────────────────────────
//
// In-memory and therefore per-pod: with N replicas the effective limit is N×.
// That is fine — this is a blunt flood-stop, not an access-control boundary,
// and the layers above do the discriminating work.

const LONGEST_WINDOW_MS = Math.max(...RATE_WINDOWS.map(([s]) => s)) * 1000;
const MAX_TRACKED_IPS = 5000;
const hits = new Map<string, number[]>();

function prune(nowMs: number) {
  for (const [ip, stamps] of hits) {
    const live = stamps.filter((t) => nowMs - t < LONGEST_WINDOW_MS);
    if (live.length === 0) hits.delete(ip);
    else hits.set(ip, live);
  }
  // Map preserves insertion order, so the first keys are the least recently
  // created — drop those if a flood from many IPs grows the map unbounded.
  if (hits.size > MAX_TRACKED_IPS) {
    for (const ip of [...hits.keys()].slice(0, hits.size - MAX_TRACKED_IPS)) {
      hits.delete(ip);
    }
  }
}

function rateLimited(ip: string | undefined, nowMs: number): boolean {
  if (!ip) return false; // No IP to attribute — let the other layers decide.
  prune(nowMs);
  const stamps = hits.get(ip) ?? [];
  const exceeded = RATE_WINDOWS.some(
    ([seconds, max]) => stamps.filter((t) => nowMs - t < seconds * 1000).length >= max,
  );
  if (!exceeded) {
    stamps.push(nowMs);
    hits.set(ip, stamps);
  }
  return exceeded;
}

// ── Content heuristics ───────────────────────────────────────────────────────

const LINK_RE = /(https?:\/\/|www\.|\b[a-z0-9-]+\.(com|net|org|ru|cn|xyz|top|shop|online|info|biz|club)\b)/gi;
const MARKUP_RE = /(\[url[=\]]|<a\s+href|\[link[=\]]|\{link\})/i;
const NON_LATIN_RE = /[\u0400-\u04FF\u0370-\u03FF\u0590-\u05FF\u0600-\u06FF\u4E00-\u9FFF\u3040-\u30FF]/g;

// Deliberately English/marketing-heavy: the real enquiries here are Danish
// (and occasionally English) messages about weddings, rooms and parties.
const SPAM_PHRASES = [
  "seo", "backlink", "guest post", "link building", "rank #1", "first page of google",
  "increase your traffic", "web design service", "digital marketing", "crypto",
  "bitcoin", "forex", "casino", "viagra", "cialis", "loan offer", "make money",
  "work from home", "click here", "buy now", "cheap price", "free trial",
  "telegram", "whatsapp me", "investment opportunity", "dear sir/madam",
];

function scoreContent(f: { name: string; phone: string; email: string; message: string }): {
  score: number;
  reasons: string[];
} {
  const reasons: string[] = [];
  let score = 0;
  const haystack = `${f.name} ${f.message}`;
  const lower = haystack.toLowerCase();

  const links = haystack.match(LINK_RE)?.length ?? 0;
  if (links === 1) { score += 2; reasons.push("1 link"); }
  else if (links > 1) { score += 4; reasons.push(`${links} links`); }

  if (MARKUP_RE.test(haystack)) { score += 4; reasons.push("link markup"); }

  const nonLatin = haystack.match(NON_LATIN_RE)?.length ?? 0;
  if (nonLatin > 3) { score += 4; reasons.push(`non-latin x${nonLatin}`); }

  const phrases = SPAM_PHRASES.filter((p) => lower.includes(p));
  if (phrases.length > 0) {
    score += Math.min(6, 3 * phrases.length);
    reasons.push(`phrases: ${phrases.slice(0, 3).join(", ")}`);
  }

  if (/https?:|www\./i.test(f.name)) { score += 4; reasons.push("url in name"); }

  // Danish numbers are 8 digits; international ones more. Fewer than 6 digits
  // is not a phone number anyone can be reached on.
  if (f.phone.replace(/\D/g, "").length < 6) { score += 3; reasons.push("junk phone"); }

  if (f.email && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(f.email)) {
    score += 3;
    reasons.push("malformed email");
  }

  return { score, reasons };
}

// ── Cloudflare Turnstile ─────────────────────────────────────────────────────

const TURNSTILE_SECRET_KEY = process.env.TURNSTILE_SECRET_KEY;
const TURNSTILE_SITE_KEY = process.env.TURNSTILE_SITE_KEY;
const TURNSTILE_VERIFY_URL = "https://challenges.cloudflare.com/turnstile/v0/siteverify";

/** The public site key, for the loader to hand to the widget (null = off). */
export function turnstileSiteKey(): string | null {
  return TURNSTILE_SITE_KEY || null;
}

async function verifyTurnstile(token: string | null, ip?: string): Promise<boolean> {
  if (!TURNSTILE_SECRET_KEY) return true; // Not configured — nothing to enforce.
  if (!token) return false;
  const body = new URLSearchParams({ secret: TURNSTILE_SECRET_KEY, response: token });
  if (ip) body.set("remoteip", ip);
  try {
    const res = await fetch(TURNSTILE_VERIFY_URL, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body,
      signal: AbortSignal.timeout(8000),
    });
    const data = (await res.json()) as { success?: boolean; "error-codes"?: string[] };
    if (!data.success) {
      console.warn("[antispam] turnstile rejected:", data["error-codes"]?.join(",") ?? "unknown");
    }
    return data.success === true;
  } catch (err) {
    // Cloudflare unreachable (network policy, outage). Blocking every enquiry
    // is worse for this business than letting one through, so fail open — the
    // honeypot, timing and rate-limit layers still apply.
    console.error("[antispam] turnstile verify failed, allowing through:", err);
    return true;
  }
}

// ── Entry point ──────────────────────────────────────────────────────────────

export type SpamVerdict =
  /** Looks human — carry on and deliver it. */
  | { action: "accept" }
  /** Almost certainly a bot: show the success page, deliver nothing. */
  | { action: "discard"; reason: string }
  /** Might be a human who hit a wall: tell them what to do. */
  | { action: "reject"; error: "stale" | "rate-limit" | "captcha" | "validation"; reason: string };

export type SpamCheckInput = {
  form: FormData;
  name: string;
  phone: string;
  email: string;
  message: string;
  ip?: string;
};

export async function checkSubmission(input: SpamCheckInput): Promise<SpamVerdict> {
  const { form, ip } = input;
  const now = Date.now();
  const seen = `ip=${ip ?? "unknown"}`;

  // 1. Honeypot — invisible to humans, irresistible to form-fillers.
  for (const field of HONEYPOT_FIELDS) {
    if (String(form.get(field) ?? "").trim() !== "") {
      return { action: "discard", reason: `honeypot:${field} ${seen}` };
    }
  }

  // Oversized fields are always automated.
  for (const [field, max] of Object.entries(MAX_LEN) as Array<[keyof typeof MAX_LEN, number]>) {
    if (input[field].length > max) {
      return { action: "discard", reason: `oversized:${field}=${input[field].length} ${seen}` };
    }
  }

  // 2. Signed timing token.
  const verdict = verifyFormToken(
    form.get(FORM_TOKEN_FIELD) ? String(form.get(FORM_TOKEN_FIELD)) : null,
    now,
  );
  if (verdict === "too-fast") {
    return { action: "discard", reason: `too-fast ${seen}` };
  }
  if (verdict !== "ok") {
    // A missing or forged token is bot-shaped, but an expired one is a real
    // person who left the tab open — both get the "reload and retry" message.
    return { action: "reject", error: "stale", reason: `token:${verdict} ${seen}` };
  }

  // 3. Per-IP flood control.
  if (rateLimited(ip, now)) {
    return { action: "reject", error: "rate-limit", reason: `rate-limit ${seen}` };
  }

  // 4. Content heuristics.
  const { score, reasons } = scoreContent(input);
  if (score >= SPAM_SCORE_THRESHOLD) {
    return { action: "discard", reason: `score=${score} [${reasons.join("; ")}] ${seen}` };
  }

  // 5. Turnstile, when configured.
  const captcha = form.get("cf-turnstile-response");
  if (!(await verifyTurnstile(captcha ? String(captcha) : null, ip))) {
    return { action: "reject", error: "captcha", reason: `turnstile ${seen}` };
  }

  return { action: "accept" };
}
