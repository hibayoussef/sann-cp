import { z } from "zod";
export const accountSchema = z.object({
  id: z.number().nullable().optional(),

  account_type_id: z.number({
    required_error: "Account type is required",
    invalid_type_error: "Account type must be a valid ID",
  }),

  parent_account_id: z.number().nullable().optional(),

  account_name_en: z
    .string({
      required_error: "Account name (EN) is required",
    })
    .min(2, {
      message: "Account name (EN) must be at least 2 characters",
    }),

  account_name_ar: z
    .string()
    .min(2, {
      message: "Account name (AR) must be at least 2 characters",
    })
    .optional()
    .or(z.literal("")),

  account_code: z
    .string({
      required_error: "Account code is required",
    })
    .min(1, {
      message: "Account code is required",
    }),

  description_en: z
    .string()
    .min(2, {
      message: "Description (EN) must be at least 2 characters",
    })
    .optional()
    .or(z.literal("")),

  description_ar: z
    .string()
    .min(2, {
      message: "Description (AR) must be at least 2 characters",
    })
    .optional()
    .or(z.literal("")),

  account_number: z.string().nullable().optional(),

  currency_id: z.number().nullable().optional(),

  balance: z
    .number({
      required_error: "Balance is required",
    })
    .min(0, {
      message: "Balance must be provided",
    }),

  branches: z.number().array().optional(),
});

export type AccountType = z.infer<typeof accountSchema>;
