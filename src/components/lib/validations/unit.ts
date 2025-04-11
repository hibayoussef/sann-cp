import { z } from "zod";

export const unitSchema = z.object({
  id: z.number().optional(),
  unit_name_en: z.string().nonempty("Unit Name (EN) is required"),
  unit_name_ar: z.string().optional(),
  short_name_en: z.string().nonempty("Short Name (EN) is required"),
  short_name_ar: z.string().optional(),
  allow_decimal: z.number(),
  multiplier: z.number().optional(),
  // related_to: z.coerce.number().min(1, "Unit is required").nullable(),
  sub_units: z
    .array(
      z.object({
        unit_name_en: z.string().optional(),
        unit_name_ar: z.string().nullable(),
        short_name_en: z.string().optional(),
        short_name_ar: z.string().nullable(),
        multiplier: z.number().optional(),
      })
    )
    .optional(),
});

export type UnitType = z.infer<typeof unitSchema>;