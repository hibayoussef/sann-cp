import { unitColumns } from "@/columns/products/units";
import { DataTable } from "@/components/ui/table-data/table-data";
import { useFetchUnits } from "@/hooks/prouducts/useUnits";
import { usePermissions } from "@/hooks/usePermissions";
import { Layers } from "lucide-react";
import PageBreadcrumb from "../../../components/common/PageBreadCrumb";
import PageMeta from "../../../components/common/PageMeta";

export default function Units() {
  const { data } = useFetchUnits();
  const units: any = data || [];

  const { hasPermission } = usePermissions();

  return (
    <>
      <PageMeta
        title="Units Management | Dashboard"
        description="Manage your product Units in the system."
      />
      <div className="space-y-4 px-1  py-1">
        <PageBreadcrumb
          baseTitle={"Dashboard"}
          pageTitle={"Units"}
          icon={<Layers className="w-5 h-5 "   />}
        />

        <div className="space-y-4 pt-1">
          <DataTable
            tableName="Units"
            columns={unitColumns({
              update: hasPermission("update", "categories"),
              delete: hasPermission("delete", "categories"),
            })}
            data={units}
            createPath="/units/create"
            permissions={{
              create: hasPermission("create", "units"),
              update: hasPermission("update", "units"),
              delete: hasPermission("delete", "units"),
            }}
          />
        </div>
      </div>
    </>
  );
}
