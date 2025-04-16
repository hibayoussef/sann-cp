export interface ITax {
  id: number;
  tax_name_ar?: string | null;
  tax_name_en: string;
  amount: number;
  is_active?: number;
}

export interface TaxForm {
  organization_id: number | null;
  tax_name_ar?: string | null;
  tax_name_en: string;
  amount: number;
  is_active?:  number ;
}

export interface TaxUpdateForm {
  id: number;
  data: TaxForm;
}
