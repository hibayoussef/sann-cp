import { AxiosResponse } from "axios";
import { _axios } from "../../interceptor/http-config";
import { ITax, TaxForm, TaxUpdateForm } from "@/types/products/tax";

export const _TaxesApi = {
  // GET TAXES
  getTaxes: async () => {
    const response = await _axios.get<AxiosResponse<ITax[]>>(
      "/products/taxes"
    );
    return response?.data?.data;
  },
  // GET TAXES
  getTax: async (id: number) => {
    const response = await _axios.get<AxiosResponse<ITax>>(
      `/products/taxes/${id}`
    );
    return response.data.data;
  },
  // ADD Tax
  addTax: async (data: TaxForm) => {
    const response = await _axios.post("/products/taxes", data);
    return response.data;
  },
  // UPDATE TAX
  updateTax: async (id: string, data: TaxUpdateForm) => {
    const response = await _axios.put(`/products/taxes/${id}`, data);
    return response.data;
  },
  // DELETE TAX
  deleteTax: async (id: string) => {
    const response = await _axios.delete(`/products/taxes/${id}`);
    return response.data;
  },
};
