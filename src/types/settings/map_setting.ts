export interface IMapSetting {
  id: number;
  branch_id: number;
  branch_name_ar?: string | null;
  branch_name_en: string;
  customer_account_id: number;
  customer_account_name_ar?: string;
  customer_account_name_en: string;
  vendor_account_id: number;
  vendor_account_name_ar?: string | null;
  vendor_account_name_en: string;
  employee_account_id: number;
  employee_account_name_ar?: string | null;
  employee_account_name_en: string;
  sale_account_id: number;
  sale_account_name_ar?: string | null;
  sale_account_name_en: string;
  sale_return_account_id: number;
  sale_return_account_name_ar?: string | null;
  sale_return_account_name_en: string;
  purchase_account_id: number;
  purchase_account_name_ar?: string | null;
  purchase_account_name_en: string;
  purchase_return_account_id: number;
  purchase_return_account_name_ar?: string | null;
  purchase_return_account_name_en: string;
  jobcard_account_id: number;
  jobcard_account_name_ar?: string | null;
  jobcard_account_name_en: string;
}//store -show in table

export interface MapSettingForm {
  organization_id: number | null | undefined;
  branch_id: number | null | undefined;
  customer: number | null | undefined;
  vendor: number | null | undefined;
  employee: number | null | undefined;
  sale: number | null | undefined;
  sale_return: number | null | undefined;
  purchase: number | null | undefined;
  purchase_return: number | null | undefined;
  jobcard: number | null | undefined;
}//body in submit
export interface MapSettingUpdateForm {
  id?: number | null;
  data?: MapSettingForm;
}//update