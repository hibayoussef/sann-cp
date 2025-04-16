import { z } from "zod";
export const mapsettingSchema = z.object({
  branch_id: z.number().positive("Branch is required"),
  customer_account_id: z.number().positive("Customer account is required"),
  vendor_account_id: z.number().positive("Vendor account is required"),
  employee_account_id: z.number().positive("Employee account is required"),
  sale_account_id: z.number().positive("Sale account is required"),
  sale_return_account_id: z
    .number()
    .positive("Sale return account is required"),
  purchase_account_id: z.number().positive("Purchase account is required"),
  purchase_return_account_id: z
    .number()
    .positive("Purchase return account is required"),
  jobcard_account_id: z.number().positive("Jobcard account is required"),
});

export type MapSettingType = z.infer<typeof mapsettingSchema>;
