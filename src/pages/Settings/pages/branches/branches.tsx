import { DataTable } from "@/components/ui/table-data/table-data";
import { useFetchCategories } from "@/hooks/prouducts/useCategories";
import { Home } from "lucide-react";

import { branchColumns } from "@/columns/settings/branches";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import PageMeta from "@/components/common/PageMeta";
import { usePermissions } from "@/hooks/usePermissions";
import { useTranslation } from "react-i18next";

export default function Branches() {
  const { data } = useFetchCategories();
  const categories: any = data || [];
  const { t } = useTranslation("items");

  const { hasPermission } = usePermissions();

  return (
    <>
      <PageMeta
        title="Categories Management | Dashboard"
        description="Manage your product categories in the system."
      />
      <div className="space-y-4 px-1 py-6">
        <PageBreadcrumb
          baseTitle={t("settings")}
          pageTitle={t("branches")}
          icon={<Home className="w-5 h-5" />}
        />
        <div className="space-y-4 pt-10">
          <DataTable
            columns={branchColumns()}
            data={categories}
            createPath="/categories/create"
            hasDetails={true}
            detailsLink="/categories"
            permissions={{
              create: hasPermission("create", "categories"),
              update: hasPermission("update", "categories"),
              delete: hasPermission("delete", "categories"),
            }}
          />
        </div>
      </div>
    </>
  );
}
