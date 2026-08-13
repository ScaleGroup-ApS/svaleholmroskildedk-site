// ─────────────────────────────────────────────────────────────────────────────
// Server-only relay for contact / booking enquiries.
// Runs inside React Router `action` functions (Node SSR).
//
// Posts to crm-backend's POST /internal/site-submission, which stores the
// submission centrally (so the team can view/resend it) and delivers it to the
// customer's recipient address via its own SMTP → SES → Resend cascade. This
// site therefore needs no mail credentials of its own.
//
// Port of app/Notifications/Channels/CRMChannel.php from the Laravel starter
// kit — same endpoint, same Bearer auth, same `customerId` + payload body.
//
// Env vars come from App Settings in the CRM (customer 24 → app `api`), which
// the deploy applies to the pod as the `api-env` ConfigMap. Add or change them
// there, not in a manifest in this repo:
//   CRM_API_URL      – base URL; defaults to the in-cluster service address
//   CRM_API_TOKEN    – required; crm-backend's AGENT_API_TOKEN
//   CRM_CUSTOMER_ID  – numeric customer id; required unless CRM_SLUG is set
//   CRM_SLUG         – the site's k8s namespace; wins over CRM_CUSTOMER_ID
//
// crm-backend needs one of CRM_CUSTOMER_ID / CRM_SLUG (its schema refines on
// `slug != null || customerId != null`), so neither being set is a 400.
//
// Unlike the PHP channel — which no-ops silently when url/token are missing —
// a missing token here returns { ok:false } so the contact form can show its
// phone/e-mail fallback instead of pretending the message was delivered.
// ─────────────────────────────────────────────────────────────────────────────

const CRM_API_URL =
  process.env.CRM_API_URL || "http://crm-backend.crm-system.svc.cluster.local:5000";
const CRM_API_TOKEN = process.env.CRM_API_TOKEN;
const CRM_SLUG = process.env.CRM_SLUG;
const CRM_CUSTOMER_ID = process.env.CRM_CUSTOMER_ID;

// crm-backend requires a syntactically valid `email`, but this form asks only
// for name + phone. Phone-only enquiries get a synthetic, deliberately
// undeliverable address so the lead still lands in the CRM.
const PLACEHOLDER_EMAIL_DOMAIN =
  process.env.CONTACT_PLACEHOLDER_DOMAIN || "svaleholmroskilde.dk";

export type ContactPayload = {
  name: string;
  phone: string;
  email?: string;
  message?: string;
  /** Human-readable label → value pairs from the price calculator (may be empty). */
  enquiry?: Array<{ label: string; value: string }>;
  /** Page the enquiry was submitted from. */
  sourceUrl?: string;
  /** Originating client IP, if the proxy passed one through. */
  ip?: string;
};

export type SendResult = { ok: true } | { ok: false; error: string };

function placeholderEmail(phone: string): string {
  const digits = phone.replace(/\D/g, "");
  return `no-email+${digits || "ukendt"}@${PLACEHOLDER_EMAIL_DOMAIN}`;
}

/**
 * crm-backend has no field for the price-calculator rows, so they are appended
 * to the free-text message rather than dropped.
 */
function composeMessage(p: ContactPayload): string | undefined {
  const parts: string[] = [];
  if (p.message) parts.push(p.message);
  if (p.enquiry && p.enquiry.length > 0) {
    parts.push(
      ["── Forespørgsel fra prisberegner ──", ...p.enquiry.map((r) => `${r.label}: ${r.value}`)].join(
        "\n",
      ),
    );
  }
  if (!p.email) {
    parts.push(`(Ingen e-mail oplyst — kontakt på telefon ${p.phone}.)`);
  }
  return parts.length > 0 ? parts.join("\n\n") : undefined;
}

export async function sendContactEmail(p: ContactPayload): Promise<SendResult> {
  if (!CRM_API_TOKEN) {
    return { ok: false, error: "not-configured" };
  }
  // crm-backend rejects a body carrying neither identifier with a 400. Prefer
  // the slug: it is the k8s namespace, reliably available at deploy time,
  // whereas CRM_CUSTOMER_ID must be the numeric customer id and is easy to
  // mis-provision with a slug (which would coerce to NaN below).
  const customerId = CRM_CUSTOMER_ID ? Number(CRM_CUSTOMER_ID) : undefined;
  const identifier = CRM_SLUG
    ? { slug: CRM_SLUG }
    : Number.isInteger(customerId) && (customerId as number) > 0
      ? { customerId }
      : undefined;
  if (!identifier) {
    return { ok: false, error: "no-customer-identifier" };
  }

  const hasEnquiry = p.enquiry !== undefined && p.enquiry.length > 0;

  // Mirrors CRMChannel::send — `customerId` (or `slug`) merged with the
  // submission fields, no wrapper object.
  const body: Record<string, unknown> = {
    ...identifier,
    name: p.name,
    email: p.email || placeholderEmail(p.phone),
    phone: p.phone,
    subject: hasEnquiry
      ? `Ny booking-forespørgsel fra ${p.name}`
      : `Ny henvendelse fra ${p.name}`,
  };

  const message = composeMessage(p);
  if (message) body.message = message;
  if (p.sourceUrl) body.sourceUrl = p.sourceUrl;
  if (p.ip) body.ip = p.ip;

  try {
    const res = await fetch(`${CRM_API_URL.replace(/\/$/, "")}/internal/site-submission`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${CRM_API_TOKEN}`,
      },
      body: JSON.stringify(body),
    });
    if (!res.ok) {
      const text = await res.text().catch(() => "");
      return { ok: false, error: `crm-failed-${res.status}: ${text.slice(0, 300)}` };
    }
  } catch (err) {
    return { ok: false, error: `crm-network: ${err instanceof Error ? err.message : String(err)}` };
  }

  return { ok: true };
}
