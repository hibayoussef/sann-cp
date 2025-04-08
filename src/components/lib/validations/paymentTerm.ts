import { z } from "zod";

export const paymentTermSchema = z.object({
  term_name_en: z.string().min(1, "Term name (EN) is required."),
  number_of_days: z
    .union([z.coerce.number().min(0, "Must be 0 or more"), z.literal("")])
    .refine((val) => typeof val === "number", {
      message: "Number of days must be a number",
    }),
  term_name_ar: z.string().nullable().optional(),
  organization_name_en: z.string().nullable().optional(),
});

export type PaymentTermType = z.infer<typeof paymentTermSchema>;
