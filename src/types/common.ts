// Time Zone Type
export interface TimeZone {
  id: number;
  name: string;
  offset: string;
}
export interface TimeZoneData {
  data: TimeZone[];
}
export interface TimeZoneResponse {
  success: boolean;
  message: string;
  data: TimeZone[];
}
// Industry Type
export interface Module {
  id: number;
  name_ar: string;
  name_en: string;
}

export interface Industry {
  id: number;
  name_ar: string;
  name_en: string;
  modules: { module: Module }[];
}

export interface IndustryData {
  data: Industry[];
}

export interface IndustryResponse {
  success: boolean;
  message: string;
  data: Industry[];
}
// Countries
export interface CountryState {
  id: number;
  name_ar: string;
  name_en: string;
  zip_code: string;
  time_zone: TimeZone | null;
}

export interface Country {
  id: number;
  name_ar: string;
  name_en: string;
  nationality_ar: string;
  nationality_en: string;
  code: string;
  currency: number;
  country_states: CountryState[];
}

export interface CountriesData {
  data: Country[];
}

export interface CountriesResponse {
  success?: boolean;
  message?: string;
  data: Country[];
}
// Currencies
export interface Currency {
  id: number;
  currency_name: string;
  currency_name_ar: string;
  currency_code: string;
  currency_code_ar: string;
  currency_symbol: string;
}

export interface CurrencyResponse {
  success: boolean;
  message: string;
  data: Currency[];
}

// Plans
export interface PlanPrice {
  id: number;
  currency: number;
  monthly_price_ar: string;
  monthly_price_en: string;
  yearly_price_ar: string;
  yearly_price_en: string;
}

export interface PlanFeature {
  id: number;
  feature: number;
  feature_ar: string;
  feature_en: string;
  feature_description_ar: string;
  feature_description_en: string;
}

export interface Plan {
  id: number;
  plan_name_ar: string;
  plan_name_en: string;
  plan_description_ar: string;
  plan_description_en: string;
  prices: PlanPrice[];
  features: PlanFeature[];
}

export interface PlansResponse {
  success: boolean;
  message: string;
  data: Plan[];
}
