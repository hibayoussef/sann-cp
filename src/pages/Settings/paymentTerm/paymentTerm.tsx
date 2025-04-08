import { paymentTermColumns } from "@/columns/settings/paymentTerm";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import PageMeta from "@/components/common/PageMeta";
import { DataTable } from "@/components/ui/table-data/table-data";
import { useFetchPaymentTerms } from "@/hooks/settings/usePaymentTerm";
import { usePermissions } from "@/hooks/usePermissions";
import { GitBranch } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function PaymentTerm() {
  const { data } = useFetchPaymentTerms();
  const paymentTerms: any = data || [];
  const { t } = useTranslation("items");

  const { hasPermission } = usePermissions();

  return (
    <>
      <PageMeta
        title="Payment Term Management | Dashboard"
        description="Manage your Payment Term in the system."
      />
      <div className="space-y-4 px-1 py-1 ">
        <PageBreadcrumb
          baseTitle={t("settings")}
          pageTitle="Payment Term"
          icon={<GitBranch className="w-5 h-5 "  />}
        />
        <div className="space-y-4 pt-1">
          <DataTable
            columns={paymentTermColumns({
              update: hasPermission("update", "payment_terms"),
              delete: hasPermission("delete", "payment_terms"),
            })}
            data={paymentTerms}
            createPath="/settings/payment_terms/create"
            // hasDetails={true}
            permissions={{
              create: hasPermission("create", "payment_terms"),
              update: hasPermission("update", "payment_terms"),
              delete: hasPermission("delete", "payment_terms"),
            }}
          />
        </div>
      </div>
    </>
  );
}
