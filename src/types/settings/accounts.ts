export interface IAccount {
  id: number;
  account_name_ar: string;
  account_name_en: string;
  account_code: string;
  description_ar: string;
  description_en: string;
  account_number?: string | null;
  is_active: number;
  balance: string;
  organization_id: number;
  organization_name_ar?: string | null;
  organization_name_en?: string | null;
  account_type_id: number;
  account_primary_type_ar: string;
  account_primary_type_en: string;
  account_type_ar: string;
  account_type_en: string;
  currency_id?: number | null;
  currency_name_ar?: string | null;
  currency_name?: string | null;
  currency_code?: string | null;
  currency_symbol?: string | null;
}

export interface AccountForm {
  id?: number | null;
  organization_id: number;
  account_type_id: number;
  parent_account_id?: number | null;
  account_name_en: string;
  account_name_ar: string;
  account_code: string;
  description_en: string;
  description_ar: string;
  account_number?: string | null;
  currency_id?: number | null;
  balance?: string | null;
  branches?: number[];
}

export interface AccountUpdateForm {
  id?: number | null;
  data: AccountForm;
}
