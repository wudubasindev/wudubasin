"use client";

import { useState, useSyncExternalStore, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import {
  CheckoutElementsProvider,
  PaymentElement,
  useCheckoutElements,
} from "@stripe/react-stripe-js/checkout";
import { getStripe, stripeAppearance, stripeElementsFonts } from "@/lib/stripe-client";
import { siteConfig } from "@/lib/site-config";

type StoredCheckout = {
  clientSecret: string;
  name: string;
};

function PaymentForm({ name }: { name: string }) {
  const result = useCheckoutElements();
  const router = useRouter();
  const [status, setStatus] = useState<"idle" | "paying" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (result.type !== "success") return;

    setStatus("paying");
    setErrorMessage(null);

    const confirmResult = await result.checkout.confirm({
      returnUrl: `${window.location.origin}/booking-confirmed`,
    });

    if (confirmResult.type === "error") {
      setStatus("error");
      setErrorMessage(confirmResult.error.message || "Payment failed. Please try again.");
      return;
    }

    router.push("/booking-confirmed");
  }

  const isBusy = status === "paying";

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <p className="text-sm text-ink-600">Paying deposit for</p>
        <p className="text-base font-medium text-ink-900">{name}</p>
      </div>

      <PaymentElement options={{ wallets: { link: "never" } }} />

      {status === "error" && errorMessage && (
        <p className="text-sm text-red-600">{errorMessage}</p>
      )}

      <button
        type="submit"
        disabled={result.type !== "success" || isBusy}
        className="w-full rounded-full bg-basin-700 px-6 py-3 text-sm font-semibold text-sand-50 transition-colors hover:bg-basin-800 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isBusy ? "Processing…" : `Pay ${siteConfig.depositAmount} Deposit`}
      </button>
    </form>
  );
}

function subscribeNoop() {
  return () => {};
}

function getStoredCheckoutSnapshot(): string | null {
  return sessionStorage.getItem("wudubasin_checkout");
}

function getServerCheckoutSnapshot(): string | null {
  return null;
}

function parseStoredCheckout(raw: string | null): StoredCheckout | null {
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw) as StoredCheckout;
    if (!parsed.clientSecret || !parsed.name) return null;
    return parsed;
  } catch {
    return null;
  }
}

export function CheckoutClient() {
  const router = useRouter();
  const raw = useSyncExternalStore(
    subscribeNoop,
    getStoredCheckoutSnapshot,
    getServerCheckoutSnapshot,
  );
  const checkout = parseStoredCheckout(raw);

  if (!checkout) {
    return (
      <div className="mx-auto max-w-lg px-6 py-24 text-center">
        <h1 className="text-2xl font-semibold text-ink-900">
          Your checkout session has expired
        </h1>
        <p className="mt-4 text-ink-600">
          Please head back to the booking form to start again.
        </p>
        <button
          onClick={() => router.push("/#book")}
          className="mt-8 rounded-full bg-basin-700 px-6 py-3 text-sm font-semibold text-sand-50 transition-colors hover:bg-basin-800"
        >
          Back to Booking Form
        </button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-lg px-6 py-16 sm:py-24">
      <div className="mb-8 text-center">
        <h1
          className="text-3xl font-semibold text-ink-900"
          style={{ fontFamily: "var(--font-sans), ui-sans-serif, system-ui, sans-serif" }}
        >
          Secure Checkout
        </h1>
        <p className="mt-2 text-sm text-ink-600">
          Complete your {siteConfig.depositAmount} deposit to lock in your
          installation with {siteConfig.name}.
        </p>
      </div>

      <div className="rounded-2xl border border-sand-200 bg-white p-6 shadow-sm sm:p-8">
        <CheckoutElementsProvider
          stripe={getStripe()}
          options={{
            clientSecret: checkout.clientSecret,
            elementsOptions: {
              appearance: stripeAppearance,
              fonts: stripeElementsFonts,
            },
          }}
        >
          <PaymentForm name={checkout.name} />
        </CheckoutElementsProvider>
      </div>

      <p className="mt-6 text-center text-xs text-ink-400">
        Payments are processed securely by Stripe. We never see or store your
        card details.
      </p>
    </div>
  );
}
