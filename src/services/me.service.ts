import { AxiosResponse } from "axios";
import { _axios } from "../interceptor/http-config";
import { IMeResponse } from "../types/me";

export const _MeApi = {
  // GET My Info
  getMe: async () => {
    const response = await _axios.get<AxiosResponse<IMeResponse>>("/auth/me");
    return response?.data?.data;
  },
};
