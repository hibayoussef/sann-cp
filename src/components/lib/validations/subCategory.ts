import { z } from "zod";

export const subCategorySchema = z.object({
  id: z.number().optional(),
  category_id: z.string().min(1, "The Category field is required."),
  sub_category_name_en: z.string().min(1, "Sub Category (EN) is required"),
  sub_category_name_ar: z.string().optional(),
  description_en: z.string().min(1, "Description (EN) is required"),
  description_ar: z.string().optional(),
  code: z.string().optional(),
});

export type SubCategoryType = z.infer<typeof subCategorySchema>;
