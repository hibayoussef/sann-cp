import { z } from "zod";
export const brandSchema = z.object({
  id: z.number().optional(),
  brand_name_en: z.string().nonempty("Brand Name(En) is required"),
  brand_name_ar: z.string().optional(),
  description_en: z.string().nonempty("Descripton (En) is required"),
  description_ar: z.string().optional(),
});

export type BrandType = z.infer<typeof brandSchema>;
