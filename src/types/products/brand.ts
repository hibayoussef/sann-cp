export interface IBrand {
  id: number;
  brand_name_ar?: string | null;
  brand_name_en: string;
  description_ar?: string | null;
  description_en?: string;
}

export interface BrandForm {
  id?: number | null;
  organization_id: number | null;
  brand_name_en: string;
  brand_name_ar?: string | null;
  description_en?: string | null;
  description_ar?: string | null;
}

export interface BrandUpdateForm {
  id?: number | null;
  data?: BrandForm;
}
