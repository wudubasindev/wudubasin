import type { Metadata } from "next";
import { siteConfig } from "@/lib/site-config";
import { LegalDocument, LegalH2, LegalNote } from "../components/LegalDocument";

export const metadata: Metadata = {
  title: `Terms of Service — ${siteConfig.name}`,
};

export default function TermsOfServicePage() {
  return (
    <LegalDocument title="Terms of Service" effectiveDate={siteConfig.legalEffectiveDate}>
      <p>
        <strong>{siteConfig.name}</strong> (&ldquo;we,&rdquo; &ldquo;us,&rdquo; &ldquo;our&rdquo;) provides wudu
        (ablution) sink supply and installation services to residential customers in{" "}
        {siteConfig.serviceAreaLong} (&ldquo;Services&rdquo;). By requesting a quote, placing a deposit, or
        engaging our Services, you (&ldquo;Customer,&rdquo; &ldquo;you&rdquo;) agree to these Terms of Service
        (&ldquo;Terms&rdquo;).
      </p>

      <p>
        <strong>Business contact information</strong> (required disclosure under Ontario&apos;s Consumer
        Protection Act, 2002):
      </p>
      <ul className="list-disc space-y-1 pl-5">
        <li>Legal name: {siteConfig.legalName}</li>
        <li>Business address: {siteConfig.businessAddress}</li>
        <li>Phone: {siteConfig.contactPhone}</li>
        <li>Email: {siteConfig.contactEmail}</li>
      </ul>

      <LegalH2>1. Description of Services</LegalH2>
      <p>
        WuduBasin supplies and installs wudu sinks and related fixtures at a Customer&apos;s residential
        property. The specific scope of work, materials, and price for each job will be set out in a written
        quote or invoice (&ldquo;Job Agreement&rdquo;) provided to the Customer before any deposit is collected.
        The Job Agreement forms part of these Terms.
      </p>

      <LegalH2>2. Quotes and Pricing</LegalH2>
      <ul className="list-disc space-y-1 pl-5">
        <li>
          Quotes are estimates based on information and site conditions described by the Customer and are
          subject to change if actual site conditions differ materially (e.g., inaccessible shut-off valves,
          non-standard piping, structural issues discovered on site).
        </li>
        <li>All prices are in Canadian dollars and exclude applicable taxes unless stated otherwise.</li>
        <li>
          A written Job Agreement confirming the final scope and total price will be provided and must be
          accepted by the Customer before work begins.
        </li>
      </ul>

      <LegalH2>3. Deposits and Payment</LegalH2>
      <ul className="list-disc space-y-1 pl-5">
        <li>
          A deposit of {siteConfig.depositAmount} is required to book a job and reserve materials/scheduling.
          The deposit is collected securely via Stripe.
        </li>
        <li>
          We do not store your full card number; Stripe processes and stores payment card data in accordance
          with PCI-DSS standards. See our Privacy Policy for details.
        </li>
        <li>
          The remaining balance is due on the day the work is completed, unless otherwise agreed in writing.
        </li>
        <li>
          Because payment is collected before the work is performed, this agreement is a &ldquo;future
          performance agreement&rdquo; under the Ontario Consumer Protection Act, 2002. Where the deposit or
          total price exceeds $50, we will provide you with a written agreement setting out: our contact
          information, a fair description of the goods/services, the total price, payment terms, and the
          delivery/commencement date, as required by law.
        </li>
      </ul>

      <LegalH2>4. Cancellation Right (Cooling-Off Period)</LegalH2>
      <p>
        If this agreement is signed in person at your home or another location outside our normal place of
        business (&ldquo;direct agreement&rdquo;), Ontario law gives you the right to cancel{" "}
        <strong>within 10 days</strong> of receiving a written copy of the agreement, for any reason, with no
        obligation to explain why. To cancel, notify us in writing (email is acceptable) at the contact
        information above.
      </p>
      <p>If you cancel within this period, any deposit paid will be refunded within 15 days.</p>
      <p>
        Outside the 10-day period, see our separate{" "}
        <a href="/refund-policy" className="text-basin-700 underline underline-offset-2">
          Refund &amp; Cancellation Policy
        </a>{" "}
        for how deposits are handled.
      </p>

      <LegalH2>5. Customer Responsibilities</LegalH2>
      <p>You agree to:</p>
      <ul className="list-disc space-y-1 pl-5">
        <li>Provide accurate information about your plumbing setup, including the presence and functionality of shut-off valves;</li>
        <li>Ensure clear, safe access to the installation area on the scheduled date;</li>
        <li>Disclose any known pre-existing plumbing issues, leaks, corrosion, or non-standard fittings;</li>
        <li>Obtain any permits required for the work, where applicable (see Section 7).</li>
      </ul>

      <LegalH2>6. Scope Limitations and Licensing</LegalH2>
      <p>
        WuduBasin performs installation work that connects to your home&apos;s <strong>existing</strong> water
        supply and drainage lines. We do not perform work that requires a licensed plumber or a municipal
        plumbing permit under the Ontario Building Code (e.g., relocating supply/drain lines, new plumbing
        runs, altering venting). If a job is found to require such work once on site, we will pause and refer
        you to a licensed plumber; this may affect price and timeline, and is not a defect in our work.
      </p>

      <LegalH2>7. Permits</LegalH2>
      <p>
        Where a job requires a municipal permit, obtaining that permit is the Customer&apos;s responsibility
        unless we expressly agree in writing to obtain it on your behalf.
      </p>

      <LegalH2>8. Warranty</LegalH2>
      <p>
        We warrant our installation workmanship against defects for {siteConfig.warrantyPeriod} from the
        completion date. This warranty covers our installation work only. It does not cover:
      </p>
      <ul className="list-disc space-y-1 pl-5">
        <li>Pre-existing plumbing, fixtures, or fittings;</li>
        <li>Damage from normal wear, hard water, corrosion, or third-party work;</li>
        <li>Issues arising from the Customer&apos;s water supply, pressure, or existing pipe condition;</li>
        <li>Manufacturer defects in supplied materials (covered by the manufacturer&apos;s warranty, if any).</li>
      </ul>

      <LegalH2>9. Limitation of Liability</LegalH2>
      <p>To the maximum extent permitted by law:</p>
      <ul className="list-disc space-y-1 pl-5">
        <li>
          Our total liability for any claim arising from the Services is limited to the amount paid by the
          Customer for the specific job giving rise to the claim.
        </li>
        <li>
          We are not liable for indirect, incidental, or consequential damages, including water damage arising
          from pre-existing plumbing defects that were not visible or disclosed at the time of installation.
        </li>
        <li>
          Nothing in these Terms limits liability that cannot be excluded under Ontario law (e.g., liability
          for gross negligence or for statutory consumer protections).
        </li>
      </ul>

      <LegalH2>10. Insurance</LegalH2>
      <p>
        WuduBasin {siteConfig.hasInsurance
          ? "carries general liability insurance covering property damage caused by our direct negligence during installation."
          : "does not yet carry general liability insurance."}
      </p>
      <LegalNote>
        You should obtain contractor&apos;s general liability insurance before performing paid installation
        work. Many insurers will not cover an uninsured, unlicensed installer, and a customer&apos;s homeowner
        insurance may deny claims tied to unpermitted or improperly performed work.
      </LegalNote>

      <LegalH2>11. Indemnification</LegalH2>
      <p>
        You agree to indemnify WuduBasin against claims arising from inaccurate information you provided about
        your plumbing system, or from your failure to obtain a required permit where you agreed to do so.
      </p>

      <LegalH2>12. Dispute Resolution</LegalH2>
      <p>
        Any dispute will first be addressed through good-faith direct communication. Nothing in these Terms
        requires you to submit disputes to arbitration in place of your rights under the Consumer Protection
        Act, 2002 — mandatory arbitration clauses that remove your statutory rights are not enforceable
        against you under Ontario law, and we do not intend these Terms to have that effect.
      </p>
      <p>
        These Terms are governed by the laws of the Province of Ontario and the federal laws of Canada
        applicable therein.
      </p>

      <LegalH2>13. Changes to These Terms</LegalH2>
      <p>
        We may update these Terms from time to time. Material changes will be communicated to Customers with
        active bookings before they take effect.
      </p>

      <LegalH2>14. Contact</LegalH2>
      <p>
        Questions about these Terms: {siteConfig.contactEmail} / {siteConfig.contactPhone}
      </p>

      <LegalNote>
        This is a template and has not been reviewed by a lawyer. Given that plumbing work, deposits, and
        consumer contracts carry real liability exposure, have this reviewed by an Ontario-licensed lawyer or
        paralegal before relying on it commercially.
      </LegalNote>
    </LegalDocument>
  );
}
