import { customerColumns } from "@/columns/contacts/customer";
import { DataTable } from "@/components/ui/table-data/table-data";
import { useFetchContacts } from "@/hooks/sales/contacts";
import { usePermissions } from "@/hooks/usePermissions";
import { ContactType } from "@/types/enums/contactType";
import { Users } from "lucide-react";
import { useTranslation } from "react-i18next";
import PageBreadcrumb from "../../../components/common/PageBreadCrumb";
import PageMeta from "../../../components/common/PageMeta";

export default function Customers() {
  const { data } = useFetchContacts(ContactType.CUSTOMER);
  const contacts: any = data || [];
  const { t } = useTranslation("items");

  const { hasPermission } = usePermissions();

  return (
    <>
      <PageMeta
        title="Customers Management | Dashboard"
        description="Manage your product categories in the system."
      />
      <div className="space-y-4 px-1 py-1">
        <PageBreadcrumb
          baseTitle={t("dashboard")}
          pageTitle={t("Customers")}
          icon={<Users className="w-4 h-4" />}
        />
        <div className="space-y-4 pt-1">
          <DataTable
            columns={customerColumns({
              update: hasPermission("update", "customers"),
              delete: hasPermission("delete", "customers"),
            })}
            data={contacts}
            createPath="/customers/create"
            // hasDetails={true}
            // detailsLink="/customers"
            permissions={{
              create: hasPermission("create", "customers"),
              update: hasPermission("update", "customers"),
              delete: hasPermission("delete", "customers"),
            }}
          />
        </div>
      </div>
    </>
  );
}
