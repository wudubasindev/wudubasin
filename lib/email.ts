import { Resend } from "resend";
import { siteConfig } from "@/lib/site-config";

type BookingConfirmationParams = {
  to: string;
  name: string;
  trackingNumber: string;
};

// Site brand colors (mirrors app/globals.css custom properties).
const colors = {
  sand50: "#faf8f3",
  sand100: "#f4eee2",
  sand200: "#e9dfc9",
  sand300: "#d8c9a8",
  basin50: "#eaf3f1",
  basin100: "#cde4df",
  basin700: "#175650",
  basin800: "#12403c",
  ink900: "#292620",
  ink600: "#5b5748",
  ink400: "#8a8574",
};

// Fraunces/Inter aren't reliably loadable in most email clients, so these
// stacks lean on the closest widely-available serif/sans-serif fallbacks.
const fontDisplay = "Georgia, 'Times New Roman', serif";
const fontSans =
  "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif";

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
  const siteUrl = siteConfig.siteUrl;

  return `
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Your ${escapeHtml(siteConfig.name)} deposit is confirmed</title>
  </head>
  <body style="margin:0; padding:0; background-color:${colors.sand50}; font-family:${fontSans};">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:${colors.sand50};">
      <tr>
        <td align="center" style="padding:40px 16px;">
          <table role="presentation" width="480" cellpadding="0" cellspacing="0" style="width:480px; max-width:100%;">

            <!-- Logo -->
            <tr>
              <td align="center" style="padding-bottom:28px;">
                <table role="presentation" cellpadding="0" cellspacing="0">
                  <tr>
                    <td style="padding-right:8px;">
                      <table role="presentation" width="32" height="32" cellpadding="0" cellspacing="0" style="background-color:${colors.basin700}; border-radius:16px;">
                        <tr>
                          <td align="center" valign="middle" style="width:32px; height:32px; color:${colors.sand50}; font-size:16px; line-height:32px;">
                            &#128167;
                          </td>
                        </tr>
                      </table>
                    </td>
                    <td valign="middle">
                      <span style="font-family:${fontDisplay}; font-size:18px; font-weight:700; color:${colors.ink900};">
                        ${escapeHtml(siteConfig.name)}
                      </span>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <!-- Check icon -->
            <tr>
              <td align="center" style="padding-bottom:24px;">
                <table role="presentation" width="64" height="64" cellpadding="0" cellspacing="0" style="background-color:${colors.basin100}; border-radius:32px;">
                  <tr>
                    <td align="center" valign="middle" style="width:64px; height:64px; color:${colors.basin700}; font-size:30px; line-height:64px;">
                      &#10003;
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <!-- Heading -->
            <tr>
              <td align="center" style="padding-bottom:12px;">
                <h1 style="margin:0; font-family:${fontDisplay}; font-size:28px; font-weight:700; color:${colors.ink900}; text-align:center;">
                  Your deposit is confirmed
                </h1>
              </td>
            </tr>

            <!-- Body copy -->
            <tr>
              <td align="center" style="padding-bottom:28px;">
                <p style="margin:0; font-family:${fontSans}; font-size:15px; line-height:1.6; color:${colors.ink600}; text-align:center;">
                  Thank you, ${escapeHtml(name)}! Your ${escapeHtml(siteConfig.depositAmount)} deposit
                  for ${escapeHtml(siteConfig.name)} is confirmed. We&rsquo;ll be in touch shortly to
                  confirm your installation date.
                </p>
              </td>
            </tr>

            <!-- Reference card -->
            <tr>
              <td style="padding-bottom:28px;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#ffffff; border:1px solid ${colors.sand200}; border-radius:20px;">
                  <tr>
                    <td style="padding:20px 24px 16px;">
                      <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                        <tr>
                          <td style="font-family:${fontSans}; font-size:11px; font-weight:700; text-transform:uppercase; letter-spacing:0.04em; color:${colors.ink400};">
                            Booking reference
                          </td>
                          <td align="right">
                            <span style="display:inline-block; font-family:${fontSans}; font-size:10px; font-weight:700; text-transform:uppercase; letter-spacing:0.04em; color:${colors.basin700}; background-color:${colors.basin50}; border-radius:999px; padding:4px 10px;">
                              Deposit paid
                            </span>
                          </td>
                        </tr>
                      </table>
                      <p style="margin:8px 0 0; font-family:${fontDisplay}; font-size:26px; font-weight:700; letter-spacing:0.03em; color:${colors.basin700};">
                        ${escapeHtml(trackingNumber)}
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding:16px 24px 20px; border-top:1px dashed ${colors.sand300};">
                      <p style="margin:0; font-family:${fontSans}; font-size:12px; line-height:1.6; color:${colors.ink400};">
                        Save this number for your records — mention it if you contact us about your installation.
                      </p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <!-- Buttons -->
            <tr>
              <td align="center" style="padding-bottom:36px;">
                <table role="presentation" cellpadding="0" cellspacing="0">
                  <tr>
                    <td style="padding:0 6px;">
                      <a href="${siteUrl}" style="display:inline-block; font-family:${fontSans}; font-size:14px; font-weight:600; color:${colors.sand50}; background-color:${colors.basin700}; border-radius:999px; padding:12px 24px; text-decoration:none;">
                        Back to Home
                      </a>
                    </td>
                    <td style="padding:0 6px;">
                      <a href="${siteUrl}/#designs" style="display:inline-block; font-family:${fontSans}; font-size:14px; font-weight:600; color:${colors.ink900}; background-color:#ffffff; border:1px solid ${colors.sand300}; border-radius:999px; padding:11px 23px; text-decoration:none;">
                        Browse Sink Designs
                      </a>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td align="center" style="border-top:1px solid ${colors.sand200}; padding-top:20px;">
                <p style="margin:0 0 4px; font-family:${fontSans}; font-size:12px; color:${colors.ink400}; text-align:center;">
                  Questions? Reach us at
                  <a href="mailto:${escapeHtml(siteConfig.contactEmail)}" style="color:${colors.basin700}; text-decoration:underline;">${escapeHtml(siteConfig.contactEmail)}</a>
                  or ${escapeHtml(siteConfig.contactPhone)}.
                </p>
                <p style="margin:0; font-family:${fontSans}; font-size:12px; color:${colors.ink400}; text-align:center;">
                  ${escapeHtml(siteConfig.name)} &middot; ${escapeHtml(siteConfig.serviceAreaLong)}
                </p>
              </td>
            </tr>

          </table>
        </td>
      </tr>
    </table>
  </body>
</html>
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
    `Back to Home: ${siteConfig.siteUrl}`,
    `Browse Sink Designs: ${siteConfig.siteUrl}/#designs`,
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
