import { z } from "zod";

export const statuses = [
  "canceled",
  "done",
  "in-progress",
  "todo",
  "backlog",
] as const;
export const categorySchema = z.object({
  id: z.number().optional(),
  category_name_en: z.string().nonempty("Category Name(EN) is required"),
  category_name_ar: z.string().nullable(),
  description_en: z.string().nonempty("Description(EN) is required"),
  description_ar: z.string().nullable(),
  code: z.string().nullable(),
});

export type CategoryType = z.infer<typeof categorySchema>;
