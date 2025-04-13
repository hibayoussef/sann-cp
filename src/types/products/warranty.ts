export interface IWarranty {
  id: number;
  warranty_name_ar?: string | null;
  warranty_name_en: string;
  duration: number;
  duration_type: "Days" | "Months" | "Years";
}

export interface WarrantyForm {
  organization_id: number | null;
  warranty_name_ar?: string | null;
  warranty_name_en: string;
  duration: number;
  duration_type: "Days" | "Months" | "Years";
}

export interface WarrantyUpdateForm {
  id: number;
  data: WarrantyForm;
}
