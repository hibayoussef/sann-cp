import type { ProductUpdateForm } from "@/types/products/product";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { _ProductsApi } from "../../services/products/products.service";
import { QueryKeys } from "../../utils/queryKeys";

// FETCH PRODUCTS
export const useFetchProducts = () => {
  return useQuery({
    queryKey: [QueryKeys.PRODUCTS],
    queryFn: _ProductsApi.getProducts,
  });
};

// FETCH PRODUCT
export const useFetchProduct = (id: number, options = {}) => {
  return useQuery({
    queryKey: [QueryKeys.PRODUCT, id],
    queryFn: () => _ProductsApi.getProduct(id),
    enabled: !!id,
    ...options,
  });
};

// ADD PRODUCT
export const useAddProduct = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: _ProductsApi.addProduct,
    onSuccess: () => {
      navigate("/products");
    },
  });
};

// UPDATE PRODUCT STATUS
export const useUpdateProductStatus = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, status }: { id: number; status: number }) =>
      _ProductsApi.updateProductStatus(id, status),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.PRODUCT, variables.id],
      });
      queryClient.invalidateQueries({ queryKey: [QueryKeys.PRODUCTS] });
    },
  });
};

// UPDATE PRODUCT
export const useUpdateProduct = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: ProductUpdateForm }) =>
      _ProductsApi.updateProduct(id, data),
    onSuccess: () => {
      navigate("/products");
    },
  });
};

// DELETE PRODUCT
export const useDeleteProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: _ProductsApi.deleteProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.PRODUCTS],
      });
    },
  });
};
