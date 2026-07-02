"use client";

import { useState } from "react";
import { siteConfig } from "@/lib/site-config";

type DepositButtonProps = {
  className?: string;
  label?: string;
};

const defaultClassName =
  "rounded-full bg-basin-700 px-7 py-3.5 text-sm font-semibold text-sand-50 shadow-sm shadow-basin-900/10 transition-colors hover:bg-basin-800 disabled:cursor-not-allowed disabled:opacity-60";

export function DepositButton({ className, label }: DepositButtonProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleClick() {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/checkout", { method: "POST" });
      const data = await res.json();

      if (!res.ok || !data.url) {
        throw new Error(data.error || "Something went wrong.");
      }

      window.location.href = data.url;
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Could not start checkout. Please try again.",
      );
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col items-center gap-2">
      <button
        type="button"
        onClick={handleClick}
        disabled={loading}
        className={className ?? defaultClassName}
      >
        {loading ? "Redirecting to secure checkout…" : label ?? `Pay ${siteConfig.depositAmount} Deposit`}
      </button>
      {error && <p className="max-w-xs text-center text-sm text-red-600">{error}</p>}
    </div>
  );
}
