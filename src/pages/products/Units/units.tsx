import { unitColumns } from "@/columns/products/units";
import { DataTable } from "@/components/ui/table-data/table-data";
import { useFetchUnits } from "@/hooks/prouducts/useUnits";
import ComponentCard from "../../../components/common/ComponentCard";
import PageBreadcrumb from "../../../components/common/PageBreadCrumb";
import PageMeta from "../../../components/common/PageMeta";

export default function Units() {
  const { data } = useFetchUnits();
  const units: any = data || [];

  return (
    <>
      <PageMeta
        title="Units Management | Dashboard"
        description="Manage your product Units in the system."
      />
      <PageBreadcrumb pageTitle="Units" />

      <div className="space-y-4">
        <ComponentCard title="Units">
          <DataTable
            columns={unitColumns}
            data={units}
            createPath="/units/create"
          />
        </ComponentCard>
      </div>
    </>
  );
}
