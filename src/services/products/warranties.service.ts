import { AxiosResponse } from "axios";
import { _axios } from "../../interceptor/http-config";
import {
  IWarranty,
  WarrantyForm,
  WarrantyUpdateForm,
} from "@/types/products/warranty";

export const _WarrantiesApi = {
  // GET WARRANTIES
  getWarranties: async () => {
    const response = await _axios.get<
      AxiosResponse<IWarranty[]>
    >("/products/warranties");
    return response?.data?.data;
  },
  // GET WARRANTY
  getWarranty: async (id: number) => {
    const response = await _axios.get<AxiosResponse<IWarranty>>(
      `/products/warranties/${id}`
    );
    return response.data.data;
  },
  // ADD WARRANTY
  addWarranty: async (data: WarrantyForm) => {
    const response = await _axios.post("/products/warranties", data);
    return response.data;
  },
  // UPDATE WARRANTY
  updateWarranty: async (id: string, data: WarrantyUpdateForm) => {
    const response = await _axios.put(`/products/warranties/${id}`, data);
    return response.data;
  },
  // DELETE WARRANTY
  deleteWarranty: async (id: string) => {
    const response = await _axios.delete(`/products/warranties/${id}`);
    return response.data;
  },
};
