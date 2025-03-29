export interface IStore {
  id: number;
  store_name_ar?: string | null;
  store_name_en: string;
  email?: string | null;
  mobile?: string | null;
  country_state_id?: number | null;
  website?: string | null;
  logo_file_name?: string | null;
  logo_file_path?: string | null;
  logo_mime_type?: string | null;
}

export interface IBranch {
  id: number;
  branch_name_ar?: string | null;
  branch_name_en: string;
  email?: string | null;
  mobile?: string | null;
  website?: string | null;
  country_state_id?: number | null;

  logo_file_name?: string | null;
  logo_file_path?: string | null;
  logo_mime_type?: string | null;
  stores: IStore[];
}

export interface BrandResponse {
  success: boolean;
  message: string;
  data: IBranch[];
}
