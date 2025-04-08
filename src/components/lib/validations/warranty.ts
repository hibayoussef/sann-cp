import { z } from "zod";

export const warrantySchema = z.object({
  warranty_name_ar: z.string().optional(),
  warranty_name_en: z.string().nonempty("Warranty Name (EN) is required"),
  duration: z.number().min(1, "Duration is required "),
  duration_type: z.enum(["Days", "Months", "Years"]),
});

export type WarrantyType = z.infer<typeof warrantySchema>;
