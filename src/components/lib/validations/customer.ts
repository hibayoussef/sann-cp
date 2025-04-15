import { z } from "zod";

const contactDetailsSchema = z.object({
  passport_number: z.string().optional().nullable(),
  work_phone: z.string().optional().nullable(),
  website_url: z.string().optional().nullable(),
  department: z.string().optional().nullable(),
  profession: z.string().optional().nullable(),
  designation: z.string().optional().nullable(),
  social_media: z
    .union([
      z.string().transform((str) => {
        try {
          return JSON.parse(str);
        } catch {
          return [];
        }
      }),
      z.array(
        z.object({
          platform: z.string().optional(),
          url: z.string().optional(),
        })
      ),
    ])
    .optional()
    .nullable(),
  id_issued_date: z.string().optional().nullable(),
  id_expiry_date: z.string().optional().nullable(),
  unified_number: z.string().optional().nullable(),
  date_of_birth: z.string().optional().nullable(),
  place_of_birth: z.string().optional().nullable(),
  // visit_visa_number: z.number().optional().nullable().or(z.literal("")),/
  visit_visa_number: z.preprocess(
    (val) => String(val),
    z.string().optional().nullable()
  ),
  driving_license_number: z.string().optional().nullable(),
  // driving_license_issued_by: z.string().optional().nullable(),
  // driving_license_issued_by: z.preprocess(
  //   (val) => String(val),
  //   z.string().optional()
  // ),
  driving_license_issued_date: z.string().optional().nullable(),
  driving_license_expiry_date: z.string().optional().nullable(),
  home_address: z.string().optional().nullable(),
  work_address: z.string().optional().nullable(),
  p_o_box: z.string().optional().nullable(),
  // driving_license_issued_by: z.preprocess(
  //   (val) => (val === "undefined" ? undefined : val),
  //   z.string().optional().nullable()
  // ),
  driving_license_issued_by: z.preprocess(
    (val) => (val === "undefined" ? undefined : val),
    z.string().optional().nullable()
  ),
  billing_address_country_id: z.preprocess(
    (val) =>
      val === "undefined" || val === undefined ? undefined : String(val),
    z.string().optional().nullable()
  ),
  billing_address_country_state_id: z.preprocess(
    (val) =>
      val === "undefined" || val === undefined ? undefined : String(val),
    z.string().optional().nullable()
  ),
  shipping_address_country_id: z.preprocess(
    (val) => (val === "undefined" ? undefined : val),
    z.string().optional().nullable()
  ),
  shipping_address_country_state_id: z.preprocess(
    (val) => (val === "undefined" ? undefined : val),
    z.string().optional().nullable()
  ),
  billing_address_attention: z.string().optional().nullable(),
  // billing_address_country_id: z.preprocess(
  //   (val) => String(val),
  //   z.string().optional()
  // ),
  billing_address_street_1: z.string().optional().nullable(),
  billing_address_street_2: z.string().optional().nullable(),
  billing_address_city: z.string().optional().nullable(),
  // billing_address_country_state_id: z.preprocess(
  //   (val) => String(val),
  //   z.string().optional()
  // ),
  billing_address_zip_code: z.string().optional().nullable(),
  billing_address_phone: z.string().optional().nullable(),
  billing_address_fax_number: z.string().optional().nullable(),
  shipping_address_attention: z.string().optional().nullable(),
  // shipping_address_country_id: z.preprocess(
  //   (val) => String(val),
  //   z.string().optional()
  // ),
  shipping_address_street_1: z.string().optional().nullable(),
  shipping_address_street_2: z.string().optional().nullable(),
  shipping_address_city: z.string().optional().nullable(),
  // shipping_address_country_state_id: z.preprocess(
  //   (val) => String(val),
  //   z.string().optional()
  // ),
  shipping_address_zip_code: z.string().optional().nullable(),
  shipping_address_fax_number: z.string().optional().nullable(),
});

const contactPersonSchema = z.object({
  id: z.number().nullable(),
  salutation_ar: z.string().optional().nullable(),
  salutation_en: z.string().optional().nullable(),
  full_name_ar: z.string().optional().nullable(),
  first_name_en: z.string().min(1, "The first name en field is required."),
  last_name_en: z.string().min(1, "The last name en field is required."),
  first_name_ar: z.string().optional().nullable(),
  last_name_ar: z.string().optional().nullable(),
  email: z.string().min(1, "The email field is required.").email(),
  mobile: z.string().optional().nullable(),
  department: z.string().optional().nullable(),
  designation: z.string().optional().nullable(),
  social_media: z
    .union([
      z.string().transform((str) => {
        try {
          return JSON.parse(str);
        } catch {
          return [];
        }
      }),
      z.array(
        z.object({
          platform: z.string().optional(),
          url: z.string().optional(),
        })
      ),
    ])
    .optional()
    .nullable(),
});

export const customerSchema = z.object({
  branch_id: z.preprocess(
    (val) => String(val),
    z.string().min(1, "The branch id field is required.")
  ),
  portal_access: z.preprocess(
    (val) => String(val),
    z.string().min(1, "The portal access field is required.")
  ),
  type: z.enum(["customer", "employee", "vendor"]).optional(),
  contact_type: z.enum(["business", "individual"], {
    required_error: "The contact type field is required.",
  }),
  full_name_ar: z.string().optional().nullable(),
  first_name_en: z.string().min(1, "The first name en field is required."),
  last_name_en: z.string().min(1, "The last name en field is required."),
  email: z.string().min(1, "The email field is required.").email(),
  mobile: z.string().min(1, "The mobile field is required."),
  payment_term_id: z
    .string({
      required_error: "please choose payment term",
    })
    .min(1, "The payment term id field is required."),

  currency_id: z.preprocess(
    (val) => String(val),
    z.string().min(1, "The currency id field is required.")
  ),
  exchange_rate: z.preprocess(
    (val) => Number(val),
    z.number().min(1, "The exchange rate field is required.")
  ),
  balance: z.preprocess(
    (val) => Number(val),
    z.number().min(1, "The balance field is required.")
  ),
  nationality_id: z.preprocess(
    (val) => String(val),
    z.string().min(1, "The nationality field is required.")
  ),
  portal_language: z.enum(["en", "ar"]).default("en").optional().nullable(),
  first_name_ar: z.string().optional().nullable(),
  last_name_ar: z.string().optional().nullable(),
  // contact_details: z.object({}).optional(),
  contact_details: contactDetailsSchema.optional(),
  contact_persons: z.array(contactPersonSchema).optional().nullable(),
});

export type CustomerType = z.infer<typeof customerSchema>;
