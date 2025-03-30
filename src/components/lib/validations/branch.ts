import { z } from "zod";

export const branchSchema = z.object({
  id: z.number().optional(),
  branch_name_en: z
    .string()
    .min(2, "Branch name (EN) must be at least 2 characters"),
  branch_name_ar: z
    .string()
    .min(2, "Branch name (AR) must be at least 2 characters"),
  email: z.string().email("Invalid email address").optional(),
  mobile: z.string().optional(),
  website: z.string().url("Invalid URL format").optional(),
  country_state_id: z.number().nullable(),
  // .nonnegative("Country/State ID must be a positive number"),
  street1: z.string().min(5, "Street 1 address must be at least 5 characters"),
  street2: z.string().optional(),
  city: z.string().min(2, "City must be at least 2 characters"),
  postal_code: z.string().min(5, "Postal code must be at least 5 characters"),
  registered_for_vat: z.number(),
  tax_registration_number_label: z.string().optional(),
  tax_registration_number: z
    .string()
    .min(5, "Tax registration number must be at least 5 characters"),
  vat_registered_on: z.string().optional(), // Date string in format 'YYYY-MM-DD'
  logo_file_name: z.string().optional(),
  logo_file_path: z.string().optional(),
  logo_mime_type: z.string().optional(),
});

export type BranchType = z.infer<typeof branchSchema>;
