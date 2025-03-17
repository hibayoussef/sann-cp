import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { _SUB_UnitsApi } from "../../services/products/subUnits.service";
import { QueryKeys } from "../../utils/queryKeys";

// FETCH SUB_UNITs
export const useFetchSubCategories = () => {
  return useQuery({
    queryKey: [QueryKeys.SUB_UNITs],
    queryFn: _SUB_UnitsApi.getSubUnits,
  });
};

// FETCH SUB_UNIT
export const useFetchSubCategory = (id: number) => {
  return useQuery({
    queryKey: [QueryKeys.SUB_UNIT, id],
    queryFn: () => _SUB_UnitsApi.getSubUnit(id),
    enabled: !!id,
  });
};

// ADD SUB_UNIT
export const useAddSubCategory = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: _SUB_UnitsApi.addSubUnit,
    onSuccess: () => {
      navigate("/dashboard/brands");
    },
  });
};

// UPDATE SUB_UNIT
export const useUpdateSubCategory = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) =>
      _SUB_UnitsApi.updateSubUnit(id, data),
    onSuccess: () => {
      navigate("/dashboard/brands");
    },
  });
};

// DELETE SUB_UNIT
export const useDeleteSubCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: _SUB_UnitsApi.deleteSubUnit,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.SUB_UNITs],
      });
    },
  });
};
