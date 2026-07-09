import { Resend } from "resend";
import { siteConfig } from "@/lib/site-config";

type BookingConfirmationParams = {
  to: string;
  name: string;
  trackingNumber: string;
};

function getResendClient() {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return null;
  return new Resend(apiKey);
}

export async function sendBookingConfirmationEmail({
  to,
  name,
  trackingNumber,
}: BookingConfirmationParams) {
  const resend = getResendClient();
  const fromEmail = process.env.RESEND_FROM_EMAIL;

  if (!resend || !fromEmail) {
    console.error("Resend is not configured; skipping confirmation email.");
    return;
  }

  const { error } = await resend.emails.send({
    from: fromEmail,
    to,
    subject: `Your ${siteConfig.name} deposit is confirmed`,
    html: renderBookingConfirmationHtml({ name, trackingNumber }),
    text: renderBookingConfirmationText({ name, trackingNumber }),
  });

  if (error) {
    console.error("Failed to send booking confirmation email:", error);
  }
}

function renderBookingConfirmationHtml({
  name,
  trackingNumber,
}: {
  name: string;
  trackingNumber: string;
}) {
  return `
    <div style="font-family: -apple-system, sans-serif; max-width: 480px; margin: 0 auto; color: #292620;">
      <h1 style="font-size: 22px; margin-bottom: 4px;">Thank you, ${escapeHtml(name)}!</h1>
      <p style="font-size: 15px; line-height: 1.6;">
        Your ${escapeHtml(siteConfig.depositAmount)} deposit for ${escapeHtml(siteConfig.name)}
        is confirmed. We'll be in touch shortly to confirm your installation date.
      </p>
      <div style="margin: 24px 0; padding: 16px 20px; background: #f4eee2; border-radius: 12px;">
        <p style="font-size: 12px; text-transform: uppercase; letter-spacing: 0.04em; color: #8a8574; margin: 0 0 4px;">
          Your booking reference
        </p>
        <p style="font-size: 22px; font-weight: 600; color: #175650; margin: 0;">
          ${escapeHtml(trackingNumber)}
        </p>
      </div>
      <p style="font-size: 13px; line-height: 1.6; color: #5b5748;">
        Save this number for your records — mention it if you contact us about your installation.
      </p>
      <p style="font-size: 13px; line-height: 1.6; color: #5b5748;">
        Questions? Reach us at
        <a href="mailto:${escapeHtml(siteConfig.contactEmail)}" style="color: #175650;">${escapeHtml(siteConfig.contactEmail)}</a>
        or ${escapeHtml(siteConfig.contactPhone)}.
      </p>
    </div>
  `;
}

function renderBookingConfirmationText({
  name,
  trackingNumber,
}: {
  name: string;
  trackingNumber: string;
}) {
  return [
    `Thank you, ${name}!`,
    ``,
    `Your ${siteConfig.depositAmount} deposit for ${siteConfig.name} is confirmed. We'll be in touch shortly to confirm your installation date.`,
    ``,
    `Your booking reference: ${trackingNumber}`,
    `Save this number for your records — mention it if you contact us about your installation.`,
    ``,
    `Questions? Reach us at ${siteConfig.contactEmail} or ${siteConfig.contactPhone}.`,
  ].join("\n");
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
