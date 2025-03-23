import { z } from "zod";

export const warrantySchema = z.object({
  warranty_name_ar: z.string().optional(),
  warranty_name_en: z.string().min(5, "Warranty name (EN) must be at least 5 characters"),
  duration: z.number().min(1, "Duration must be a positive number"),
  duration_type: z.enum(["Days", "Months", "Years"]),
});

export type WarrantyType = z.infer<typeof warrantySchema>;