import { _axios } from "../interceptor/http-config";

export interface IUser {
  id: number;
  name: string;
  first_name: string | null;
  last_name: string | null;
  name_ar: string | null;
  first_name_ar: string | null;
  last_name_ar: string | null;
  email: string;
}

export interface IRole {
  role: string[];
}

export interface IPermission {
  permissions: string[];
}

export interface IOrganization {
  id: number;
  organization_name_ar: string | null;
  organization_name_en: string;
}

export interface IMeResponse {
  user: IUser;
  role: string[];
  permissions: string[];
  organization: IOrganization;
}
