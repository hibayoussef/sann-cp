export interface IWarranty {
    id: number;
    organization_id: number;
    warranty_name_ar: string | null;
    warranty_name_en: string;
    duration: number;
    duration_type: "days" | "months" | "years";
  }
  
  export interface WarrantyForm {
    organization_id: number | null;
    warranty_name_ar?: string | null;
    warranty_name_en: string;
    duration?: string;
    duration_type?: "days" | "months" | "years"| string;
  }