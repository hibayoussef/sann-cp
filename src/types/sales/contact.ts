// Basic data
export interface IContactDetails {
  passport_number?: string;
  work_phone?: string;
  website_url?: string;
  department?: string;
  profession?: string;
  designation?: string;
  social_media?: string;
  id_issued_date?: string;
  id_expiry_date?: string;
  unified_number?: string;
  date_of_birth?: string;
  place_of_birth?: string;
  visit_visa_number?: string;
  driving_license_number?: string;
  driving_license_issued_by?: string;
  driving_license_issued_date?: string;
  driving_license_expiry_date?: string;
  home_address?: string;
  work_address?: string;
  p_o_box?: string;
  billing_address_attention?: string;
  billing_address_country_id?: string;
  billing_address_street_1?: string;
  billing_address_street_2?: string;
  billing_address_city?: string;
  billing_address_country_state_id?: string;
  billing_address_zip_code?: string;
  billing_address_phone?: string;
  billing_address_fax_number?: string;
  shipping_address_attention?: string;
  shipping_address_country_id?: string;
  shipping_address_street_1?: string;
  shipping_address_street_2?: string;
  shipping_address_city?: string;
  shipping_address_country_state_id?: string;
  shipping_address_zip_code?: string;
  shipping_address_fax_number?: string;
}

// Contact details and addresses
export interface IContactPerson {
  salutation_ar?: string;
  salutation_en?: string;
  full_name_ar?: string;
  full_name_en?: string;
  first_name_ar?: string;
  first_name_en?: string;
  last_name_ar?: string;
  last_name_en?: string;
  email?: string;
  mobile?: string;
  department?: string;
  designation?: string;
  social_media?: string;
}

// Information about people associated with the contact
export interface IContact {
  id?: number;
  organization_id: string;
  branch_id?: string;
  portal_access?: "0" | "1";
  portal_language?: "ar" | "en";
  type?: "customer" | "employee" | "vendor";
  contact_type?: "business" | "individual";
  full_name_ar: string;
  full_name_en: string;
  first_name_ar?: string;
  first_name_en?: string;
  last_name_ar?: string;
  last_name_en?: string;
  email?: string;
  mobile?: string;
  payment_term_id?: string;
  currency_id?: string;
  exchange_rate?: string;
  balance?: string;
  nationality_id?: string;
  contact_details?: IContactDetails;
  contact_persons?: IContactPerson[];
}
