import type { IPaymentTerm } from "@/types/settings/payment_term";
import { AxiosResponse } from "axios";
import { _axios } from "../../interceptor/http-config";

export const _PaymentTermsApi = {
  // GET PAYMENT TERMS
  getPaymentTerms: async () => {
    const response = await _axios.get<AxiosResponse<IPaymentTerm[]>>(
      "/settings/payment-terms"
    );
    return response?.data?.data;
  },

  // GET PAYMENT TERM
  getPaymentTerm: async (id: number) => {
    const response = await _axios.get<AxiosResponse<IPaymentTerm>>(
      `/settings/payment-terms/${id}`
    );
    return response.data.data;
  },

  // ADD PAYMENT TERM
  addPaymentTerm: async (data: any) => {
    const response = await _axios.post("/settings/payment-terms", data);
    return response.data;
  },

  // UPDATE PAYMENT TERM
  updatePaymentTerm: async (id: number | undefined, data: any) => {
    const response = await _axios.post(`/settings/payment-terms/${id}`, data);
    return response.data;
  },

  // DELETE PAYMENT TERM
  deletePaymentTerm: async (id: number) => {
    const response = await _axios.delete(`/settings/payment-terms/${id}`);
    return response.data;
  },
};
