import { z } from "zod";

export const unitSchema = z.object({
  id: z.number().optional(),
  unit_name_en: z
    .string()
    .min(2, "Unit name (EN) must be at least 2 characters"),
  unit_name_ar: z
    .string()
    .min(2, "Unit name (AR) must be at least 2 characters"),
  short_name_en: z
    .string()
    .min(1, "Short name (EN) must be at least 1 character"),
  short_name_ar: z
    .string()
    .min(1, "Short name (AR) must be at least 1 character"),
  allow_decimal: z.boolean(),
  multiplier: z.number().min(1, "Multiplier must be provided"),
  sub_units: z
    .array(
      z.object({
        unit_name_en: z.string(),
        unit_name_ar: z.string().nullable(),
        short_name_en: z.string(),
        short_name_ar: z.string().nullable(),
        allow_decimal: z.boolean(),
        multiplier: z.number(),
      })
    )
    .optional(),
});

export type UnitType = z.infer<typeof unitSchema>;
