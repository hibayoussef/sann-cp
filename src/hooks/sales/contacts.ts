import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { QueryKeys } from "../../utils/queryKeys";
import type { IContact } from "@/types/sales/contact";
import { _ContactsApi } from "@/services/sales/contacts.service";
import type { ContactType } from "@/types/enums/contactType";

// FETCH CONTACTS
export const useFetchContacts = (type: ContactType) => {
  return useQuery({
    queryKey: [QueryKeys.CONTACTS, type],
    queryFn: () => _ContactsApi.getContacts(type),
  });
};
// FETCH CONTACT BY ID
export const useFetchContact = (id: number, options = {}) => {
  return useQuery({
    queryKey: [QueryKeys.CONTACT, id],
    queryFn: () => _ContactsApi.getContact(id),
    enabled: !!id,
    ...options,
  });
};

// ADD CONTACT
export const useAddContact = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: _ContactsApi.addContact,
    onSuccess: () => {
      navigate("/customers");
    },
  });
};

// UPDATE CONTACT
export const useUpdateContact = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: number | undefined;
      data: Partial<IContact>;
    }) => _ContactsApi.updateContact(id, data),
    onSuccess: () => {
      navigate("/customers");
    },
  });
};

// DELETE CONTACT
export const useDeleteContact = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: _ContactsApi.deleteContact,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.CONTACTS],
      });
    },
  });
};

// ENABLE PORTAL ACCESS
export const useEnablePortalAccess = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: { contactId: number; portalAccess: number }) =>
      _ContactsApi.enablePortalAccess(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.CONTACTS],
      });
    },
  });
};
