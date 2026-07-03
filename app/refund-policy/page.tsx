import type { Metadata } from "next";
import { siteConfig } from "@/lib/site-config";
import { LegalDocument, LegalH2, LegalNote } from "../components/LegalDocument";

export const metadata: Metadata = {
  title: `Refund & Cancellation Policy — ${siteConfig.name}`,
};

export default function RefundCancellationPolicyPage() {
  return (
    <LegalDocument
      title="Refund & Cancellation Policy"
      effectiveDate={siteConfig.legalEffectiveDate}
    >
      <p>
        This policy supplements our{" "}
        <a href="/terms" className="text-basin-700 underline underline-offset-2">
          Terms of Service
        </a>{" "}
        and explains how deposits, cancellations, and refunds are handled.
      </p>

      <LegalH2>1. Booking Deposit</LegalH2>
      <p>
        A deposit of {siteConfig.depositAmount} is required to confirm a booking and reserve materials. The
        deposit is applied toward your total invoice.
      </p>

      <LegalH2>2. Your Right to Cancel (First 10 Days)</LegalH2>
      <p>
        If you signed your Job Agreement in person, Ontario law gives you an unconditional right to cancel
        within 10 days of receiving a written copy of the agreement. Deposits are refunded in full within 15
        days of a valid cancellation notice sent to {siteConfig.contactEmail}.
      </p>

      <LegalH2>3. Cancellations After the 10-Day Period</LegalH2>
      <ul className="list-disc space-y-1 pl-5">
        <li>
          <strong>Cancelled by Customer, more than {siteConfig.cancellationNoticeDays} business days before
          the scheduled installation date:</strong> deposit refunded, minus any non-recoverable material
          costs already committed on your behalf.
        </li>
        <li>
          <strong>Cancelled by Customer, less than {siteConfig.cancellationNoticeDays} business days before
          the scheduled installation date:</strong> deposit is non-refundable, as materials and scheduling
          have already been committed.
        </li>
        <li>
          <strong>Rescheduling:</strong> we&apos;ll accommodate a reasonable rescheduling request at no charge
          if given at least {siteConfig.cancellationNoticeDays} business days&apos; notice.
        </li>
      </ul>

      <LegalH2>4. Cancelled or Delayed by WuduBasin</LegalH2>
      <p>
        If we cancel a booking, or fail to begin work within 30 days of the agreed commencement date without a
        mutually agreed new date, you may cancel and receive a full refund of your deposit.
      </p>

      <LegalH2>5. Non-Refundable Items</LegalH2>
      <p>
        Custom-ordered or custom-cut materials purchased specifically for your job are non-refundable once
        ordered, and this will be disclosed to you before we order them.
      </p>

      <LegalH2>6. How Refunds Are Issued</LegalH2>
      <p>
        Refunds are issued to the original Stripe payment method used for the deposit, typically within 5–10
        business days of approval.
      </p>

      <LegalH2>7. Contact</LegalH2>
      <p>
        To cancel or ask about a refund: {siteConfig.contactEmail} / {siteConfig.contactPhone}
      </p>

      <LegalNote>
        Template only — have an Ontario lawyer confirm the {siteConfig.cancellationNoticeDays}-business-day
        notice period reflects what you can actually enforce under the Consumer Protection Act, 2002 before
        publishing.
      </LegalNote>
    </LegalDocument>
  );
}
