import { AxiosResponse } from "axios";
import { _axios } from "../../interceptor/http-config";
import type { BrandForm, IBrand } from "../../types/products/brand";
import {
  UnitForm,
  type IUnit,
  type UnitUpdateForm,
} from "@/types/products/unit";
import type { CategoryUpdateForm } from "@/types/products/categories";

export const _UnitsApi = {
  // GET UNITS
  getUnits: async () => {
    const response = await _axios.get<AxiosResponse<{ units: IUnit[] }>>(
      "/products/units"
    );
    return response?.data?.data;
  },
  // GET UNIT
  getUnit: async (id: number) => {
    const response = await _axios.get<AxiosResponse<IUnit>>(
      `/products/units/${id}`
    );
    return response.data.data;
  },
  // ADD UNIT
  addUnit: async (data: UnitForm) => {
    const response = await _axios.post("/products/units", data);
    return response.data;
  },
  // UPDATE CATEGORY
  updateUnit: async (id: number | undefined, data: UnitUpdateForm) => {
    const response = await _axios.put(`/products/units/${id}`, data);
    return response.data;
  },
  // DELETE UNIT
  deleteUnit: async (id: string) => {
    const response = await _axios.delete(`/products/units/${id}`);
    return response.data;
  },
};
