import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { _UnitsApi } from "../../services/products/units.service";
import { QueryKeys } from "../../utils/queryKeys";

// FETCH UNITS
export const useFetchUnits = () => {
  return useQuery({
    queryKey: [QueryKeys.UNITS],
    queryFn: _UnitsApi.getUnits,
  });
};

// FETCH UNIT
export const useFetchUnit = (id: number, options = {}) => {
  return useQuery({
    queryKey: [QueryKeys.UNIT, id],
    queryFn: () => _UnitsApi.getUnit(id),
    enabled: !!id,
    ...options,
  });
};

// ADD UNIT
export const useAddUnit = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: _UnitsApi.addUnit,
    onSuccess: () => {
      navigate("/units");
    },
  });
};

// UPDATE UNIT
export const useUpdateUnit = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: ({ id, data }: { id: number | undefined, data: any }) =>
      _UnitsApi.updateUnit(id, data),
    onSuccess: () => {
      navigate("/units");
    },
  });
};

// DELETE UNIT
export const useDeleteSubCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: _UnitsApi.deleteUnit,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.UNITS],
      });
    },
  });
};
