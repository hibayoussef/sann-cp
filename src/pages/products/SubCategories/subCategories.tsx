import { subCategoryColumns } from "@/columns/products/subCategory";
import { DataTable } from "@/components/ui/table-data/table-data";
import { useFetchSubCategories } from "@/hooks/prouducts/useSubCategories";
import ComponentCard from "../../../components/common/ComponentCard";
import PageBreadcrumb from "../../../components/common/PageBreadCrumb";
import PageMeta from "../../../components/common/PageMeta";

export default function SubCategories() {
  const { data } = useFetchSubCategories();
  const subCategories: any = data || [];

  return (
    <>
      <PageMeta
        title="Sub Categories Management | Dashboard"
        description="Manage your product Sub categories in the system."
      />
      <PageBreadcrumb pageTitle="Sub Categories" />

      <div className="space-y-4">
        <ComponentCard title="Sub Categories">
          <DataTable
            columns={subCategoryColumns}
            data={subCategories}
            createPath="/sub-categories/create"
          />
        </ComponentCard>
      </div>
    </>
  );
}
