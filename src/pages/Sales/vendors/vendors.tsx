import { customerColumns } from "@/columns/contacts/customer";
import { DataTable } from "@/components/ui/table-data/table-data";
import { useFetchContacts } from "@/hooks/sales/contacts";
import { usePermissions } from "@/hooks/usePermissions";
import { ContactType } from "@/types/enums/contactType";
import { Users } from "lucide-react";
import { useTranslation } from "react-i18next";
import PageBreadcrumb from "../../../components/common/PageBreadCrumb";
import PageMeta from "../../../components/common/PageMeta";

export default function Vendors() {
  const { data } = useFetchContacts(ContactType.VENDOR);
  const contacts: any = data || [];
  const { t } = useTranslation("items");

  const { hasPermission } = usePermissions();

  return (
    <>
      <PageMeta
        title="Vendors Management | Dashboard"
        description="Manage your vendors in the system."
      />
      <div className="space-y-4 px-1 py-1">
        <PageBreadcrumb
          baseTitle={t("dashboard")}
          pageTitle={t("Vendors")}
          icon={<Users className="w-4 h-4" />}
        />
        <div className="space-y-4 pt-1">
          <DataTable
            columns={customerColumns({
              update: hasPermission("update", "vendors"),
              delete: hasPermission("delete", "vendors"),
            })}
            data={contacts}
            createPath="/vendors/create"
            hasDetails={true}
            // detailsLink="/vendors"
            permissions={{
              create: hasPermission("create", "vendors"),
              update: hasPermission("update", "vendors"),
              delete: hasPermission("delete", "vendors"),
            }}
          />
        </div>
      </div>
    </>
  );
}
