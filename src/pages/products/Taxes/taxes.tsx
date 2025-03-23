import { DataTable } from "@/components/ui/table-data/table-data";
import ComponentCard from "../../../components/common/ComponentCard";
import PageBreadcrumb from "../../../components/common/PageBreadCrumb";
import PageMeta from "../../../components/common/PageMeta";

import { useTranslation } from "react-i18next";

import { usePermissions } from "@/hooks/usePermissions";
import { useFetchTaxes } from "@/hooks/prouducts/useTaxes";
import { taxColumns } from "@/columns/products/tax";
import { Home } from "lucide-react";

export default function Taxes() {
  const { data } = useFetchTaxes();
  const taxes: any = data || [];

  const { t } = useTranslation("items");
  const { hasPermission } = usePermissions();

  return (
    <>
      <PageMeta
        title="Taxes Management | Dashboard"
        description="Manage your product taxes in the system."
      />
      

      <div className="space-y-4">
         <PageBreadcrumb
          baseTitle={t("dashboard")}
          pageTitle={t("taxes")}
          icon={<Home className="w-5 h-5" />}
        />
        <ComponentCard title={t("taxes")}>
          <DataTable
            columns={taxColumns({
              update: hasPermission("update", "taxes"),
              delete: hasPermission("delete", "taxes"),
            })}
            data={taxes}
            createPath="/taxes/create"
            permissions={{
              create: hasPermission("create", "taxes"),
              update: hasPermission("update", "taxes"),
              delete: hasPermission("delete", "taxes"),
            }}
          />
        </ComponentCard>
      </div>
    </>
  );
}
