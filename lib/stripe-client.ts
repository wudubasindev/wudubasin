import { loadStripe, type Stripe } from "@stripe/stripe-js";

let stripePromise: Promise<Stripe | null> | undefined;

export function getStripe() {
  if (!stripePromise) {
    stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || "");
  }
  return stripePromise;
}

export const stripeElementsFonts = [
  {
    family: "Inter",
    src: "url(https://fonts.gstatic.com/s/inter/v20/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuLyfAZ9hiA.woff2)",
    weight: "400",
  },
  {
    family: "Inter",
    src: "url(https://fonts.gstatic.com/s/inter/v20/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuGKYAZ9hiA.woff2)",
    weight: "600",
  },
];

export const stripeAppearance = {
  variables: {
    colorPrimary: "#175650",
    colorBackground: "#ffffff",
    colorText: "#292620",
    colorTextSecondary: "#5b5748",
    colorTextPlaceholder: "#8a8574",
    colorDanger: "#c0362c",
    fontFamily: "Inter, ui-sans-serif",
    borderRadius: "12px",
    spacingUnit: "4px",
  },
  rules: {
    ".Input": {
      border: "1px solid #d8c9a8",
      boxShadow: "none",
    },
    ".Input:focus": {
      border: "1px solid #1f6b62",
      boxShadow: "0 0 0 2px #cde4df",
    },
    ".Label": {
      fontWeight: "500",
      color: "#292620",
    },
    ".Tab": {
      border: "1px solid #d8c9a8",
      boxShadow: "none",
    },
    ".Tab:hover": {
      color: "#175650",
    },
    ".Tab--selected": {
      border: "1px solid #1f6b62",
      boxShadow: "0 0 0 2px #cde4df",
    },
  },
};
