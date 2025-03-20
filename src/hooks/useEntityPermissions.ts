import { useAuthStore } from "@/store/useAuthStore";

export function useEntityPermissions(entity: string) {
  const { permissions } = useAuthStore();

  const userPermissions = permissions ?? [];

  const checkPermission = (action: "create" | "update" | "delete" | "view") =>
    userPermissions.includes(`${entity}.${action}`);

  return {
    canView: checkPermission("view"),
    canCreate: checkPermission("create"),
    canUpdate: checkPermission("update"),
    canDelete: checkPermission("delete"),
  };
}
