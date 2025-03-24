import { AxiosResponse } from "axios";
import { _axios } from "../../interceptor/http-config";

import { ContactType } from "@/types/enums/contactType";
import type { IContact } from "@/types/sales/contact";

export const _ContactsApi = {
  // GET ALL CONTACTS
  getContacts: async (type: ContactType) => {
    const response = await _axios.get<AxiosResponse<{ contacts: IContact[] }>>(
      `/settings/contacts?type=${type}`
    );
    return response?.data?.data;
  },

  // GET CONTACT BY ID
  getContact: async (id: number) => {
    const response = await _axios.get<AxiosResponse<{ contact: IContact }>>(
      `/settings/contacts/${id}`
    );
    return response.data.data.contact;
  },

  // ADD CONTACT
  addContact: async (data: IContact) => {
    const response = await _axios.post<AxiosResponse<{ contact: IContact }>>(
      "/settings/contacts",
      data
    );
    return response.data.data.contact;
  },

  // UPDATE CONTACT
  updateContact: async (id: number | undefined, data: Partial<IContact>) => {
    const response = await _axios.put<AxiosResponse<{ contact: IContact }>>(
      `/settings/contacts/${id}`,
      data
    );
    return response.data.data.contact;
  },

  // DELETE CONTACT
  deleteContact: async (id: string) => {
    const response = await _axios.delete<AxiosResponse<{ success: boolean }>>(
      `/settings/contacts/${id}`
    );
    return response.data.data.success;
  },
};
