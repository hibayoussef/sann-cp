import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { _UnitsApi } from "../../services/products/units.service";
import { QueryKeys } from "../../utils/queryKeys";
import { _WarrantiesApi } from "@/services/products/warranties.service";

// FETCH UNITS
export const useFetchWarranties = () => {
  return useQuery({
    queryKey: [QueryKeys.WARRANTIES],
    queryFn: _WarrantiesApi.getWarranties,
  });
};

// FETCH UNIT
export const useFetchWarranty = (id: number) => {
  return useQuery({
    queryKey: [QueryKeys.WARRANTY, id],
    queryFn: () => _WarrantiesApi.getWarranty(id),
    enabled: !!id,
  });
};

// ADD UNIT
export const useAddWarranty = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: _WarrantiesApi.addWarranty,
    onSuccess: () => {
      navigate("/warranties");
    },
  });
};

// UPDATE UNIT
export const useUpdateWarranty = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) =>
      _WarrantiesApi.updateWarranty(id, data),
    onSuccess: () => {
      navigate("/warranties");
    },
  });
};

// DELETE UNIT
export const useDeleteSubCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: _WarrantiesApi.deleteWarranty,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.WARRANTIES],
      });
    },
  });
};
