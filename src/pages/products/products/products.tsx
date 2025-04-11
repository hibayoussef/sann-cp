import { productColumns } from "@/columns/products/product";
import { DataTable } from "@/components/ui/table-data/table-data";
import { usePermissions } from "@/hooks/usePermissions";
import { Package } from "lucide-react";
import { useTranslation } from "react-i18next";
import PageBreadcrumb from "../../../components/common/PageBreadCrumb";
import PageMeta from "../../../components/common/PageMeta";import { useFetchProducts } from "@/hooks/prouducts/useProducts";
;

export default function Products() {
  const { data } = useFetchProducts();
  const products: any = data || [];

  const { t } = useTranslation("items");
  const { hasPermission } = usePermissions();

  return (
    <>
      <PageMeta
        title="Products Management | Dashboard"
        description="Manage your products in the system."
      />
      <div className="space-y-4 px-1 py-1">
        <PageBreadcrumb
          baseTitle={t("dashboard")}
          pageTitle={t("products")}
          icon={<Package className="w-5 h-5 " />}
        />

        <div className="space-y-4 pt-1">
          <DataTable
            tableName="Products"
            columns={productColumns({
              update: hasPermission("update", "products"),
              delete: hasPermission("delete", "products"),
            })}
            data={products}
            createPath="/products/create"
            permissions={{
              create: hasPermission("create", "products"),
              update: hasPermission("update", "products"),
              delete: hasPermission("delete", "products"),
            }}
          />
        </div>
      </div>
    </>
  );
}
