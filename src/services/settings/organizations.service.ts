import { AxiosResponse } from "axios";
import { _axios } from "../../interceptor/http-config";

export const _OrganizationsApi = {
  // GET ORGANIZATIONS
  getOrganizations: async () => {
    const response = await _axios.get<AxiosResponse<any>>(
      "/settings/organizations"
    );
    return response?.data?.data;
  },

  // UPDATE ORGANIZATION
  updateOrganization: async (
    id: number | undefined,
    data:  any
  ) => {
    const response = await _axios.post(`/settings/organizations/${id}`, data);
    return response.data;
  },

  // // GET ORGANIZATION
  // getOrganization: async (id: number) => {
  //   const response = await _axios.get<
  //     AxiosResponse<{ data: OrganizationData }>
  //   >(`/settings/organizations/${id}`);
  //   return response.data.data;
  // },

  // // ADD ORGANIZATION
  // addOrganization: async (data: OrganizationData) => {
  //   const response = await _axios.post("/settings/organizations", data);
  //   return response.data;
  // },

  // // DELETE ORGANIZATION
  // deleteOrganization: async (id: number) => {
  //   const response = await _axios.delete(`/settings/organizations/${id}`);
  //   return response.data;
  // },
};
