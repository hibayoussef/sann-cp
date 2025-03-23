import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { QueryKeys } from "../../utils/queryKeys";
import { _TaxesApi } from "@/services/products/taxes.service";

// FETCH UNITS
export const useFetchTaxes = () => {
  return useQuery({
    queryKey: [QueryKeys.TAXES],
    queryFn: _TaxesApi.getTaxes,
  });
};

// FETCH UNIT
export const useFetchTax = (id: number, options = {}) => {
  return useQuery({
    queryKey: [QueryKeys.TAX, id],
    queryFn: () => _TaxesApi.getTax(id),
    enabled: !!id,
    ...options,
  });
};

// ADD UNIT
export const useAddTax = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: _TaxesApi.addTax,
    onSuccess: () => {
      navigate("/taxes");
    },
  });
};

// UPDATE UNIT
export const useUpdateTax = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) =>
      _TaxesApi.updateTax(id, data),
    onSuccess: () => {
      navigate("/taxes");
    },
  });
};

// DELETE UNIT
export const useDeleteSubCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: _TaxesApi.deleteTax,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.TAXES],
      });
    },
  });
};
