import { z } from "zod";

const contactDetailsSchema = z.object({
  passport_number: z.string().optional(),
  work_phone: z.string().optional(),
  website_url: z.string().optional(),
  department: z.string().optional(),
  profession: z.string().optional(),
  designation: z.string().optional(),
  social_media: z
    .array(
      z.object({
        platform: z.string().optional(),
        url: z.string().optional(),
      })
    )
    .optional(),
  id_issued_date: z.string().optional(),
  id_expiry_date: z.string().optional(),
  unified_number: z.string().optional(),
  date_of_birth: z.string().optional(),
  place_of_birth: z.string().optional(),
  visit_visa_number: z.number().optional().or(z.literal("")),
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
  full_name_ar: z.string().optional(),
  full_name_en: z.string().min(1, "The full name en field is required."),
  first_name_en: z.string().min(1, "The first name en field is required."),
  last_name_en: z.string().min(1, "The last name en field is required."),
  first_name_ar: z.string().optional(),
  last_name_ar: z.string().optional(),
  email: z.string().min(1, "The email field is required.").email(),
  mobile: z.string().optional(),
  department: z.string().optional(),
  designation: z.string().optional(),
  social_media: z
    .array(
      z.object({
        platform: z.string().optional(),
        url: z.string().optional(),
      })
    )
    .optional(),
});

export const customerSchema = z.object({
  branch_id: z.string().min(1, "The branch id field is required."),
  portal_access: z.enum(["0", "1"], {
    required_error: "The portal access field is required.",
  }),
  contact_type: z.enum(["business", "individual"], {
    required_error: "The contact type field is required.",
  }),
  full_name_en: z.string().min(1, "The full name en field is required."),
  first_name_en: z.string().min(1, "The first name en field is required."),
  last_name_en: z.string().min(1, "The last name en field is required."),
  email: z.string().min(1, "The email field is required.").email(),
  mobile: z.string().min(1, "The mobile field is required."),
  payment_term_id: z.string().min(1, "The payment term id field is required."),
  currency_id: z.string().min(1, "The currency id field is required."),
  exchange_rate: z.string().min(1, "The exchange rate field is required."),
  balance: z.string().min(1, "The balance field is required."),
  nationality_id: z.string().min(1, "The nationality id field is required."),
  portal_language: z.enum(["en", "ar"]).default("en").optional(),
  full_name_ar: z.string().optional(),
  first_name_ar: z.string().optional(),
  last_name_ar: z.string().optional(),
  contact_details: contactDetailsSchema.optional(),
  contact_persons: z.array(contactPersonSchema).optional(),
});

export type CustomerType = z.infer<typeof customerSchema>;
