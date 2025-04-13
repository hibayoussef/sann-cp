import { z } from "zod";

export const productSchema = z.object({
  // Required fields
  for_selling: z.number().min(0).max(1),
  type: z.enum(["Goods", "Service", "Landing Cost"]),
  product_name_en: z.string().min(1, "Product name (EN) is required"),
  product_name_ar: z.string().optional(),
  sku: z.string().min(1, "SKU is required"),
  category_id: z.coerce.number().min(1, "Category is required"),
  unit_id: z.coerce.number().min(1, "Unit is required"),
  alert_quantity: z.coerce.number().min(1, "Alert quantity is required"),
  sale_account: z.coerce.number().min(1, "Sale account is required"),
  purchase_account: z.coerce.number().min(1, "Purchase account is required"),
  sale_return_account: z.coerce.number().min(1, "Sale return account is required"),
  purchase_return_account: z.coerce.number().min(1, "Purchase return account is required"),
  purchase_price: z.coerce.number().min(1, "Purchase price is required"),
  sale_price: z.coerce.number().min(1, "Sale price is required"),
  is_active: z.coerce.number(),
  default_sale_unit: z.coerce.number().min(1, "Default sale unit is required"),
  default_purchase_unit: z.coerce.number().min(1, "Default purchase unit is required"),
  branches: z.array(
    z.object({
      branch_id: z.coerce.number().min(1, "Branch is required"),
      is_active: z.union([
        z.boolean(),
        z.number().transform((val) => Boolean(val)),
      ]),
    })
  ),

  // Optional fields
  color: z.string().optional().default("blue"),
  tax_id: z.coerce.number().nullable().optional(),
  brand_id: z.coerce.number().nullable().optional(),
  sub_category_id: z.coerce.number().nullable().optional(),
  sub_units: z.array(z.object({ id: z.coerce.number().min(1).nullable() })).optional(),
  warranty_id: z.coerce.number().nullable().optional(),
  expiry_date: z.string().nullable().optional(),
});

export type ProductType = z.infer<typeof productSchema>;
