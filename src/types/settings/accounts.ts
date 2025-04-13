import type { IAttachment } from "../morphables/attatchement";

export interface IAccount {
  id: number;
  account_name_ar: string | undefined;
  account_name_en: string | undefined;
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
  parent_account_id?: number | null;
  attachments: IAttachment;
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

export interface AccountTypeItem {
  id: number;
  type_ar: string;
  type_en: string;
  description_ar: string;
  description_en: string;
  prefix_code: number;
}

export interface AccountTypeGroup {
  primary_type_ar: string;
  primary_type_en: string;
  items: AccountTypeItem[];
}

export interface AccountUpdateForm {
  id?: number | null;
  data: AccountForm;
}
