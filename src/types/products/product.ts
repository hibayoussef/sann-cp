export interface IProduct {
  id: number;
  for_selling: number | null ;
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
  sub_unit?: string;
  warranty_id?: number;
  alert_quantity?: number | null;
  sale_account?: number | null;
  purchase_account?: number;
  sale_return_account?: number;
  purchase_return_account?: number;
  purchase_price: number;
  sale_price: number;
  expiry_date?: string;
  is_active: boolean;
  branches: {
    branch_id: number;
  }[];
  default_sale_unit?: string;
  default_purchase_unit?: string;
}

export interface ProductForm {
  id?: number | null;
  organization_id: number | null;
  for_selling: boolean;
  type: "Goods" | "Service" | "Landing Cost";
  product_name_en: string;
  product_name_ar: string;
  sku: string;
  color?: string;
  tax_id?: number;
  brand_id?: number;
  category_id?: number;
  sub_category_id?: number;
  unit_id: number;
  sub_unit?: string;
  warranty_id?: number;
  alert_quantity?: number | null;
  sale_account?: number | null;
  purchase_account?: number;
  sale_return_account?: number;
  purchase_return_account?: number;
  purchase_price: number;
  sale_price: number;
  expiry_date?: string;
  is_active: boolean;
  branches: {
    branch_id: number;
  }[];
  default_sale_unit?: string;
  default_purchase_unit?: string;
}

export interface ProductUpdateForm {
  id?: number | null;
  data?: ProductForm;
}
