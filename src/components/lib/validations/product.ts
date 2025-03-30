import { z } from "zod";

export const productSchema = z.object({
  id: z.number().optional(),
  for_selling: z.number().min(0).max(1, "For selling must be either 0 or 1"),
  type: z.enum(["Goods", "Service", "Landing Cost"]),
  product_name_en: z
    .string()
    .min(2, "Product name (EN) must be at least 2 characters"),
  product_name_ar: z
    .string()
    .min(2, "Product name (AR) must be at least 2 characters"),
  sku: z.string().min(1, "SKU is required"),
  color: z.string().nullable().optional(),
  tax_id: z.number().nullable().optional(),
  brand_id: z.number().nullable().optional(),
  branch_id: z.number().nullable().optional(),
  sub_category_id: z.number().nullable().optional(),
  warranty_id: z.number().nullable().optional(),
  sub_units: z
    .array(
      z.object({
        id: z.number().min(1, "Sub-unit ID must be a positive number"),
      })
    )
    .optional(),
  alert_quantity: z
    .number()
    .min(0, "Alert quantity must be a positive number")
    .nullable()
    .optional(),
  sale_account: z.number().nullable().optional(),
  purchase_account: z.number().nullable().optional(),
  sale_return_account: z.number().nullable().optional(),
  purchase_return_account: z.number().nullable().optional(),
  purchase_price: z.number().min(0, "Purchase price must be a positive number"),
  sale_price: z.number().min(0, "Sale price must be a positive number"),
  expiry_date: z.string().nullable().optional(),
  is_active: z.boolean(),
  branches: z
    .array(
      z.object({
        branch_id: z.number().min(1, "Branch is required"),
      })
    )
    .nonempty("At least one branch is required"),

  category_id: z.number().min(1, "Category is required").nullable(),
  unit_id: z.number().min(1, "Unit is required").nullable(),
  default_sale_unit: z.string().min(1, "Default sale unit is required"),
  default_purchase_unit: z.string().min(1, "Default purchase unit is required"),
});

export type ProductType = z.infer<typeof productSchema>;
