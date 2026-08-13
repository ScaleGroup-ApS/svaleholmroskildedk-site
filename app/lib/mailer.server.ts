// ─────────────────────────────────────────────────────────────────────────────
// Server-only email sender for contact / booking enquiries.
// Runs inside React Router `action` functions (Node SSR).
//
// Delivery uses the Resend HTTP API (no extra npm dependency – just fetch).
// Configure via env vars in the deployment:
//   RESEND_API_KEY   – required for delivery (get one at resend.com)
//   CONTACT_TO       – recipient (default: kontakt@svaleholmroskilde.dk)
//   CONTACT_FROM     – verified sender (default: Svaleholm <no-reply@svaleholmroskilde.dk>)
// If RESEND_API_KEY is missing, sendContactEmail returns { ok:false, error:"not-configured" }
// so the UI can show a phone/e-mail fallback instead of pretending it was sent.
// ─────────────────────────────────────────────────────────────────────────────

const RESEND_API_KEY = process.env.RESEND_API_KEY;
const CONTACT_TO = process.env.CONTACT_TO || "kontakt@svaleholmroskilde.dk";
const CONTACT_FROM = process.env.CONTACT_FROM || "Svaleholm Roskilde <no-reply@svaleholmroskilde.dk>";

export type ContactPayload = {
  name: string;
  phone: string;
  email?: string;
  message?: string;
  /** Human-readable label → value pairs from the price calculator (may be empty). */
  enquiry?: Array<{ label: string; value: string }>;
};

export type SendResult = { ok: true } | { ok: false; error: string };

function esc(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

export async function sendContactEmail(p: ContactPayload): Promise<SendResult> {
  const hasEnquiry = p.enquiry && p.enquiry.length > 0;
  const subject = hasEnquiry
    ? `Ny booking-forespørgsel fra ${p.name}`
    : `Ny henvendelse fra ${p.name}`;

  const textLines: string[] = [
    `Navn:    ${p.name}`,
    `Telefon: ${p.phone}`,
    p.email ? `E-mail:  ${p.email}` : "",
    "",
    p.message ? `Besked:\n${p.message}` : "Besked: (ingen)",
  ];
  if (hasEnquiry) {
    textLines.push("", "── Forespørgsel fra prisberegner ──");
    for (const row of p.enquiry!) textLines.push(`${row.label}: ${row.value}`);
  }
  const text = textLines.filter((l) => l !== undefined).join("\n");

  const enquiryHtml = hasEnquiry
    ? `<h3 style="margin:24px 0 8px;font:600 14px sans-serif;color:#0F1714">Forespørgsel fra prisberegner</h3>
       <table style="border-collapse:collapse;font:14px sans-serif;color:#222">
         ${p.enquiry!.map((r) => `<tr><td style="padding:4px 16px 4px 0;color:#666">${esc(r.label)}</td><td style="padding:4px 0"><strong>${esc(r.value)}</strong></td></tr>`).join("")}
       </table>`
    : "";
  const html = `<div style="font:14px sans-serif;color:#222;line-height:1.6">
      <h2 style="font:600 18px sans-serif;color:#0F1714">${esc(subject)}</h2>
      <table style="border-collapse:collapse;font:14px sans-serif;color:#222">
        <tr><td style="padding:4px 16px 4px 0;color:#666">Navn</td><td style="padding:4px 0"><strong>${esc(p.name)}</strong></td></tr>
        <tr><td style="padding:4px 16px 4px 0;color:#666">Telefon</td><td style="padding:4px 0"><strong>${esc(p.phone)}</strong></td></tr>
        ${p.email ? `<tr><td style="padding:4px 16px 4px 0;color:#666">E-mail</td><td style="padding:4px 0"><strong>${esc(p.email)}</strong></td></tr>` : ""}
      </table>
      ${p.message ? `<h3 style="margin:24px 0 8px;font:600 14px sans-serif;color:#0F1714">Besked</h3><p style="white-space:pre-line">${esc(p.message)}</p>` : ""}
      ${enquiryHtml}
    </div>`;

  if (!RESEND_API_KEY) {
    return { ok: false, error: "not-configured" };
  }

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: CONTACT_FROM,
        to: [CONTACT_TO],
        reply_to: p.email || undefined,
        subject,
        text,
        html,
      }),
    });
    if (!res.ok) {
      const body = await res.text().catch(() => "");
      return { ok: false, error: `send-failed-${res.status}: ${body.slice(0, 300)}` };
    }
    return { ok: true };
  } catch (err) {
    return { ok: false, error: `network: ${err instanceof Error ? err.message : String(err)}` };
  }
}
