import type { ReactNode } from "react";

export function LegalDocument({
  title,
  effectiveDate,
  children,
}: {
  title: string;
  effectiveDate: string;
  children: ReactNode;
}) {
  return (
    <article className="mx-auto max-w-3xl px-6 py-16 sm:py-20">
      <h1 className="font-display text-3xl font-semibold text-ink-900 sm:text-4xl">
        {title}
      </h1>
      <p className="mt-2 text-sm text-ink-400">Effective date: {effectiveDate}</p>
      <div className="legal-doc mt-10 space-y-6 text-sm leading-relaxed text-ink-600 sm:text-base">
        {children}
      </div>
    </article>
  );
}

export function LegalH2({ children }: { children: ReactNode }) {
  return (
    <h2 className="!mt-10 font-display text-xl font-semibold text-ink-900 sm:text-2xl">
      {children}
    </h2>
  );
}

export function LegalNote({ children }: { children: ReactNode }) {
  return (
    <p className="rounded-xl border border-sand-300 bg-sand-100 px-4 py-3 text-xs text-ink-600 sm:text-sm">
      {children}
    </p>
  );
}
