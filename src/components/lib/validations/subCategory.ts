import { z } from "zod";

export const subCategorySchema = z.object({
  id: z.number().optional(),
  sub_category_name_en: z
    .string()
    .min(2, "Sub Category name (EN) must be at least 2 characters"),
  sub_category_name_ar: z
    .string()
    .min(2, "Sub Category name (AR) must be at least 2 characters"),
  description_en: z
    .string()
    .min(5, "Description (EN) must be at least 5 characters"),
  description_ar: z
    .string()
    .min(5, "Description (AR) must be at least 5 characters"),
  code: z.string().min(5, "Code must be at least 5 characters"),
});

export type SubCategoryType = z.infer<typeof subCategorySchema>;
