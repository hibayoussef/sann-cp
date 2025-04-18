import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { _SUB_UnitsApi } from "../../services/products/subUnits.service";
import { QueryKeys } from "../../utils/queryKeys";

// FETCH SUB_UNITs
export const useFetchSubUnits = () => {
  return useQuery({
    queryKey: [QueryKeys.SUB_UNITs],
    queryFn: _SUB_UnitsApi.getSubUnits,
  });
};

// FETCH SUB_UNIT
export const useFetchSubUnit = (id: number, options = {}) => {
  return useQuery({
    queryKey: [QueryKeys.SUB_UNIT, id],
    queryFn: () => _SUB_UnitsApi.getSubUnit(id),
    enabled: !!id,
    ...options,
  });
};

export const useFetchSubUnitsById = (
  unit_id: number | null,
  options?: { enabled?: boolean }
) => {
  return useQuery({
    queryKey: [QueryKeys.SUB_CATEGORIES, unit_id],
    queryFn: () => _SUB_UnitsApi.getSubUnitsById(unit_id),
    enabled: options?.enabled ?? !!unit_id,
  });
};

// ADD SUB_UNIT
export const useAddSubUnit = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: _SUB_UnitsApi.addSubUnit,
    onSuccess: () => {
      navigate("/sub-units");
    },
  });
};

// UPDATE SUB_UNIT
export const useUpdateSubUnit = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) =>
      _SUB_UnitsApi.updateSubUnit(id, data),
    onSuccess: () => {
      navigate("/sub-units");
    },
  });
};

// DELETE SUB_UNIT
export const useDeleteSubUnit = () => {
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
