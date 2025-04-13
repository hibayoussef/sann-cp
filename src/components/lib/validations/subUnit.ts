import { z } from "zod";

export const subUnitSchema = z.object({
  id: z.number().optional(),
  unit_name_en: z.string().min(1, "Unit Name (EN) is required"),
  unit_name_ar: z.string().optional(),
  short_name_en: z.string().min(1, "Short Name (EN) is required"),
  short_name_ar: z.string().optional(),
  allow_decimal: z.number(),
  multiplier: z.number().optional().nullable(),
  related_to: z.string().min(1, "Unit is required"),
});

export type SubUnitType = z.infer<typeof subUnitSchema>;
