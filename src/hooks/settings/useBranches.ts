import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { _BranchesApi } from "../../services/settings/branches.service";
import { QueryKeys } from "../../utils/queryKeys";

// FETCH BRANCHES
export const useFetchBranches = () => {
  return useQuery({
    queryKey: [QueryKeys.BRANCHES],
    queryFn: _BranchesApi.getBranches,
  });
};

// FETCH BRANCH
export const useFetchBranch = (id: number, options = {}) => {
  return useQuery({
    queryKey: [QueryKeys.BRANCHE, id],
    queryFn: () => _BranchesApi.getBranch(id),
    enabled: !!id,
    ...options,
  });
};

// ADD BRANCH
export const useAddBranch = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: _BranchesApi.addBranch,
    onSuccess: () => {
      navigate("/branches");
    },
  });
};

// UPDATE BRANCH
export const useUpdateBranch = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: ({ id, data }: { id: number | undefined; data: any }) =>
      _BranchesApi.updateBranch(id, data),
    onSuccess: () => {
      navigate("/branches");
    },
  });
};

// DELETE BRANCH
export const useDeleteBranch = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: _BranchesApi.deleteBranch,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.BRANCHES],
      });
    },
  });
};
