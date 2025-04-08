import { z } from "zod";

export const taxSchema = z.object({
  tax_name_ar: z.string().optional(),
  tax_name_en: z.string().nonempty("Warranty Name (EN) is required"),
  amount: z.number().min(0.01, "Amount is required"),
  is_active: z.boolean().optional(),
});

export type TaxType = z.infer<typeof taxSchema>;
