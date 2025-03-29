import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { QueryKeys } from "../../utils/queryKeys";
import { _PaymentTermsApi } from "@/services/settings/paymentTerms.service";

// FETCH PAYMENT TERMS
export const useFetchPaymentTerms = () => {
  return useQuery({
    queryKey: [QueryKeys.PAYMENT_TERMS],
    queryFn: _PaymentTermsApi.getPaymentTerms,
  });
};

// FETCH PAYMENT TERM
export const useFetchPaymentTerm = (id: number, options = {}) => {
  return useQuery({
    queryKey: [QueryKeys.PAYMENT_TERM, id],
    queryFn: () => _PaymentTermsApi.getPaymentTerm(id),
    enabled: !!id,
    ...options,
  });
};

// ADD PAYMENT TERM
export const useAddPaymentTerm = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: _PaymentTermsApi.addPaymentTerm,
    onSuccess: () => {
      navigate("/payment-terms");
    },
  });
};

// UPDATE PAYMENT TERM
export const useUpdatePaymentTerm = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: ({ id, data }: { id: number | undefined; data: any }) =>
      _PaymentTermsApi.updatePaymentTerm(id, data),
    onSuccess: () => {
      navigate("/payment-terms");
    },
  });
};

// DELETE PAYMENT TERM
export const useDeletePaymentTerm = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: _PaymentTermsApi.deletePaymentTerm,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.PAYMENT_TERMS],
      });
    },
  });
};
