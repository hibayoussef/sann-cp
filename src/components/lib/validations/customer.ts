import { z } from "zod";

const contactDetailsSchema = z.object({
  passport_number: z
    .string()
    .min(6, "Passport number must be at least 6 characters")
    .optional(),
  work_phone: z
    .string()
    .regex(/^[0-9+\-()\s]+$/, "Invalid phone number format")
    .optional(),
  website_url: z.string().url("Invalid website URL").optional(),
  department: z.string().optional(),
  profession: z.string().optional(),
  designation: z.string().optional(),
  social_media: z.string().optional(),
  id_issued_date: z.string().optional(),
  id_expiry_date: z.string().optional(),
  unified_number: z
    .string()
    .min(3, "Unified Number must be at least 3 characters")
    .optional(),
  date_of_birth: z.string().optional(),
  place_of_birth: z.string().min(2, "Place of Birth must be valid").optional(),
  visit_visa_number: z.string().optional(),
  driving_license_number: z.string().optional(),
  driving_license_issued_by: z.string().optional(),
  driving_license_issued_date: z.string().optional(),
  driving_license_expiry_date: z.string().optional(),
  home_address: z.string().optional(),
  work_address: z.string().optional(),
  p_o_box: z.string().optional(),
  billing_address_attention: z.string().optional(),
  billing_address_country_id: z.number().optional(),
  billing_address_street_1: z.string().optional(),
  billing_address_street_2: z.string().optional(),
  billing_address_city: z.string().optional(),
  billing_address_country_state_id: z.number().optional(),
  billing_address_zip_code: z.string().optional(),
  billing_address_phone: z
    .string()
    .min(6, "Billing address phone number must be at least 6 characters")
    .optional(),
  billing_address_fax_number: z.string().optional(),
  shipping_address_attention: z.string().optional(),
  shipping_address_country_id: z.number().optional(),
  shipping_address_street_1: z.string().optional(),
  shipping_address_street_2: z.string().optional(),
  shipping_address_city: z.string().optional(),
  shipping_address_country_state_id: z.number().optional(),
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
  organization_id: z.number(),
  branch_id: z.number().optional(),
  portal_access: z.enum(["0", "1"]).transform(val => val === "1"),
  portal_language: z.enum(["en", "ar"]).default("en"),
  type: z.enum(["customer", "employee", "vendor"]),
  contact_type: z.enum(["business", "individual"]),

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

  payment_term_id: z.number().optional(),
  currency_id: z.number().optional(),
  exchange_rate: z.string().optional(),
  balance: z.string().optional(),

  nationality_id: z.number().optional(),
  contact_details: contactDetailsSchema.optional(),
  contact_persons: z.array(contactPersonSchema).optional(),
});

export type CustomerType = z.infer<typeof customerSchema>;
