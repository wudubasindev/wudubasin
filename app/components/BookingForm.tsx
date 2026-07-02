"use client";

import { useState, type FormEvent } from "react";

type Status = "idle" | "submitting" | "success" | "error";

const inputClasses =
  "w-full rounded-xl border border-sand-300 bg-white px-4 py-2.5 text-sm text-ink-900 placeholder:text-ink-400 focus:border-basin-500 focus:outline-none focus:ring-2 focus:ring-basin-200";

export function BookingForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
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
      const res = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();

      if (!res.ok || !data.ok) {
        throw new Error(data.error || "Something went wrong.");
      }

      setStatus("success");
      form.reset();
    } catch (err) {
      setStatus("error");
      setErrorMessage(
        err instanceof Error ? err.message : "Could not send your request. Please try again.",
      );
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-2xl border border-basin-200 bg-basin-50 p-6 text-center">
        <p className="text-base font-semibold text-basin-800">
          Thanks — we&apos;ve got your details.
        </p>
        <p className="mt-2 text-sm text-basin-700">
          We&apos;ll reach out shortly to confirm your installation date.
        </p>
      </div>
    );
  }

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
        disabled={status === "submitting"}
        className="w-full rounded-full bg-ink-900 px-6 py-3 text-sm font-semibold text-sand-50 transition-colors hover:bg-ink-900/90 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
      >
        {status === "submitting" ? "Sending…" : "Request a Callback"}
      </button>
    </form>
  );
}
