import type { PermissionDTO } from "./user";

export interface ILoginRequest {
  email: string;
  password: string;
  permissions?: PermissionDTO[];
}

export interface ILoginDTO {
  id?: string;
  firstName?: string;
  lastName?: string;
  profileImageURL?: string;
  email?: string;
  roleNames?: string[];
  permissions?: PermissionDTO[];
}
