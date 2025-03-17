import type { PermissionDTO } from "./user";

export interface ILoginRequest {
  email: string;
  password: string;
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
