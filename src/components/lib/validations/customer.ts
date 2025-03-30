import { z } from "zod";

const contactDetailsSchema = z.object({
  passport_number: z.string().optional(),
  work_phone: z.string().optional(),
  website_url: z.string().optional(),
  department: z.string().optional(),
  profession: z.string().optional(),
  designation: z.string().optional(),
  social_media: z.string().optional(),
  id_issued_date: z.string().optional(),
  id_expiry_date: z.string().optional(),
  unified_number: z.string().optional(),
  date_of_birth: z.string().optional(),
  place_of_birth: z.string().optional(),
  visit_visa_number: z.number().optional(),
  driving_license_number: z.string().optional(),
  driving_license_issued_by: z.string().optional(),
  driving_license_issued_date: z.string().optional(),
  driving_license_expiry_date: z.string().optional(),
  home_address: z.string().optional(),
  work_address: z.string().optional(),
  p_o_box: z.string().optional(),
  billing_address_attention: z.string().optional(),
  billing_address_country_id: z.string().optional(),
  billing_address_street_1: z.string().optional(),
  billing_address_street_2: z.string().optional(),
  billing_address_city: z.string().optional(),
  billing_address_country_state_id: z.string().optional(),
  billing_address_zip_code: z.string().optional(),
  billing_address_phone: z.string().optional(),
  billing_address_fax_number: z.string().optional(),
  shipping_address_attention: z.string().optional(),
  shipping_address_country_id: z.string().optional(),
  shipping_address_street_1: z.string().optional(),
  shipping_address_street_2: z.string().optional(),
  shipping_address_city: z.string().optional(),
  shipping_address_country_state_id: z.string().optional(),
  shipping_address_zip_code: z.string().optional(),
  shipping_address_fax_number: z.string().optional(),
});

const contactPersonSchema = z.object({
  salutation_ar: z.string().optional(),
  salutation_en: z.string().optional(),
  full_name_ar: z
    .string()
    .min(2, "Full name (Arabic) must be at least 2 characters"),
  full_name_en: z
    .string()
    .min(2, "Full name (English) must be at least 2 characters"),
  first_name_ar: z
    .string()
    .min(2, "First name (Arabic) must be at least 2 characters"),
  first_name_en: z
    .string()
    .min(2, "First name (English) must be at least 2 characters"),
  last_name_ar: z
    .string()
    .min(2, "Last name (Arabic) must be at least 2 characters"),
  last_name_en: z
    .string()
    .min(2, "Last name (English) must be at least 2 characters"),
  email: z.string().email("Invalid email format").optional(),
  mobile: z
    .string()
    .min(10, "Mobile number must be at least 10 digits")
    .optional(),
  department: z.string().optional(),
  designation: z.string().optional(),
  social_media: z.string().optional(),
});

export const customerSchema = z.object({
  branch_id: z.string().optional(),
  portal_access: z.enum(["0", "1"]).optional(),
  portal_language: z.enum(["en", "ar"]).default("en").optional(),
  type: z.enum(["customer", "employee", "vendor"]).optional(),
  contact_type: z.enum(["business", "individual"]).optional(),

  full_name_ar: z
    .string()
    .min(2, "يجب أن يحتوي الاسم العربي على الأقل على حرفين"),
  full_name_en: z.string().min(2, "Name must contain at least 2 characters"),
  first_name_ar: z.string().optional(),
  first_name_en: z.string().optional(),
  last_name_ar: z.string().optional(),
  last_name_en: z.string().optional(),

  email: z.string().email("صيغة البريد الإلكتروني غير صحيحة"),
  mobile: z.string().min(10, "يجب أن يحتوي رقم الجوال على الأقل على 8 أرقام"),

  payment_term_id: z.string().min(1, "Payment Term is required"),
  currency_id: z.string().min(1, "Currency is required"),
  exchange_rate: z.string().optional(),
  balance: z.string().optional(),

  nationality_id: z.string().optional(),
  contact_details: contactDetailsSchema.optional(),
  contact_persons: z.array(contactPersonSchema).optional(),
});

export type CustomerType = z.infer<typeof customerSchema>;
