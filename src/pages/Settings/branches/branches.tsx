import { DataTable } from "@/components/ui/table-data/table-data";
import { GitBranch } from "lucide-react";
import { branchColumns } from "@/columns/settings/branches";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import PageMeta from "@/components/common/PageMeta";
import { useFetchBranches } from "@/hooks/settings/useBranches";
import { usePermissions } from "@/hooks/usePermissions";
import { useTranslation } from "react-i18next";

export default function Branches() {
  const { data } = useFetchBranches();
  const branches: any = data || [];
  const { t } = useTranslation("items");

  const { hasPermission } = usePermissions();

  return (
    <>
      <PageMeta
        title="Branches Management | Dashboard"
        description="Manage your product branches in the system."
      />
      <div className="space-y-4 px-1 py-1 ">
        <PageBreadcrumb
          baseTitle={t("settings")}
          pageTitle={t("branches")}
          icon={<GitBranch className="w-5 h-5 "  />}
        />
        <div className="space-y-4 pt-1">
          <DataTable
           tableName="Branches"
            columns={branchColumns({
              update: hasPermission("update", "branches"),
              delete: hasPermission("delete", "branches"),
            })}
            data={branches}
            createPath="/settings/branches/create"
            // hasDetails={true}
            permissions={{
              create: hasPermission("create", "branches"),
              update: hasPermission("update", "branches"),
              delete: hasPermission("delete", "branches"),
            }}
          />
        </div>
      </div>
    </>
  );
}
