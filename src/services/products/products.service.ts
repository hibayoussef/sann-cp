import { AxiosResponse } from "axios";
import { _axios } from "../../interceptor/http-config";
import type {
  ProductForm,
  ProductUpdateForm,
  IProduct,
} from "../../types/products/product";

export const _ProductsApi = {
  // GET PRODUCTS
  getProducts: async () => {
    const response = await _axios.get<AxiosResponse<IProduct[]>>(
      "/products/products"
    );
    return response?.data?.data;
  },
  // GET PRODUCT
  getProduct: async (id: number) => {
    const response = await _axios.get<AxiosResponse<IProduct>>(
      `/products/products/${id}`
    );
    return response.data.data;
  },
  // ADD PRODUCT
  addProduct: async (data: ProductForm) => {
    const response = await _axios.post("/products/products", data);
    return response.data;
  },
  // UPDATE PRODUCT
  updateProduct: async (id: number | undefined, data: ProductUpdateForm) => {
    const response = await _axios.put(`/products/products/${id}`, data);
    return response.data;
  },
  // DELETE PRODUCT
  deleteProduct: async (id: string) => {
    const response = await _axios.delete(`/products/products/${id}`);
    return response.data;
  },
};
