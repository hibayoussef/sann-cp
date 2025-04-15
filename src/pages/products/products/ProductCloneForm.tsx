import ComponentCard from "@/components/common/ComponentCard";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import Input from "@/components/form/input/InputField";
import Label from "@/components/form/Label";
import {
  productSchema,
  type ProductType,
} from "@/components/lib/validations/product";
import Loader from "@/components/ui/loader/loader";
import { useAddProduct, useFetchProduct } from "@/hooks/prouducts/useProducts";
import { useMeStore } from "@/store/useMeStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { IoAdd } from "react-icons/io5";
import { useParams, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";

export default function CloneProductForm() {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const organizationId = useMeStore((state) => state.organizationId);
  const { data: originalProduct, isLoading } = useFetchProduct(Number(id), {
    enabled: !!id,
  });
  const addProduct = useAddProduct();

  // Initialize form with default values
  const methods = useForm<ProductType>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      for_selling: 1,
      type: "Goods",
      product_name_en: "",
      product_name_ar: "",
      sku: "",
      color: "",
      tax_id: null,
      brand_id: null,
      category_id: 0,
      sub_category_id: null,
      warranty_id: null,
      unit_id: 0,
      alert_quantity: 1,
      // description: "",
      // sub_unit_id: null,
      sale_account: 0,
      purchase_account: 0,
      sale_return_account: 0,
      purchase_return_account: 0,
      purchase_price: 0,
      sale_price: 0,
      expiry_date: "",
      is_active: 0,
      branches: [{ branch_id: 0, is_active: true }],
      default_sale_unit: 0,
      default_purchase_unit: 0,
      sub_units: [],
    },
  });

  // Clone original product data into form
  useEffect(() => {
    if (originalProduct) {
      const clonedData: any = {
        ...originalProduct,
        product_name_en: originalProduct.product_name_en
          ? `${originalProduct.product_name_en} (Clone)`
          : "",
        product_name_ar: originalProduct.product_name_ar
          ? `${originalProduct.product_name_ar} (نسخة)`
          : "",
        sku: originalProduct.sku ? `${originalProduct.sku}-CLONE` : "",
        is_active: 0, // Default to inactive for cloned product
        branches: originalProduct.branches?.map((b) => ({
          branch_id: b.branch_id,
          is_active: b.is_active,
        })) || [{ branch_id: 0, is_active: true }],
        sub_units:
          originalProduct.sub_units?.map((su) => ({ id: su.id })) || [],
      };

      methods.reset(clonedData);
    }
  }, [originalProduct, methods]);

  const onSubmit = async (formData: any) => {
    try {
      const payload = {
        ...formData,
        organization_id: organizationId,
        branches: formData.branches.map((b: any) => ({
          branch_id: Number(b.branch_id),
          is_active: b.is_active ? 1 : 0,
        })),
        sub_units: formData.sub_units.map((su: any) => ({
          id: Number(su.id),
        })),
        is_active: formData.is_active ? 1 : 0,
      };

      await addProduct.mutateAsync(payload);
      toast.success("Product cloned successfully!");
    } catch (error) {
      toast.error("Failed to clone product");
      console.error("Clone error:", error);
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <PageBreadcrumb
        baseLink="/products"
        baseTitle="Products"
        pageTitle="Clone Product"
        icon={
          <div className="w-6 h-6 flex items-center justify-center dark:bg-gray-900 bg-gray-200 rounded-full">
            <IoAdd className="w-5 h-5" />
          </div>
        }
      />

      <ComponentCard
        title={`Clone Product: ${originalProduct?.product_name_en || ""}`}
      >
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-8">
            {/* Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label>English Name</Label>
                <Input
                  {...methods.register("product_name_en")}
                  error={!!methods.formState.errors.product_name_en}
                  hint={methods.formState.errors.product_name_en?.message}
                  placeholder="Enter product name in English"
                />
              </div>

              <div className="space-y-2">
                <Label>Arabic Name</Label>
                <Input
                  {...methods.register("product_name_ar")}
                  error={!!methods.formState.errors.product_name_ar}
                  hint={methods.formState.errors.product_name_ar?.message}
                  placeholder="Enter product name in Arabic"
                />
              </div>

              <div className="space-y-2">
                <Label>SKU</Label>
                <Input
                  {...methods.register("sku")}
                  error={!!methods.formState.errors.sku}
                  hint={methods.formState.errors.sku?.message}
                  placeholder="Enter SKU"
                />
              </div>

              <div className="space-y-2">
                <Label>Type</Label>
                <select
                  {...methods.register("type")}
                  className="w-full px-3 py-2 border rounded-md"
                >
                  <option value="Goods">Goods</option>
                  <option value="Service">Service</option>
                  <option value="Landing Cost">Landing Cost</option>
                </select>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end">
              <button
                type="submit"
                className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 text-sm font-medium"
                disabled={addProduct.isPending}
              >
                {addProduct.isPending ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Cloning...
                  </span>
                ) : (
                  "Clone Product"
                )}
              </button>
            </div>
          </form>
        </FormProvider>
      </ComponentCard>
    </>
  );
}
