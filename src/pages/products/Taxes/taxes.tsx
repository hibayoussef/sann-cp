import { DataTable } from "@/components/ui/table-data/table-data";
import PageBreadcrumb from "../../../components/common/PageBreadCrumb";
import PageMeta from "../../../components/common/PageMeta";

import { useTranslation } from "react-i18next";

import { taxColumns } from "@/columns/products/tax";
import { useFetchTaxes } from "@/hooks/prouducts/useTaxes";
import { usePermissions } from "@/hooks/usePermissions";
import { ReceiptText } from "lucide-react";

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

      <div className="space-y-4 px-1 py-1">
        <PageBreadcrumb
          baseTitle={t("dashboard")}
          pageTitle={t("taxes")}
          icon={<ReceiptText className="w-5 h-5" />}
        />

        <div className="space-y-4 pt-1">
          <DataTable
            tableName="Taxes"
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
        </div>
      </div>
    </>
  );
}
