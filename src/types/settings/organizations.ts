// src/types/organization.ts
export interface Subscription {
  id: number;
  start_date: string;
  end_date: string;
  status: string;
  plan_id: number;
  plan_name_ar: string;
  plan_name_en: string;
  plan_number_of_branches: number;
  plan_number_of_users: number;
  plan_number_of_invoices: number;
  plan_number_of_bills: number;
  plan_price_id: number;
  plan_price: number;
  plan_price_with_code_ar: string;
  plan_price_with_code_en: string;
  plan_currency_id: number;
  plan_currency_ar: string;
  plan_currency_en: string;
  plan_currency_code: string;
  plan_currency_symbol: string;
  plan_type: string;
}

export interface Feature {
  id: number;
  name_ar: string;
  name_en: string;
  description_ar: string;
  description_en: string;
}

export interface Module {
  id: number;
  name_ar: string;
  name_en: string;
  features: Feature[];
}

export interface Branch {
  id: number;
  branch_name_ar: string;
  branch_name_en: string;
  stores: Store[];
}

export interface Store {
  id: number;
  store_name_ar: string;
  store_name_en: string;
}

export interface OrganizationData {
  id: number;
  industry_id: number;
  industry_name_ar: string;
  industry_name_en: string;
  organization_name_ar: string | null;
  organization_name_en: string;
  country_id: number;
  country_name_ar: string;
  country_name_en: string;
  language: string;
  currency_id: number;
  currency_name_ar: string;
  currency_name_en: string;
  currency_code: string;
  currency_symbol: string;
  time_zone_id: number;
  time_zone: string;
  time_zone_offset: string;
  subscription: Subscription;
  modules: Module[];
  branches: Branch[];
}

export interface OrganizationResponse {
  success: boolean;
  message: string;
  data: OrganizationData;
}
