import { AxiosResponse } from "axios";
import { _axios } from "../../interceptor/http-config";
import type {
  AccountForm,
  AccountTypeGroup,
  AccountUpdateForm,
  IAccount,
} from "@/types/settings/accounts";

export const _AccountsApi = {
  // GET ACCOUNTS
  getAccounts: async () => {
    const response = await _axios.get<AxiosResponse<IAccount[]>>(
      "/settings/accounts"
    );
    return response?.data?.data;
  },

  // GET ACCOUNT TYPES
  getAccountTypes: async () => {
    const response = await _axios.get<{ data: AccountTypeGroup }>(
      "/settings/account-types"
    );
    return response.data.data;
  },

  // GET ACCOUNT BY ID
  getAccount: async (id: number) => {
    const response = await _axios.get<AxiosResponse<IAccount>>(
      `/settings/accounts/${id}`
    );
    return response.data.data;
  },

  // ADD ACCOUNT
  addAccount: async (data: AccountForm) => {
    const response = await _axios.post("/settings/accounts", data);
    return response.data;
  },

  // UPDATE ACCOUNT
  updateAccount: async (id: number | undefined, data: AccountUpdateForm) => {
    const response = await _axios.put(`/settings/accounts/${id}`, data);
    return response.data;
  },

  // DELETE ACCOUNT
  deleteAccount: async (id: string) => {
    const response = await _axios.delete(`/settings/accounts/${id}`);
    return response.data;
  },
};
