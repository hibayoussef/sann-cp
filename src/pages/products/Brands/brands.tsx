import { DataTable } from "@/components/ui/table-data/table-data";
import ComponentCard from "../../../components/common/ComponentCard";
import PageBreadcrumb from "../../../components/common/PageBreadCrumb";
import PageMeta from "../../../components/common/PageMeta";
import { useFetchBrands } from "../../../hooks/prouducts/useBrands";
import { useTranslation } from "react-i18next";
import { usePermissions } from "@/hooks/usePermissions";
import { brandColumns } from "@/columns/products/brand";

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
      <PageBreadcrumb pageTitle={t("brands")} />

      <div className="space-y-4">
        <ComponentCard title={t("brands")}>
          <DataTable
            columns={brandColumns}
            data={brands}
            createPath="/brands/create"
            permissions={{
              create: hasPermission("create", "brands"),
              update: hasPermission("update", "brands"),
              delete: hasPermission("delete", "brands"),
            }}
          />
        </ComponentCard>
      </div>
    </>
  );
}
