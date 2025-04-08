export interface IPaymentTerm {
  id: number;
  organization_id: number;
  organization_name_ar?: string;
  organization_name_en?: string;
  term_name_ar?: string | null;
  term_name_en: string;
  number_of_days: number;
}
