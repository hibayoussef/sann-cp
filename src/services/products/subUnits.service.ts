import { AxiosResponse } from "axios";
import { _axios } from "../../interceptor/http-config";
import type { BrandForm, IBrand } from "../../types/products/brand";

export const _SUB_UnitsApi = {
  // GET SUBUNITS
  getSubUnits: async () => {
    const response = await _axios.get<AxiosResponse<{ categories: IBrand[] }>>(
      "/products/subunits"
    );
    return response?.data?.data;
  },
  // GET SUBUNIT
  getSubUnit: async (id: number) => {
    const response = await _axios.get<AxiosResponse<{ category: IBrand }>>(
      `/products/subunits/${id}`
    );
    return response.data.data;
  },
  // ADD SUBUNIT
  addSubUnit: async (data: BrandForm) => {
    const response = await _axios.post("/products/subunits", data);
    return response.data;
  },
  // UPDATE SUBCATEGORY
  updateSubUnit: async (id: string, data: BrandForm) => {
    const response = await _axios.put(`/products/subunits/${id}`, data);
    return response.data;
  },
  // DELETE SUBUNIT
  deleteSubUnit: async (id: string) => {
    const response = await _axios.delete(`/products/subunits/${id}`);
    return response.data;
  },
};
