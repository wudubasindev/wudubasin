"use client";

import { useState, type FormEvent } from "react";
import { siteConfig } from "@/lib/site-config";

type Status = "idle" | "saving" | "redirecting" | "error";

const inputClasses =
  "w-full rounded-xl border border-sand-300 bg-white px-4 py-2.5 text-sm text-ink-900 placeholder:text-ink-400 focus:border-basin-500 focus:outline-none focus:ring-2 focus:ring-basin-200";

const buttonLabel: Record<Status, string> = {
  idle: `Continue to ${siteConfig.depositAmount} Deposit`,
  saving: "Saving your details…",
  redirecting: "Redirecting to secure checkout…",
  error: `Continue to ${siteConfig.depositAmount} Deposit`,
};

export function BookingForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrorMessage(null);

    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = {
      name: formData.get("name"),
      phone: formData.get("phone"),
      email: formData.get("email"),
      address: formData.get("address"),
      preferredDate: formData.get("preferredDate"),
      message: formData.get("message"),
    };

    try {
      setStatus("saving");
      const bookingRes = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const bookingData = await bookingRes.json();

      if (!bookingRes.ok || !bookingData.ok) {
        throw new Error(bookingData.error || "Could not save your details. Please try again.");
      }

      setStatus("redirecting");
      const checkoutRes = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...payload, bookingId: bookingData.id }),
      });
      const checkoutData = await checkoutRes.json();

      if (!checkoutRes.ok || !checkoutData.url) {
        throw new Error(checkoutData.error || "Could not start checkout. Please try again.");
      }

      window.location.href = checkoutData.url;
    } catch (err) {
      setStatus("error");
      setErrorMessage(
        err instanceof Error ? err.message : "Something went wrong. Please try again.",
      );
    }
  }

  const isBusy = status === "saving" || status === "redirecting";

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-ink-900">
            Name
          </label>
          <input id="name" name="name" type="text" required className={inputClasses} />
        </div>
        <div>
          <label htmlFor="phone" className="mb-1.5 block text-sm font-medium text-ink-900">
            Phone
          </label>
          <input id="phone" name="phone" type="tel" required className={inputClasses} />
        </div>
      </div>

      <div>
        <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-ink-900">
          Email
        </label>
        <input id="email" name="email" type="email" required className={inputClasses} />
      </div>

      <div>
        <label htmlFor="address" className="mb-1.5 block text-sm font-medium text-ink-900">
          Installation address
        </label>
        <input id="address" name="address" type="text" required className={inputClasses} />
      </div>

      <div>
        <label htmlFor="preferredDate" className="mb-1.5 block text-sm font-medium text-ink-900">
          Preferred install date
        </label>
        <input id="preferredDate" name="preferredDate" type="date" className={inputClasses} />
      </div>

      <div>
        <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-ink-900">
          Anything else we should know?
        </label>
        <textarea id="message" name="message" rows={3} className={inputClasses} />
      </div>

      {status === "error" && errorMessage && (
        <p className="text-sm text-red-600">{errorMessage}</p>
      )}

      <button
        type="submit"
        disabled={isBusy}
        className="w-full rounded-full bg-basin-700 px-6 py-3 text-sm font-semibold text-sand-50 transition-colors hover:bg-basin-800 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
      >
        {buttonLabel[status]}
      </button>

      <p className="text-xs text-ink-400">
        Your name, phone, email, and address are required so we can confirm
        your installation before you&apos;re taken to secure payment.
      </p>
    </form>
  );
}
