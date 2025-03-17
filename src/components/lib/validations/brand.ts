import { z } from "zod";

export const brandSchema = z.object({
  id: z.number().optional(), 
  brand_name_en: z
    .string()
    .min(2, "Brand name (EN) must be at least 2 characters"),
  brand_name_ar: z
    .string()
    .min(2, "Brand name (AR) must be at least 2 characters"),
  description_en: z
    .string()
    .min(5, "Description (EN) must be at least 5 characters"),
  description_ar: z
    .string()
    .min(5, "Description (AR) must be at least 5 characters"),
});

export type BrandType = z.infer<typeof brandSchema>;
