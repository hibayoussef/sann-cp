import { DataTable } from "@/components/ui/table-data/table-data";
import PageBreadcrumb from "../../../components/common/PageBreadCrumb";
import PageMeta from "../../../components/common/PageMeta";

import { warrantyColumns } from "@/columns/products/warranty";
import { useFetchWarranties } from "@/hooks/prouducts/useWarranties";
import { usePermissions } from "@/hooks/usePermissions";
import { ShieldCheck } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function Warranties() {
  const { data } = useFetchWarranties();
  const warranties: any = data || [];

  const { t } = useTranslation("items");
  const { hasPermission } = usePermissions();

  return (
    <>
      <PageMeta
        title="Warranties Management | Dashboard"
        description="Manage your product warranties in the system."
      />

      <div className="space-y-4 px-1 py-1">
        <PageBreadcrumb
          baseTitle={t("dashboard")}
          pageTitle={t("warranties")}
          icon={<ShieldCheck className="w-5 h-5" />}
        />

        <div className="space-y-4 pt-1">
          <DataTable
            tableName="Warranties"
            columns={warrantyColumns({
              update: hasPermission("update", "warranties"),
              delete: hasPermission("delete", "warranties"),
            })}
            data={warranties}
            createPath="/warranties/create"
            permissions={{
              create: hasPermission("create", "warranties"),
              update: hasPermission("update", "warranties"),
              delete: hasPermission("delete", "warranties"),
            }}
            // searchColumns={['warranty_name_en']} 
          />
        </div>
      </div>
    </>
  );
}
