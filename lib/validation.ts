import { z } from "zod";

// Empty strings from the form (unfilled optional inputs) become undefined so
// .optional() applies and we store NULL instead of "".
const optionalTrimmed = (max: number) =>
  z
    .string()
    .trim()
    .max(max)
    .transform((value) => (value === "" ? undefined : value))
    .optional();

export const bookingSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Please enter your name.")
    .max(200, "Name is too long."),
  phone: z
    .string()
    .trim()
    .min(7, "Please enter a valid phone number.")
    .max(30, "Please enter a valid phone number.")
    .regex(/^[0-9+()\-.\s]+$/, "Phone number contains invalid characters."),
  email: z.email("Please enter a valid email address.").trim().toLowerCase().max(320),
  address: z
    .string()
    .trim()
    .min(1, "Please enter your installation address.")
    .max(500, "Address is too long."),
  preferredDate: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Preferred date must be a valid date.")
    .optional()
    .or(z.literal("").transform(() => undefined)),
  message: optionalTrimmed(2000),
  agreedToTerms: z.literal(true, {
    error: "Please agree to the Terms of Service and related policies before booking.",
  }),
});

export const checkoutSchema = bookingSchema.omit({ agreedToTerms: true }).extend({
  bookingId: z.coerce.number().int().positive().optional(),
});

export type BookingInput = z.infer<typeof bookingSchema>;
export type CheckoutInput = z.infer<typeof checkoutSchema>;

export function firstIssueMessage(error: z.ZodError): string {
  return error.issues[0]?.message ?? "Please check your details and try again.";
}
