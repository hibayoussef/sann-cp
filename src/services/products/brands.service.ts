import { AxiosResponse } from "axios";
import { _axios } from "../../interceptor/http-config";
import type {
  BrandForm,
  BrandUpdateForm,
  IBrand,
} from "../../types/products/brand";

export const _BrandsApi = {
  // GET BRANDS
  getBrands: async () => {
    const response = await _axios.get<AxiosResponse<{ brands: IBrand[] }>>(
      "/products/brands"
    );
    return response?.data?.data;
  },
  // GET BRAND
  getBrand: async (id: number) => {
    const response = await _axios.get<AxiosResponse<IBrand>>(
      `/products/brands/${id}`
    );
    return response.data.data;
  },
  // ADD BRAND
  addBrand: async (data: BrandForm) => {
    const response = await _axios.post("/products/brands", data);
    return response.data;
  },
  // UPDATE BRAND
  updateBrand: async (id: number | undefined, data: BrandUpdateForm) => {
    const response = await _axios.put(`/products/brands/${id}`, data);
    return response.data;
  },
  // DELETE BRAND
  deleteBrand: async (id: string) => {
    const response = await _axios.delete(`/products/brands/${id}`);
    return response.data;
  },
};
