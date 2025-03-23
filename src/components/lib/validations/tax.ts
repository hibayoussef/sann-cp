import { z } from "zod";

export const taxSchema = z.object({
tax_name_ar: z.string().optional(), 
   tax_name_en: z.string().min(1, "Tax name (EN) must be at least 5 characters"),
  amount: z.number().min(0.01, "Amount must be a positive number"),
  is_active: z.boolean().optional(),
});

export type TaxType = z.infer<typeof taxSchema>;
 
  