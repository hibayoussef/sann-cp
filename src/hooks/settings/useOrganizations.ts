import { _OrganizationsApi } from "@/services/settings/organizations.service";
import { useMutation, useQuery } from "@tanstack/react-query";
import { QueryKeys } from "../../utils/queryKeys";

// FETCH ORGANIZATIONS
export const useFetchOrganizations = () => {
  return useQuery({
    queryKey: [QueryKeys.ORGANIZATIONS],
    queryFn: _OrganizationsApi.getOrganizations, 
  });
};


// UPDATE ORGANIZATION
export const useUpdateOrganization = () => {
  // const navigate = useNavigate();
  return useMutation({
    mutationFn: ({ id, data }: { id: number | undefined; data: any }) =>
      _OrganizationsApi.updateOrganization(id, data), 
    // onSuccess: () => {
    //   navigate("/organizations"); 
    // },
  });
};


// // FETCH ORGANIZATION
// export const useFetchOrganization = (id: number, options = {}) => {
//     return useQuery({
//         queryKey: [QueryKeys.ORGANIZATION, id],
//         queryFn: () => _OrganizationsApi.getOrganization(id),
//         enabled: !!id,
//         ...options,
//     });
// };
// // ADD ORGANIZATION
// export const useAddOrganization = () => {
//   const navigate = useNavigate();
//   return useMutation({
//     mutationFn: _OrganizationsApi.addOrganization, 
//     onSuccess: () => {
//       navigate("/organizations"); 
//     },
//   });
// };
// // DELETE ORGANIZATION
// export const useDeleteOrganization = () => {
//   const queryClient = useQueryClient();
//   return useMutation({
//     mutationFn: _OrganizationsApi.deleteOrganization, 
//     onSuccess: () => {
//       queryClient.invalidateQueries({
//         queryKey: [QueryKeys.ORGANIZATIONS], 
//       });
//     },
//   });
// };
