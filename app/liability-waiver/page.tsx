import type { Metadata } from "next";
import { siteConfig } from "@/lib/site-config";
import { LegalDocument, LegalH2, LegalNote } from "../components/LegalDocument";

export const metadata: Metadata = {
  title: `Installation Agreement & Liability Acknowledgment — ${siteConfig.name}`,
};

export default function LiabilityWaiverPage() {
  return (
    <LegalDocument
      title="Installation Agreement & Liability Acknowledgment"
      effectiveDate={siteConfig.legalEffectiveDate}
    >
      <p>
        This document is signed by the Customer at the time of booking or on the day of installation, in
        addition to our{" "}
        <a href="/terms" className="text-basin-700 underline underline-offset-2">
          Terms of Service
        </a>
        .
      </p>

      <div className="grid grid-cols-1 gap-2 rounded-xl border border-sand-300 bg-sand-100 px-4 py-4 text-sm sm:grid-cols-3">
        <div>
          <dt className="text-xs font-semibold uppercase tracking-wide text-ink-400">Job address</dt>
          <dd className="mt-1 text-ink-900">[ADDRESS]</dd>
        </div>
        <div>
          <dt className="text-xs font-semibold uppercase tracking-wide text-ink-400">Date</dt>
          <dd className="mt-1 text-ink-900">[DATE]</dd>
        </div>
        <div>
          <dt className="text-xs font-semibold uppercase tracking-wide text-ink-400">Customer name</dt>
          <dd className="mt-1 text-ink-900">[NAME]</dd>
        </div>
      </div>

      <LegalH2>1. Pre-Existing Conditions</LegalH2>
      <p>The Customer acknowledges that:</p>
      <ul className="list-disc space-y-1 pl-5">
        <li>
          WuduBasin has not inspected the full plumbing system of the property prior to this agreement, beyond
          what is visible at the installation point.
        </li>
        <li>
          Pre-existing issues (corroded pipes, worn shut-off valves, hidden leaks, outdated fittings) may exist
          and are not the responsibility of WuduBasin unless caused by our direct negligence during
          installation.
        </li>
        <li>
          If pre-existing issues are discovered during installation, WuduBasin will notify the Customer before
          proceeding, and additional charges or a referral to a licensed plumber may apply.
        </li>
      </ul>

      <LegalH2>2. Scope Confirmation</LegalH2>
      <p>
        The Customer confirms the installation described in the Job Agreement involves connecting to{" "}
        <strong>existing</strong> water supply and drainage lines, and does not require relocating or adding
        new plumbing lines. If the job is later found to require such work, Section 6 of the Terms of Service
        applies.
      </p>

      <LegalH2>3. Access and Site Conditions</LegalH2>
      <p>
        The Customer will provide safe, clear access to the work area and will shut off water supply if
        instructed, or confirm that a functioning shut-off valve is accessible.
      </p>

      <LegalH2>4. Release for Pre-Existing Defects</LegalH2>
      <p>
        To the extent permitted by law, the Customer releases WuduBasin from liability for damage or
        malfunction caused by pre-existing defects in the plumbing system that were not visible or reasonably
        discoverable at the time of installation, provided WuduBasin&apos;s own work was performed with
        reasonable care.
      </p>

      <LegalH2>5. Limitation of Liability</LegalH2>
      <p>
        This section restates and incorporates Section 9 of the{" "}
        <a href="/terms" className="text-basin-700 underline underline-offset-2">
          Terms of Service
        </a>{" "}
        (Limitation of Liability). Nothing here waives Customer rights that cannot be waived under the
        Consumer Protection Act, 2002 or other applicable Ontario law.
      </p>

      <LegalH2>6. Photos</LegalH2>
      <div className="space-y-2">
        <p className="flex items-start gap-2">
          <span aria-hidden>☐</span>
          <span>
            Customer consents to before/after photos of the installation being used for WuduBasin&apos;s
            portfolio or marketing (no identifying property details shown).
          </span>
        </p>
        <p className="flex items-start gap-2">
          <span aria-hidden>☐</span>
          <span>Customer does not consent to this.</span>
        </p>
      </div>

      <LegalH2>Signatures</LegalH2>
      <div className="space-y-4">
        <p>Customer: ______________________ Date: __________</p>
        <p>WuduBasin representative: ______________________ Date: __________</p>
      </div>

      <LegalNote>
        Template only. A liability waiver has limited enforceability against ordinary negligence in Ontario
        and cannot override statutory consumer protections — have this reviewed by a lawyer before use,
        especially the release language in Section 4.
      </LegalNote>
    </LegalDocument>
  );
}
