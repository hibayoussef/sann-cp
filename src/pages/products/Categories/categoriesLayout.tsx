import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useFetchCategories } from "@/hooks/prouducts/useCategories";
import { Edit, Home, MoreVertical, Plus } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router";
import CategoryDetails from "./categoryDetails";
import ComponentCardDetails from "@/components/common/ComponentCardDetails";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import { useParams } from "react-router";

export default function CategoriesLayout() {
  const { data } = useFetchCategories();
  const categories: any = data || [];
  const navigate = useNavigate();
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(
    null
  );

  // Export handlers
  const handleExportCSV = () => {
    console.log("Exporting to CSV...");
    // Add CSV export logic here
  };

  const handleExportExcel = () => {
    console.log("Exporting to Excel...");
    // Add Excel export logic here
  };

  const { id } = useParams();

  return (
    <>
      <div className="py-4">
        <PageBreadcrumb
          baseTitle="Dashboard"
          pageTitle="Categories"
          icon={<Home className="w-5 h-5" />}
        />
        <div className="py-4">
          <ComponentCardDetails
            title="Categories Management"
            className="h-full"
          >
            <div className="grid grid-cols-5 gap-4 h-[calc(100vh-180px)]">
              {/* Categories List Section */}
              <div className="col-span-1 overflow-y-auto  border-r border-gray-100 flex flex-col">
                {/* Header Section */}
                <div className="flex justify-between items-center py-3 border-b border-gray-100">
                  <h3 className="text-sm px-4 font-semibold">All</h3>
                  <div className="flex items-center  gap-2">
                    <Button
                      variant="outline"
                      className="h-8 px-2 bg-[#465FFF] text-white hover:bg-[#465FFF]/90"
                      onClick={() => navigate("/categories/create")}
                    >
                      <Plus className="h-4 w-4 mr-1" />
                      <span className="text-xs">New</span>
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          className="h-8 w-8 p-0 hover:bg-gray-100"
                        >
                          <MoreVertical className="h-4 w-4 text-gray-600" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent
                        align="end"
                        className="w-[200px] bg-white shadow-md border border-gray-200"
                      >
                        <DropdownMenuLabel>Export Options</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={handleExportCSV}>
                          Export by CSV
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={handleExportExcel}>
                          Export by Excel
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>

                {/* Categories List */}
                <div className="flex-1">
                  {categories?.map((category: any) => (
                    <div key={category.id} className="relative">
                      <div
                        onClick={() => setSelectedCategoryId(category.id)}
                        className={`px-7 py-2 cursor-pointer text-[13px] transition-colors
                      ${
                        selectedCategoryId === category.id
                          ? "bg-blue-100 text-blue-600 font-medium"
                          : "hover:bg-gray-50"
                      } flex justify-between`}
                      >
                        <span className="text-sm">{category.category_name_en}</span>
                        {/* Display the category code in green and align it to the right */}
                        <button
                        onClick={() => navigate(`/categories/update/${category.id}`)}
                        className="text-green-500 hover:text-green-600 p-1"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                        {/* <span className="text-green-500 text-[11px]">{category.code}</span> */}
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 h-px bg-gray-200 shadow-md" />
                     
                    </div>
                  ))}
                </div>
              </div>

              {/* Category Details Section */}
              <div className="col-span-4 py-5 px-4 overflow-y-auto">
                {id ? (
                  <CategoryDetails categoryId={Number(id)} />
                ) : (
                   <CategoryDetails categoryId={Number(selectedCategoryId)} />
                )}
              </div>
            </div>
          </ComponentCardDetails>
        </div>{" "}
      </div>
    </>
  );
}
