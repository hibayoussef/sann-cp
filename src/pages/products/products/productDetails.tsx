import { subCategoryColumns } from "@/columns/products/subCategory";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DataTable } from "@/components/ui/table-data/table-data";
import {
  useFetchProduct,
  useUpdateProductStatus,
} from "@/hooks/prouducts/useProducts";
import { usePermissions } from "@/hooks/usePermissions";
import {
  ChevronDown,
  ChevronUp,
  Copy,
  Edit,
  Loader2,
  MoreVertical,
  Trash2,
  UserX,
} from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router";

export default function ProductDetails({ productId }: { productId: number }) {
  const [showAdditionalDetails, setShowAdditionalDetails] = useState(false);
  const [showAssociatedPriceLists, setShowAssociatedPriceLists] =
    useState(false);

  const [showCloneDialog, setShowCloneDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showInactiveDialog, setShowInactiveDialog] = useState(false);
  const navigate = useNavigate();
  const { data: productData }: any = useFetchProduct(productId);
  const { hasPermission } = usePermissions();
  const updateStatusMutation = useUpdateProductStatus();

  if (!productData) {
    return (
      <div className="flex items-center justify-center h-full ">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-3 text-sm text-gray-500">
            Loading product details...
          </p>
        </div>
      </div>
    );
  }

  const handleDelete = () => {
    console.log("Deleting product:", productData.id);
    setShowDeleteDialog(false);
  };
  const handleMarkInactive = () => {
    updateStatusMutation.mutate(
      {
        id: productData.id,
        status: productData.is_active ? 0 : 1,
      },
      {
        onSuccess: () => {
          setShowInactiveDialog(false);
          // You might want to add a success toast here
        },
        onError: (error) => {
          console.error("Failed to update status:", error);
          // You might want to add an error toast here
        },
      }
    );
  };

  // Basic product information
  const basicInfo = [
    { label: "Product Name (English)", value: productData.product_name_en },
    { label: "Product Name (Arabic)", value: productData.product_name_ar },
    { label: "SKU", value: productData.sku },
    { label: "Type", value: productData.type },
    { label: "For Selling", value: productData.for_selling ? "Yes" : "No" },
    { label: "Color", value: productData.color },
    { label: "Alert Quantity", value: productData.alert_quantity },
  ];

  // Pricing information
  const pricingInfo = [
    { label: "Purchase Price", value: `${productData.purchase_price} AED` },
    { label: "Sale Price", value: `${productData.sale_price} AED` },
  ];

  // Category information
  const categoryInfo = [
    { label: "Category (English)", value: productData.category_name_en },
    { label: "Category (Arabic)", value: productData.category_name_ar },
    {
      label: "Sub Category (English)",
      value: productData.sub_category_name_en,
    },
    { label: "Sub Category (Arabic)", value: productData.sub_category_name_ar },
  ];

  // Additional details
  const additionalDetails = [
    { label: "Tax (English)", value: productData.tax_name_en },
    { label: "Tax (Arabic)", value: productData.tax_name_ar },
    { label: "Brand (English)", value: productData.brand_name_en },
    { label: "Brand (Arabic)", value: productData.brand_name_ar },
    { label: "Unit (English)", value: productData.unit_name_en },
    { label: "Unit (Arabic)", value: productData.unit_name_ar },
    {
      label: "Sub Unit (English)",
      value: productData.sub_unit_name_en || "N/A",
    },
    {
      label: "Sub Unit (Arabic)",
      value: productData.sub_unit_name_ar || "N/A",
    },
    { label: "Warranty (English)", value: productData.warranty_name_en },
    { label: "Warranty (Arabic)", value: productData.warranty_name_ar },
    { label: "Expiry Date", value: productData.expiry_date || "N/A" },
    {
      label: "Preferred Vendor",
      value: productData.preferred_vendor_id || "N/A",
    },
    { label: "Sale Account", value: productData.sale_account },
    { label: "Purchase Account", value: productData.purchase_account },
    { label: "Sale Return Account", value: productData.sale_return_account },
    {
      label: "Purchase Return Account",
      value: productData.purchase_return_account,
    },
  ];

  // Branches information
  const branchesInfo = productData.branches.map((branch: any) => ({
    label: `${branch.branch_name_en} (${
      branch.is_active ? "Active" : "Inactive"
    })`,
    value: `Rack: ${branch.rack || "N/A"}, Row: ${
      branch.row || "N/A"
    }, Position: ${branch.position || "N/A"}`,
  }));

  return (
    <div className="p-6 ">
      {/* Header Section */}
      <div className="flex justify-between items-start mb-6 ">
        <div>
          <h1 className="text-xl font-semibold text-gray-800 dark:bg-gray-900 dark:text-gray-500 ">
            {productData.product_name_en}
          </h1>
          {/* <p className="text-xs text-gray-500 mt-1  dark:text-gray-400">
            SKU: {productData.sku} • ID: {productData.id}
          </p>  */}
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            className="border-gray-300"
            onClick={() => navigate(`/products/update/${productData.id}`)}
          >
            <Edit className="w-3 h-3 mr-1.5" />
            <span className="text-xs">Edit</span>
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="border-gray-300">
                <MoreVertical className="w-3 h-3" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-40 dark:bg-gray-800 dark:text-gray-400 ">
              <DropdownMenuItem className="dark:hover:bg-gray-700" onClick={() => setShowCloneDialog(true)}>
                <Copy className="w-3 h-3 mr-2 " />
                Clone
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setShowDeleteDialog(true)}
                className="text-red-600 dark:hover:bg-gray-700"
              >
                <Trash2 className="w-3 h-3 mr-2" />
                Delete
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setShowInactiveDialog(true)}
                className={
                  productData.is_active ? "text-amber-600" : "text-green-600"
                }
                disabled={updateStatusMutation.isPending}
              >
                <UserX className="w-3 h-3 mr-2" />
                {productData.is_active ? "Deactivate" : "Activate"}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Clone Dialog */}
      <Dialog open={showCloneDialog} onOpenChange={setShowCloneDialog}>
        <DialogContent className="sm:max-w-md dark:bg-gray-900 dark:text-gray-400">
          <DialogHeader>
            <DialogTitle>Clone Product</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-sm text-gray-600">
              Are you sure you want to clone this product?
            </p>
            <div className="flex justify-end gap-2">
              <Button
                variant="outline"
                onClick={() => setShowCloneDialog(false)}
              >
                Cancel
              </Button>
              <Button
                onClick={() => {
                  navigate(`/products/clone/${productData.id}`);
                  setShowCloneDialog(false);
                }}
              >
                Clone
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent className="sm:max-w-md dark:bg-gray-900 dark:text-gray-400 ">
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-sm text-gray-600">
              Are you sure you want to delete this product? This action cannot
              be undone.
            </p>
            <div className="flex justify-end gap-2">
              <Button
                variant="outline"
                onClick={() => setShowDeleteDialog(false)}
              >
                Cancel
              </Button>
              <Button variant="destructive" onClick={handleDelete}>
                Delete
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Inactive Confirmation Dialog */}
      <Dialog open={showInactiveDialog} onOpenChange={setShowInactiveDialog}>
        <DialogContent className="sm:max-w-md dark:bg-gray-900 dark:text-gray-400">
          <DialogHeader>
            <DialogTitle>
              {productData.is_active
                ? "Deactivate Product"
                : "Activate Product"}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-sm text-gray-600">
              {productData.is_active
                ? "Are you sure you want to deactivate this product?"
                : "Are you sure you want to activate this product?"}
            </p>
            <div className="flex justify-end gap-2">
              <Button
                variant="outline"
                onClick={() => setShowInactiveDialog(false)}
              >
                Cancel
              </Button>
              <Button
                onClick={handleMarkInactive}
                variant={productData.is_active ? "destructive" : "default"}
                disabled={updateStatusMutation.isPending}
              >
                {updateStatusMutation.isPending ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : null}
                {productData.is_active ? "Deactivate" : "Activate"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Product Details Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 ">
        {/* Basic Information */}
        <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm dark:bg-gray-900 dark:text-gray-500">
          <h2 className="text-sm font-medium text-gray-700 dark:text-gray-500 mb-2 ">
            Basic Information
          </h2>
          <div className="space-y-3">
            {basicInfo.map((item, index) => (
              <div key={index} className="grid grid-cols-3 gap-2">
                <span className="text-xs text-gray-500 col-span-1  dark:text-gray-400">
                  {item.label}
                </span>
                <span className="text-xs font-medium text-gray-800 col-span-2 dark:text-gray-400">
                  {item.value || "N/A"}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Pricing Information */}
        <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm dark:bg-gray-900 dark:text-gray-400">
          <h2 className="text-sm font-medium text-gray-700 mb-3  dark:text-gray-500">Pricing</h2>
          <div className="space-y-3">
            {pricingInfo.map((item, index) => (
              <div key={index} className="grid grid-cols-3 gap-2">
                <span className="text-xs text-gray-500 col-span-1  dark:text-gray-400">
                  {item.label}
                </span>
                <span className="text-xs font-medium text-gray-800 col-span-2  dark:text-gray-400">
                  {item.value}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Category Information */}
        <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm dark:bg-gray-900 dark:text-gray-400">
          <h2 className="text-sm font-medium text-gray-700 mb-3  dark:text-gray-500">
            Category Information
          </h2>
          <div className="space-y-3">
            {categoryInfo.map((item, index) => (
              <div key={index} className="grid grid-cols-3 gap-2">
                <span className="text-xs text-gray-500 col-span-1  dark:text-gray-400">
                  {item.label}
                </span>
                <span className="text-xs font-medium text-gray-800 col-span-2  dark:text-gray-400">
                  {item.value || "N/A"}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Branches Information */}
        <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm dark:bg-gray-900 dark:text-gray-400">
          <h2 className="text-sm font-medium text-gray-700 mb-3  dark:text-gray-500">
            Branches Availability
          </h2>
          <div className="space-y-3">
            {branchesInfo.map((item: any, index: number) => (
              <div key={index} className="grid grid-cols-3 gap-2">
                <span className="text-xs text-gray-500 col-span-1  dark:text-gray-400">
                  {item.label}
                </span>
                <span className="text-xs font-medium text-gray-800 col-span-2 dark:text-gray-400">
                  {item.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-6">
        <button
          onClick={() => setShowAssociatedPriceLists(!showAssociatedPriceLists)}
          className="flex items-center text-blue-600 hover:text-blue-800 text-sm font-medium mb-3"
        >
          {showAssociatedPriceLists ? (
            <>
              <ChevronUp className="w-4 h-4 mr-1" />
              Hide Associated Price Lists
            </>
          ) : (
            <>
              <ChevronDown className="w-4 h-4 mr-1" />
              Show Associated Price Lists
            </>
          )}
        </button>

        {showAssociatedPriceLists && (
          <>
            <div className="space-y-4">
              <h4 className="mb-2 text-sm font-semibold text-gray-800 dark:text-white/90">
                Associated Price Lists
              </h4>

              <DataTable
                tableName="Sub Categories"
                columns={subCategoryColumns({
                  update: hasPermission("update", "sub_categories"),
                  delete: hasPermission("delete", "sub_categories"),
                })}
                data={[]}
                createPath="/sub-categories/create"
                permissions={{
                  create: hasPermission("create", "sub_categories"),
                  update: hasPermission("update", "sub_categories"),
                  delete: hasPermission("delete", "sub_categories"),
                }}
              />
            </div>
          </>
        )}
      </div>
      {/* Additional Details Section */}
      <div className="mt-6">
        <button
          onClick={() => setShowAdditionalDetails(!showAdditionalDetails)}
          className="flex items-center text-blue-600 hover:text-blue-800 text-sm font-medium mb-3"
        >
          {showAdditionalDetails ? (
            <>
              <ChevronUp className="w-4 h-4 mr-1" />
              Hide additional details
            </>
          ) : (
            <>
              <ChevronDown className="w-4 h-4 mr-1" />
              Show more details
            </>
          )}
        </button>

        {showAdditionalDetails && (
          <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm dark:bg-gray-900 dark:text-gray-400">
            <h2 className="text-sm font-medium text-gray-700 mb-3  dark:text-gray-500">
              Additional Details
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {additionalDetails.map((item, index) => (
                <div key={index} className="grid grid-cols-3 gap-2">
                  <span className="text-xs text-gray-500 col-span-1  dark:text-gray-400">
                    {item.label}
                  </span>
                  <span className="text-xs font-medium text-gray-800 col-span-2  dark:text-gray-400">
                    {item.value || "N/A"}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
