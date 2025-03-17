import { subCategoryColumns } from "@/columns/products/subCategory";
import { DataTable } from "@/components/ui/table-data/table-data";
import {
    useFetchCategory
} from "@/hooks/prouducts/useCategories";
import {
    useFetchSubCategories
} from "@/hooks/prouducts/useSubCategories";
import { useParams } from "react-router";
import ComponentCard from "../../../components/common/ComponentCard";
import PageBreadcrumb from "../../../components/common/PageBreadCrumb";
import PageMeta from "../../../components/common/PageMeta";

export default function CategoryDetails() {
  const { id } = useParams();

  const { data: categoryData, isLoading } = useFetchCategory(Number(id));
  const { data } = useFetchSubCategories();
  const subCategories: any = data || [];

  return (
    <>
      <PageMeta
        title="Categories Management | Dashboard"
        description="Manage your product categories in the system."
      />
      <PageBreadcrumb pageTitle="Categories" />

      <div className="space-y-4">
        <ComponentCard title="Category Details">
          <h4 className="mb-2 text-lg font-semibold text-center text-gray-800 dark:text-white/90 xl:text-left">
            {categoryData?.category_name_en}
          </h4>
          <div className="flex flex-col items-center gap-1 text-center xl:flex-row xl:gap-3 xl:text-left">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {categoryData?.description_en}
            </p>
          </div>
          <div className="w-full h-px bg-gray-200 dark:bg-gray-600 mb-2"></div>
          <h4 className="mb-2 text-sm font-semibold text-center text-gray-800 dark:text-white/90 xl:text-left">
            Sub Categories
          </h4>
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
