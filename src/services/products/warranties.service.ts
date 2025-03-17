import { AxiosResponse } from "axios";
import { _axios } from "../../interceptor/http-config";
import type { BrandForm, IBrand } from "../../types/products/brand";
import { UnitForm } from "@/types/products/unit";
import { IWarranty, WarrantyForm } from "@/types/products/warranty";

export const _WarrantiesApi = {
  // GET WARRANTIES
  getWarranties: async () => {
    const response = await _axios.get<AxiosResponse<{ warranties: IBrand[] }>>(
      "/products/warranties"
    );
    return response?.data?.data;
  },
  // GET WARRANTY
  getWarranty: async (id: number) => {
    const response = await _axios.get<AxiosResponse<{ warranty: IWarranty }>>(
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
  updateWarranty: async (id: string, data: BrandForm) => {
    const response = await _axios.put(`/products/warranties/${id}`, data);
    return response.data;
  },
  // DELETE WARRANTY
  deleteWarranty: async (id: string) => {
    const response = await _axios.delete(`/products/warranties/${id}`);
    return response.data;
  },
};
