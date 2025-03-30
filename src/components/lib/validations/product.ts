
import { z } from "zod";
export const productSchema = z.object({
  for_selling: z.number().min(0).max(1),
  type: z.enum(["Goods", "Service", "Landing Cost"]),
  product_name_ar: z
    .string()
    .min(10, "Product name (AR) must be at least 10 characters"),
  product_name_en: z.string().min(1, "Product name (EN) is required"),
  sku: z.string().min(1, "SKU is required"),
  color: z.string().optional().default("blue"),
  tax_id: z.coerce.number().min(1, "Tax is required"),
  brand_id: z.coerce.number().min(1, "Brand is required"),
  category_id: z.coerce.number().min(1, "Category is required"),
  sub_category_id: z.coerce.number().optional(),
  unit_id: z.coerce.number().min(1, "Unit is required"),
  sub_units: z.array(z.object({ id: z.coerce.number().min(1) })).optional(),
  warranty_id: z.coerce.number().optional(),
  alert_quantity: z.coerce.number().optional(),
  sale_account: z.coerce.number().optional(),
  purchase_account: z.coerce.number().optional(),
  sale_return_account: z.coerce.number().optional(),
  purchase_return_account: z.coerce.number().optional(),
  purchase_price: z.number().min(0, "Purchase price must be a positive number"),
  sale_price: z.number().min(0, "Sale price must be a positive number"),
  expiry_date: z.string().nullable().optional(),
  is_active: z.boolean(),
  branches: z.array(
    z.object({
      branch_id: z.coerce.number().min(1, "Branch is required"),
      is_active: z.union([
        z.boolean(),
        z.number().transform((val) => Boolean(val)),
      ]),
    })
  ),
  default_sale_unit: z.coerce.number().min(1, "Default sale unit is required"),
  default_purchase_unit: z.coerce
    .number()
    .min(1, "Default purchase unit is required"),
});
export type ProductType = z.infer<typeof productSchema>;
