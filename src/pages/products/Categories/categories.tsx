import { categoryColumns } from "@/columns/products/category";
import { DataTable } from "@/components/ui/table-data/table-data";
import { useFetchCategories } from "@/hooks/prouducts/useCategories";
import { usePermissions } from "@/hooks/usePermissions";
import { FolderTree } from "lucide-react";
import { useTranslation } from "react-i18next";
import PageBreadcrumb from "../../../components/common/PageBreadCrumb";
import PageMeta from "../../../components/common/PageMeta";

export default function Categories() {
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
      <div className="space-y-4 px-1 py-1">
        <PageBreadcrumb
          baseTitle={t("dashboard")}
          pageTitle={t("categories")}
          icon={<FolderTree className="w-5 h-5" />}
        />
        <div className="space-y-4 pt-1">
          <DataTable
            tableName="Categories"
            columns={categoryColumns({
              update: hasPermission("update", "categories"),
              delete: hasPermission("delete", "categories"),
            })}
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
