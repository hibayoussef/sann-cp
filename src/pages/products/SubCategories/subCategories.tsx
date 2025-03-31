import { subCategoryColumns } from "@/columns/products/subCategory";
import { DataTable } from "@/components/ui/table-data/table-data";
import { useFetchSubCategories } from "@/hooks/prouducts/useSubCategories";
import ComponentCard from "../../../components/common/ComponentCard";
import PageBreadcrumb from "../../../components/common/PageBreadCrumb";
import PageMeta from "../../../components/common/PageMeta";
import { usePermissions } from "@/hooks/usePermissions";
import { useTranslation } from "react-i18next";
import { FolderTree } from "lucide-react";
export default function SubCategories() {
  const { data } = useFetchSubCategories();
  const subCategories: any = data || [];
  const { hasPermission } = usePermissions();
const { t } = useTranslation("items");
  return (
    <>
      <PageMeta
        title="Sub Categories Management | Dashboard"
        description="Manage your product Sub categories in the system."
      />
        <div className="space-y-4 px-1 py-1">
        <PageBreadcrumb
          baseTitle={t("dashboard")}
           pageTitle="Sub Categories"
          icon={<FolderTree className="w-5 h-5" />}
           />

      <div className="space-y-4">
        
          <DataTable
            columns={subCategoryColumns({
              update: hasPermission("update", "sub_categories"),
              delete: hasPermission("delete", "sub_categories"),
            })}
            data={subCategories}
            createPath="/sub-categories/create"
               permissions={{
              create: hasPermission("create", "sub_categories"),
              update: hasPermission("update", "sub_categories"),
              delete: hasPermission("delete", "sub_categories"),
            }}
          />
            </div>
       
      </div>
    </>
  );
}
