import { AxiosResponse } from "axios";
import { _axios } from "../../interceptor/http-config";
import type { BrandForm, IBrand } from "../../types/products/brand";
import type { ISubUnit } from "@/types/products/unit";

export const _SUB_UnitsApi = {
  // GET SUBUNITS
  getSubUnits: async () => {
    const response = await _axios.get<AxiosResponse<ISubUnit[]>>(
      "/products/sub-units"
    );
    return response?.data?.data;
  },
  // GET SUBUNIT
  getSubUnit: async (id: number) => {
    const response = await _axios.get<AxiosResponse<{ category: IBrand }>>(
      `/products/sub-units/${id}`
    );
    return response.data.data;
  },
  // ADD SUBUNIT
  addSubUnit: async (data: BrandForm) => {
    const response = await _axios.post("/products/sub-units", data);
    return response.data;
  },
  // UPDATE SUBCATEGORY
  updateSubUnit: async (id: string, data: BrandForm) => {
    const response = await _axios.put(`/products/sub-units/${id}`, data);
    return response.data;
  },
  // DELETE SUBUNIT
  deleteSubUnit: async (id: string) => {
    const response = await _axios.delete(`/products/sub-units/${id}`);
    return response.data;
  },
};
