import { brandColumns } from "@/columns/products/brand";
import { DataTable } from "@/components/ui/table-data/table-data";
import { usePermissions } from "@/hooks/usePermissions";
import { Tags } from "lucide-react";
import { useTranslation } from "react-i18next";
import PageBreadcrumb from "../../../components/common/PageBreadCrumb";
import PageMeta from "../../../components/common/PageMeta";
import { useFetchBrands } from "../../../hooks/prouducts/useBrands";

export default function Brands() {
  const { data } = useFetchBrands();
  const brands: any = data || [];

  const { t } = useTranslation("items");
  const { hasPermission } = usePermissions();

  return (
    <>
      <PageMeta
        title="Brands Management | Dashboard"
        description="Manage your product brands in the system."
      />
      <div className="space-y-4 px-1 py-1">
        <PageBreadcrumb
          baseTitle={t("dashboard")}
          pageTitle={t("brands")}
          icon={<Tags className="w-5 h-5 " />}
        />

        <div className="space-y-4 pt-1">
          <DataTable
            tableName="Brands"
            columns={brandColumns({
              update: hasPermission("update", "categories"),
              delete: hasPermission("delete", "categories"),
            })}
            data={brands}
            createPath="/brands/create"
            permissions={{
              create: hasPermission("create", "brands"),
              update: hasPermission("update", "brands"),
              delete: hasPermission("delete", "brands"),
            }}
          />
        </div>
      </div>
    </>
  );
}
