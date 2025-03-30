import { AxiosResponse } from "axios";
import { _axios } from "../../interceptor/http-config";
import type { BrandForm, IBrand } from "../../types/products/brand";
import type { ISubUnit, IUnit } from "@/types/products/unit";

export const _SUB_UnitsApi = {
  // GET SUBUNITS
  getSubUnits: async () => {
    const response = await _axios.get<AxiosResponse<IUnit[]>>(
      "/products/sub-units"
    );
    return response?.data?.data;
  },
  // GET SUBUNIT
  getSubUnit: async (id: number) => {
    const response = await _axios.get<AxiosResponse<IUnit>>(
      `/products/sub-units/${id}`
    );
    return response.data.data;
  },

  getSubUnitsById: async (unit_id: number) => {
    const response = await _axios.get<{ data: any[] }>(
      `/products/sub-units?unit_id=${unit_id}`
    );
    return response?.data;
  },
  // ADD SUBUNIT
  addSubUnit: async (data: IUnit) => {
    const response = await _axios.post("/products/sub-units", data);
    return response.data;
  },
  // UPDATE SUBCATEGORY
  updateSubUnit: async (id: string, data: IUnit) => {
    const response = await _axios.put(`/products/sub-units/${id}`, data);
    return response.data;
  },
  // DELETE SUBUNIT
  deleteSubUnit: async (id: string) => {
    const response = await _axios.delete(`/products/sub-units/${id}`);
    return response.data;
  },
};
