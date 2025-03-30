import { z } from "zod";

export const subUnitSchema = z.object({
  id: z.number().optional(),
  unit_name_en: z
    .string()
    .min(2, "Sub Unit name (EN) must be at least 2 characters"),
  unit_name_ar: z
    .string()
    .min(2, "Sub Unit name (AR) must be at least 2 characters"),
  short_name_en: z
    .string()
    .min(1, "Short name (EN) must be at least 1 character"),
  short_name_ar: z
    .string()
    .min(1, "Short name (AR) must be at least 1 character"),
  allow_decimal: z.number(),
  multiplier: z.number().min(1, "Multiplier must be provided"),
  related_to: z.coerce.number().min(1, "Related to is required").nullable(),
});

export type SubUnitType = z.infer<typeof subUnitSchema>;
