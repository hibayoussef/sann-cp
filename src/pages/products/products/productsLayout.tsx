import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useFetchProducts } from "@/hooks/prouducts/useProducts";
import { Home, MoreVertical, Plus } from "lucide-react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import ProductDetails from "./productDetails";

export default function ProductsLayout() {
    const { data } = useFetchProducts();
 const products = data || [];
  const { id } = useParams();
  // const [selectedCustomerId, setSelectedCustomerId] = useState<number | null>(
  //   +id! || null
  // );
  const navigate = useNavigate();

  const [selectedProductId, setSelectedProductId] = useState<number | null>(
    id ? +id : null
  );

  const handleExportCSV = () => {
    console.log("Exporting to CSV...");
  };

  const handleExportExcel = () => {
    console.log("Exporting to Excel...");
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <PageBreadcrumb
        baseTitle="Dashboard"
        pageTitle="Products"
        icon={<Home className="w-5 h-5" />}
      />

      <div className="mt-1 bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="flex h-[calc(100vh-120px)]">
          {/* Sidebar */}
          <div className="w-60 border-r border-gray-100 flex flex-col">
            <div className="p-4 border-b border-gray-100 bg-gray-50 flex justify-between items-center">
              <h3 className="font-medium text-gray-800 text-[15px]">
                Products
              </h3>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  className="h-8 bg-[#465FFF] hover:bg-[#465FFF]/90 text-white"
                  onClick={() => navigate("/products/create")}
                >
                  <Plus className="h-4 w-4 mr-1" />
                  New
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
                  <DropdownMenuContent className="w-[200px]">
                    <DropdownMenuLabel>Export Options</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleExportCSV}>
                      Export as CSV
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleExportExcel}>
                      Export as Excel
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto">
              {products.map((product: any) => (
                <div
                  key={product.id}
                  onClick={() => {
                    setSelectedProductId(product.id);
                    navigate(`/products/${product.id}`);
                  }}
                  className={`p-3 border-b border-gray-100 cursor-pointer transition-colors ${
                    selectedProductId === product.id
                      ? "bg-blue-50 border-l-4 border-l-blue-500"
                      : "hover:bg-gray-50"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center bg-blue-100 text-blue-600">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 text-[14px]">
                        {product.product_name_en || product.product_name_ar}
                      </h4>
                      <p className="text-xs text-gray-500 mt-1">
                        SKU: {product.sku}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 overflow-auto">
            {selectedProductId ? (
              <ProductDetails productId={selectedProductId} />
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-center p-8">
                <div className="bg-gray-100 p-6 rounded-full mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-10 h-10 text-gray-400"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-medium text-gray-900">
                  No product selected
                </h3>
                <p className="text-gray-500 mt-2 max-w-md">
                  Select a product from the list to view detailed information
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}