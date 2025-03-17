export interface ICategory {
  id: number;
  category_name_en: string;
  category_name_ar?: string | null;
  description_en?: string | null;
  description_ar?: string | null;
  code?: string | null;
}

export interface CategoryForm {
  id?: number | null;
  organization_id: number | null;
  category_name_en: string;
  category_name_ar?: string | null;
  description_en?: string | null;
  description_ar?: string | null;
  code?: string | null;
}

export interface CategoryUpdateForm {
  id?: number | null;
  data?: CategoryForm;
}
