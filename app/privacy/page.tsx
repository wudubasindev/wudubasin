import type { Metadata } from "next";
import { siteConfig } from "@/lib/site-config";
import { LegalDocument, LegalH2, LegalNote } from "../components/LegalDocument";

export const metadata: Metadata = {
  title: `Privacy Policy — ${siteConfig.name}`,
};

export default function PrivacyPolicyPage() {
  return (
    <LegalDocument title="Privacy Policy" effectiveDate={siteConfig.legalEffectiveDate}>
      <p>
        <strong>{siteConfig.name}</strong> (&ldquo;we,&rdquo; &ldquo;us,&rdquo; &ldquo;our&rdquo;) explains in
        this Privacy Policy how we collect, use, disclose, and protect personal information, in accordance
        with Canada&apos;s Personal Information Protection and Electronic Documents Act (PIPEDA).
      </p>

      <LegalH2>1. What We Collect</LegalH2>
      <p>When you request a quote, book a service, or contact us, we may collect:</p>
      <ul className="list-disc space-y-1 pl-5">
        <li><strong>Contact information:</strong> name, address, phone number, email address</li>
        <li><strong>Booking details:</strong> property details relevant to the job, preferred scheduling</li>
        <li>
          <strong>Payment information:</strong> processed directly by Stripe, our payment processor. We do
          not receive or store your full card number, CVV, or bank account details — Stripe transmits us only
          limited transaction data (e.g., amount, last 4 digits, transaction status) needed to confirm payment
          and issue receipts.
        </li>
        <li><strong>Communications:</strong> messages you send us by email, phone, or web form</li>
        <li>
          <strong>Website usage data:</strong> basic analytics (e.g., pages visited) if analytics tools are
          enabled on our site
        </li>
      </ul>

      <LegalH2>2. Why We Collect It</LegalH2>
      <p>We use your information to:</p>
      <ul className="list-disc space-y-1 pl-5">
        <li>Provide quotes and schedule installation work</li>
        <li>Process deposits and final payments</li>
        <li>Communicate about your booking (confirmations, scheduling changes, follow-ups)</li>
        <li>Maintain records for warranty and service history</li>
        <li>Comply with legal and tax obligations</li>
        <li>Improve our website and services</li>
      </ul>
      <p>
        We do not use your information for unrelated marketing without your consent, and we do not sell your
        personal information.
      </p>

      <LegalH2>3. Who We Share It With</LegalH2>
      <p>We share personal information only as needed to operate the business:</p>
      <ul className="list-disc space-y-1 pl-5">
        <li><strong>Stripe</strong> (payment processing) — subject to Stripe&apos;s own privacy policy</li>
        <li>
          <strong>Hosting/infrastructure providers</strong> (e.g., Vercel, Supabase) that store or transmit
          site and booking data
        </li>
        <li><strong>Legal or regulatory authorities</strong>, if required by law</li>
      </ul>
      <p>We do not share your information with third parties for their own marketing purposes.</p>

      <LegalH2>4. Data Retention</LegalH2>
      <p>
        We retain personal information only as long as necessary for the purposes above, including any period
        required to meet tax, accounting, or warranty-related legal obligations, after which it is securely
        deleted or anonymized.
      </p>

      <LegalH2>5. Security</LegalH2>
      <p>
        We take reasonable technical and organizational measures to protect your personal information against
        unauthorized access, loss, or misuse. No online system is 100% secure, and we cannot guarantee
        absolute security.
      </p>

      <LegalH2>6. Your Rights</LegalH2>
      <p>Under PIPEDA, you have the right to:</p>
      <ul className="list-disc space-y-1 pl-5">
        <li>Access the personal information we hold about you</li>
        <li>Request correction of inaccurate information</li>
        <li>
          Withdraw consent for non-essential uses of your information (this may limit our ability to provide
          certain services)
        </li>
        <li>Ask questions about how your information is handled</li>
      </ul>
      <p>To exercise these rights, contact us at {siteConfig.contactEmail}.</p>

      <LegalH2>7. Cookies</LegalH2>
      <p>
        Our website may use basic cookies or similar technologies to support core functionality (e.g., the
        booking flow) and, if enabled, anonymous analytics. You can control cookies through your browser
        settings.
      </p>

      <LegalH2>8. Children&apos;s Privacy</LegalH2>
      <p>
        Our Services are intended for adults entering into service agreements. We do not knowingly collect
        personal information from children.
      </p>

      <LegalH2>9. Complaints</LegalH2>
      <p>
        If you have concerns about how we handle your personal information that we haven&apos;t resolved, you
        may contact the Office of the Privacy Commissioner of Canada at{" "}
        <a
          href="https://priv.gc.ca"
          target="_blank"
          rel="noopener noreferrer"
          className="text-basin-700 underline underline-offset-2"
        >
          priv.gc.ca
        </a>
        .
      </p>

      <LegalH2>10. Changes to This Policy</LegalH2>
      <p>
        We may update this Privacy Policy from time to time. The effective date above reflects the most
        recent revision.
      </p>

      <LegalH2>11. Contact</LegalH2>
      <p>
        Questions about this Privacy Policy: {siteConfig.contactEmail} / {siteConfig.contactPhone} /{" "}
        {siteConfig.businessAddress}
      </p>

      <LegalNote>
        This is a template and has not been reviewed by a lawyer. Have it reviewed before relying on it
        commercially, particularly the data-sharing section once your actual hosting/analytics stack is
        finalized.
      </LegalNote>
    </LegalDocument>
  );
}
