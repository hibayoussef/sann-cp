export interface IProduct {
  id: number;
  organization_id: number;
  for_selling: number;
  type: "Goods" | "Service" | "Landing Cost";
  product_name_ar: string;
  product_name_en: string;
  sku: string;
  color?: string;
  tax_id?: number | null;
  brand_id?: number | null;
  category_id?: number | null;
  sub_category_id?: number | null;
  unit_id: number | null;
  sub_units: Array<{ id: number | null }>;
  warranty_id?: number | null;
  alert_quantity?: number | null;
  sale_account?: number | null | undefined;
  purchase_account?: number | null | undefined;
  sale_return_account?: number;
  purchase_return_account?: number;
  purchase_price: number;
  sale_price: number;
  expiry_date?: string;
  is_active: number;
  branches: Array<{
    branch_id: number;
    is_active: boolean;
  }>;
  default_sale_unit: number | null;
  default_purchase_unit: number | null;
}

export interface ProductForm {
  organization_id: number;
  for_selling: number;
  type: "Goods" | "Service" | "Landing Cost";
  product_name_ar: string;
  product_name_en: string;
  sku: string;
  color?: string;
  tax_id?: number;
  brand_id?: number;
  category_id?: number;
  sub_category_id?: number;
  unit_id: number;
  sub_units: Array<{ id: number }>;
  warranty_id?: number;
  alert_quantity?: number;
  sale_account?: number;
  purchase_account?: number;
  sale_return_account?: number;
  purchase_return_account?: number;
  purchase_price: number;
  sale_price: number;
  expiry_date?: string;
  is_active: boolean;
  branches: Array<{
    branch_id: number;
    is_active: boolean;
  }>;
  default_sale_unit: number;
  default_purchase_unit: number;
}

export interface ProductUpdateForm {
  id?: number | null;
  data?: ProductForm;
}
