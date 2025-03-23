import { DataTable } from "@/components/ui/table-data/table-data";
import ComponentCard from "../../../components/common/ComponentCard";
import PageBreadcrumb from "../../../components/common/PageBreadCrumb";
import PageMeta from "../../../components/common/PageMeta";

import { useTranslation } from "react-i18next";
import { Home } from "lucide-react";
import { useFetchWarranties } from "@/hooks/prouducts/useWarranties";
import { warrantyColumns } from "@/columns/products/warranty";
import { usePermissions } from "@/hooks/usePermissions";

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
      

      <div className="space-y-4">
        <PageBreadcrumb
          baseTitle={t("dashboard")}
          pageTitle={t("warranties")}
          icon={<Home className="w-5 h-5" />}
        />
        <ComponentCard title={t("warranties")}>
          <DataTable
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
          />
        </ComponentCard>
      </div>
    </>
  );
}
