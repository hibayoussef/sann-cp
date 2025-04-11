import { accountColumns } from "@/columns/settings/accounts";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import PageMeta from "@/components/common/PageMeta";
import { DataTable } from "@/components/ui/table-data/table-data";
import { useFetchAccounts } from "@/hooks/settings/useAccounts";
import { usePermissions } from "@/hooks/usePermissions";
import { LayoutGrid } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function Accounts() {
  const { data } = useFetchAccounts();
  const accounts: any = data || [];
  const { t } = useTranslation("items");

  const { hasPermission } = usePermissions();

  return (
    <>
      <PageMeta
        title="Accounts of Charts Management | Dashboard"
        description="Manage your accounts of charts in the system."
      />
      <div className="space-y-4 px-1 py-1 ">
        <PageBreadcrumb
          baseTitle={t("settings")}
          pageTitle="Chart of account"
          icon={<LayoutGrid className="w-5 h-5 " />}
        />
        <div className="space-y-4 pt-1">
          <DataTable
            columns={accountColumns({
              update: hasPermission("update", "accounts"),
              delete: hasPermission("delete", "accounts"),
            })}
            data={accounts}
            createPath="/accounts/create"
            hasDetails={true}
            detailsLink="/accounts"
            permissions={{
              create: hasPermission("create", "accounts"),
              update: hasPermission("update", "accounts"),
              delete: hasPermission("delete", "accounts"),
            }}
          />
        </div>
      </div>
    </>
  );
}
