import { useAuthStore } from "@/store/useAuthStore";

export function usePermissions() {
  const { permissions } = useAuthStore();

  const hasPermission = (
    action: "create" | "update" | "delete" | "view",
    entity: string
  ) => {
    if (!permissions) return false;

    if (Array.isArray(permissions)) {
      return permissions.includes(`${entity}.${action}`);
    }

    return permissions.some((perm: any) => perm[`${entity}.${action}`]);
  };

  return { hasPermission };
}
