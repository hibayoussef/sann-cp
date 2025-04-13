import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { _AccountsApi } from "../../services/settings/accounts.service";
import { QueryKeys } from "../../utils/queryKeys";
import type { AccountTypeGroup } from "@/types/settings/accounts";

// FETCH ACCOUNTS
export const useFetchAccounts = () => {
  return useQuery({
    queryKey: [QueryKeys.ACCOUNTS],
    queryFn: _AccountsApi.getAccounts,
  });
};

// FETCH ACCOUNT TYPES
export const useFetchAccountTypes = () => {
  return useQuery<AccountTypeGroup>({
    queryKey: [QueryKeys.ACCOUNT_TYPES],
    queryFn: _AccountsApi.getAccountTypes,
  });
};

//  FETCH SINGLE ACCOUNT
export const useFetchAccount = (id: number, options = {}) => {
  return useQuery({
    queryKey: [QueryKeys.ACCOUNT, id],
    queryFn: () => _AccountsApi.getAccount(id),
    enabled: !!id,
    ...options,
  });
};

// ADD ACCOUNT
export const useAddAccount = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: _AccountsApi.addAccount,
    onSuccess: () => {
      navigate("/accounts");
    },
  });
};

// UPDATE ACCOUNT
export const useUpdateAccount = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: ({ id, data }: { id: number | undefined; data: any }) =>
      _AccountsApi.updateAccount(id, data),
    onSuccess: () => {
      navigate("/accounts");
    },
  });
};

// DELETE ACCOUNT
export const useDeleteAccount = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: _AccountsApi.deleteAccount,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.ACCOUNTS],
      });
    },
  });
};
