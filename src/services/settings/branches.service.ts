import { AxiosResponse } from "axios";
import { _axios } from "../../interceptor/http-config";
import type { IBranch } from "@/types/settings/branches";

export const _BranchesApi = {
  // GET BRANCHES
  getBranches: async () => {
    const response = await _axios.get<AxiosResponse<IBranch[]>>(
      "/settings/branches"
    );
    return response?.data?.data;
  },

  // GET BRANCH
  getBranch: async (id: number) => {
    const response = await _axios.get<AxiosResponse<any>>(
      `/settings/branches/${id}`
    );
    return response.data.data;
  },

  // ADD BRANCH
  addBranch: async (data: any) => {
    const response = await _axios.post("/settings/branches", data);
    return response.data;
  },

  // UPDATE BRANCH
  updateBranch: async (id: number | undefined, data: any) => {
    const response = await _axios.post(`/settings/branches/${id}`, data);
    return response.data;
  },

  // DELETE BRANCH
  deleteBranch: async (id: number) => {
    const response = await _axios.delete(`/settings/branches/${id}`);
    return response.data;
  },
};
