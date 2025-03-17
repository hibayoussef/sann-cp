import { AxiosResponse } from "axios";
import { _axios } from "../../interceptor/http-config";
import type {
  CategoryForm,
  CategoryUpdateForm,
  ICategory,
} from "../../types/products/categories";

export const _CategoriesApi = {
  // GET CATEGORIES
  getCategories: async () => {
    const response = await _axios.get<
      AxiosResponse<{ categories: ICategory[] }>
    >("/products/categories");
    return response?.data?.data;
  },

  // GET CATEGORY
  getCategory: async (id: number) => {
    const response = await _axios.get<AxiosResponse<CategoryForm>>(
      `/products/categories/${id}`
    );
    return response.data.data;
  },

  // ADD CATEGORY
  addCategory: async (data: CategoryForm) => {
    const response = await _axios.post("/products/categories", data);
    return response.data;
  },
  // UPDATE CATEGORY
  updateCategory: async (id: number | undefined, data: CategoryUpdateForm) => {
    const response = await _axios.put(`/products/categories/${id}`, data);
    return response.data;
  },
  // DELETE CATEGORY
  deleteCategory: async (id: string) => {
    const response = await _axios.delete(`/products/categories/${id}`);
    return response.data;
  },
};
