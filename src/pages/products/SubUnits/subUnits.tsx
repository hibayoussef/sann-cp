import { subUnitColumns } from "@/columns/products/subUnit";
import { DataTable } from "@/components/ui/table-data/table-data";
import { useFetchSubUnits } from "@/hooks/prouducts/useSubUnits";
import { usePermissions } from "@/hooks/usePermissions";
import { Layers, Package, Ruler } from "lucide-react";
import PageBreadcrumb from "../../../components/common/PageBreadCrumb";
import PageMeta from "../../../components/common/PageMeta";

export default function SubUnits() {
  const { data } = useFetchSubUnits();
  const units: any = data || [];

  const { hasPermission } = usePermissions();

  return (
    <>
      <PageMeta
        title="SubUnits Management | Dashboard"
        description="Manage your product SubUnits in the system."
      />
      <div className="space-y-4 px-1 py-1">
        <PageBreadcrumb
          baseTitle={"Dashboard"}
          pageTitle={"SubUnits"}
          icon={<Package className="w-5 h-5" />}
        />

        <div className="space-y-4 pt-1">
          <DataTable
            columns={subUnitColumns({
              update: hasPermission("update", "sub_units"),
              delete: hasPermission("delete", "sub_units"),
            })}
            data={units}
            createPath="/sub-units/create"
            permissions={{
              create: hasPermission("create", "sub_units"),
              update: hasPermission("update", "sub_units"),
              delete: hasPermission("delete", "sub_units"),
            }}
          />
        </div>
      </div>
    </>
  );
}
