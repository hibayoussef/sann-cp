import {
  productSchema,
  type ProductType,
} from "@/components/lib/validations/product";

import { useFetchBrands } from "@/hooks/prouducts/useBrands";
import { useFetchCategories } from "@/hooks/prouducts/useCategories";
import {
  useAddProduct,
  useFetchProduct,
  useUpdateProduct,
} from "@/hooks/prouducts/useProducts";
import { useFetchSubCategories } from "@/hooks/prouducts/useSubCategories";
import { useFetchTaxes } from "@/hooks/prouducts/useTaxes";
import { useFetchUnits } from "@/hooks/prouducts/useUnits";
import { useFetchWarranties } from "@/hooks/prouducts/useWarranties";
import type { IBrand } from "@/types/products/brand";
import type { ICategory } from "@/types/products/categories";
import type { ISubCategory } from "@/types/products/subCategory";
import type { ISubUnit, IUnit } from "@/types/products/unit";
import type { IWarranty } from "@/types/products/warranty";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Box,
  Calendar,
  DollarSign,
  GitBranch,
  Info,
  Layers,
  Package,
  Tag,
} from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { IoAdd, IoColorPalette } from "react-icons/io5";
import { useParams } from "react-router-dom";
import ComponentCard from "../../../components/common/ComponentCard";
import PageBreadcrumb from "../../../components/common/PageBreadCrumb";
import Input from "../../../components/form/input/InputField";
import Label from "../../../components/form/Label";
import { useMeStore } from "../../../store/useMeStore";
import type { ProductForm } from "@/types/products/product";
import { useFetchSubUnits } from "@/hooks/prouducts/useSubUnits";
import { useFetchBranches } from "@/hooks/settings/useBranches";
import type { IBranch } from "@/types/settings/branches";
import { Select } from "@/components/ui/select";
import type { ITax } from "@/types/products/tax";
import { FaMoneyBill } from "react-icons/fa";

export default function ProductForm() {
  const { id } = useParams();
  const isUpdate = Boolean(id);
  const addProduct = useAddProduct();
  const updateProduct = useUpdateProduct();
  const organizationId = useMeStore((state) => state.organizationId);

  const { data: productData, isLoading } = useFetchProduct(Number(id), {
    enabled: isUpdate,
  });

  // Fetching required lists
  const { data: taxes } = useFetchTaxes();
  const { data: categories } = useFetchCategories();
  const { data: subCategories } = useFetchSubCategories();
  const { data: warranties } = useFetchWarranties();
  const { data: brands } = useFetchBrands();
  const { data: units } = useFetchUnits();
  const { data: subUnits } = useFetchSubUnits();
  const { data: branches } = useFetchBranches();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<ProductType>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      for_selling: 1,
      type: "Goods",
      product_name_en: productData?.product_name_en ?? "",
      product_name_ar: productData?.product_name_ar ?? "",
      sku: productData?.sku ?? "",
      color: productData?.color ?? "",
      tax_id: productData?.tax_id ?? null,
      brand_id: productData?.brand_id ?? null,
      category_id: productData?.category_id ?? null,
      sub_category_id: productData?.sub_category_id ?? null,
      warranty_id: productData?.warranty_id ?? null,
      unit_id: Number(productData?.unit_id) || 0,
      alert_quantity: productData?.alert_quantity ?? 0,
      sale_account: productData?.sale_account ?? 0,
      purchase_account: productData?.purchase_account ?? 0,
      sale_return_account: productData?.sale_return_account ?? 0,
      purchase_return_account: productData?.purchase_return_account ?? 0,
      purchase_price: productData?.purchase_price ?? 0,
      sale_price: productData?.sale_price ?? 0,
      expiry_date: productData?.expiry_date ?? "",
      is_active: productData?.is_active ?? true,
      branches: [{ branch_id: productData?.branches[0]?.branch_id || 0 }],
      default_sale_unit: productData?.default_sale_unit ?? "",
      default_purchase_unit: productData?.default_purchase_unit ?? "",
    },
  });

  useEffect(() => {
    if (productData) {
      setValue("product_name_en", productData.product_name_en ?? "");
      setValue("product_name_ar", productData.product_name_ar ?? "");
      setValue("sku", productData.sku ?? "");
      setValue("sale_price", productData.sale_price ?? 0);

      // Add more fields as necessary
    }
  }, [productData, setValue]);

  const onSubmit = async (formData: ProductType) => {
    const payload: any = {
      ...formData,
      organization_id: organizationId,
      //  branches: formData.branches.filter((b) => b.branch_id !== null),
      // Convert string values to numbers where necessary
      tax_id: Number(formData.tax_id),
      category_id: Number(formData.category_id),
      sub_category_id: Number(formData.sub_category_id),
      warranty_id: Number(formData.warranty_id),
      unit_id: Number(formData.unit_id),
      alert_quantity: Number(formData.alert_quantity),
      purchase_price: Number(formData.purchase_price),
      sale_price: Number(formData.sale_price),
      branches: formData.branches.map((b) => ({
        branch_id: Number(b.branch_id),
      })),
    };

    if (isUpdate && id) {
      await updateProduct.mutateAsync({
        id: Number(id),
        data: payload,
      });
    } else {
      await addProduct.mutateAsync(payload);
    }
  };

  console.log("sssssssssss: ", errors);

  const selectStyles = `
  text-sm rounded-md border border-gray-300 shadow-sm 
  focus:border-blue-500 focus:ring-1 focus:ring-blue-500 
  transition-colors duration-200 ease-in-out
`;

  return (
    <>
      <PageBreadcrumb
        baseLink="/products"
        baseTitle="Product"
        pageTitle={isUpdate ? "Update Product" : "Create Product"}
        icon={
          <div className="w-6 h-6 flex items-center justify-center bg-gray-200 rounded-full">
            <IoAdd className="w-5 h-5" />
          </div>
        }
      />

      {/* <ComponentCard title={isUpdate ? "Update Product" : "Create Product"}> */}
      {isUpdate && isLoading ? (
        <p>Loading product data...</p>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Basic Information Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ComponentCard
              title="Basic Information"
              icon={<Package className="text-blue-500 w-5 h-5" />}
              className="col-span-full"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="product_name_en">English Name</Label>
                  <Input
                    type="text"
                    id="product_name_en"
                    {...register("product_name_en")}
                    placeholder="Please enter product name (En)"
                    error={!!errors.product_name_en}
                    hint={errors.product_name_en?.message}
                    icon={<Info className="w-4 h-4" />}
                  />
                </div>
                <div>
                  <Label htmlFor="product_name_ar">Arabic Name</Label>
                  <Input
                    type="text"
                    id="product_name_ar"
                    {...register("product_name_ar")}
                    placeholder="Please enter product name (Ar)"
                    error={!!errors.product_name_ar}
                    hint={errors.product_name_ar?.message}
                    icon={<Info className="w-4 h-4" />}
                  />
                </div>
                <div>
                  <Label htmlFor="sku">SKU</Label>

                  <Input
                    type="text"
                    id="sku"
                    placeholder="Enter SKU"
                    {...register("sku")}
                    error={!!errors.sku}
                    hint={errors.sku?.message}
                    icon={<Box className="w-4 h-4" />}
                  />
                </div>
                <div>
                  <Label htmlFor="color">Color</Label>
                  <Input
                    type="text"
                    id="color"
                    placeholder="Enter color"
                    {...register("color")}
                    error={!!errors.color}
                    hint={errors.color?.message}
                    icon={<IoColorPalette className="w-4 h-4" />}
                  />
                </div>
              </div>
            </ComponentCard>

            {/* Pricing & Inventory Section */}
            <ComponentCard
              title="Pricing & Inventory"
              icon={<DollarSign className="text-green-500 w-5 h-5" />}
            >
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <Label htmlFor="purchase_price">Purchase Price</Label>
                  <Input
                    type="number"
                    id="purchase_price"
                    placeholder="Enter purchase price"
                    {...register("purchase_price", { valueAsNumber: true })}
                    error={!!errors.purchase_price}
                    hint={errors.purchase_price?.message}
                    icon={<FaMoneyBill className="w-4 h-4" />}
                  />
                </div>
                <div>
                  <Label htmlFor="sale_price">Sale Price</Label>
                  <Input
                    type="number"
                    id="sale_price"
                    placeholder="Enter sale price"
                    {...register("sale_price")}
                    error={!!errors.sale_price}
                    hint={errors.sale_price?.message}
                    icon={<FaMoneyBill className="w-4 h-4" />}
                  />
                </div>
                <div>
                  <Label htmlFor="alert_quantity">Alert Quantity</Label>
                  <Input
                    type="number"
                    id="alert_quantity"
                    placeholder="Enter alert quantity"
                    {...register("alert_quantity")}
                    error={!!errors.alert_quantity}
                    hint={errors.alert_quantity?.message}
                    icon={<Info className="w-4 h-4" />}
                  />
                </div>
                <div>
                  <Label htmlFor="expiry_date">Expiry Date</Label>
                  <Input
                    type="date"
                    id="expiry_date"
                    {...register("expiry_date")}
                    error={!!errors.expiry_date}
                    hint={errors.expiry_date?.message}
                    icon={<Calendar className="w-4 h-4" />}
                  />
                </div>
              </div>
            </ComponentCard>

            {/* Categories & Tax Section */}
            <ComponentCard
              title="Classification"
              icon={<Tag className="text-red-500 w-5 h-5" />}
            >
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <Label htmlFor="category_id">Category</Label>
                  <select
                    {...register("category_id", { valueAsNumber: true })}
                    className={`${selectStyles} w-full`}
                  >
                    <option value="">Select Category</option>
                    {categories?.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.category_name_en}
                      </option>
                    ))}
                  </select>
                  {errors.category_id && (
                    <p className="text-red-500 text-sm">
                      {errors?.category_id.message}
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor="sub_category_id">Sub Category</Label>
                  <select
                    {...register("sub_category_id", { valueAsNumber: true })}
                    className={`${selectStyles} w-full`}
                  >
                    <option value="">Select Sub Category</option>
                    {subCategories?.map((subCategory) => (
                      <option key={subCategory.id} value={subCategory.id}>
                        {subCategory.sub_category_name_en}
                      </option>
                    ))}
                  </select>
                  {errors.sub_category_id && (
                    <p className="text-red-500 text-sm">
                      {errors?.sub_category_id.message}
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor="tax_id">Tax</Label>
                  <select
                    {...register("tax_id", { valueAsNumber: true })}
                    className={`${selectStyles} w-full`}
                  >
                    <option value="">Select Tax</option>
                    {taxes?.map((tax) => (
                      <option key={tax.id} value={tax.id}>
                        {tax.tax_name_en} ({tax.rate}%)
                      </option>
                    ))}
                  </select>
                  {errors.tax_id && (
                    <p className="text-red-500 text-sm">
                      {errors?.tax_id.message}
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor="brand_id">Brand</Label>
                  <select
                    {...register("brand_id", { valueAsNumber: true })}
                    className={`${selectStyles} w-full`}
                  >
                    <option value="">Select Brand</option>
                    {brands?.map((brand) => (
                      <option key={brand.id} value={brand.id}>
                        {brand.brand_name_en}
                      </option>
                    ))}
                  </select>
                  {errors.brand_id && (
                    <p className="text-red-500 text-sm">
                      {errors?.brand_id.message}
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor="warranty_id">Warranty</Label>
                  <select
                    {...register("warranty_id", { valueAsNumber: true })}
                    className={`${selectStyles} w-full`}
                  >
                    <option value="">Select Warranty</option>
                    {warranties?.map((warranty) => (
                      <option key={warranty.id} value={warranty.id}>
                        {warranty.warranty_name_en}
                      </option>
                    ))}
                  </select>
                  {errors.branch_id && (
                    <p className="text-red-500 text-sm">
                      {errors?.branch_id.message}
                    </p>
                  )}
                </div>
              </div>
            </ComponentCard>

            {/* Units Section */}
            <ComponentCard
              title="Units"
              icon={<Layers className="text-yellow-500 w-5 h-5" />}
            >
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <Label htmlFor="unit_id">Primary Unit</Label>
                  <select
                    {...register("unit_id", { valueAsNumber: true })}
                    className={`${selectStyles} w-full`}
                  >
                    <option value="">Select Unit</option>
                    {units?.map((unit) => (
                      <option key={unit.id} value={unit.id}>
                        {unit.unit_name_en}
                      </option>
                    ))}
                  </select>
                  {errors.unit_id && (
                    <p className="text-red-500 text-sm">
                      {errors?.unit_id.message}
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor="sub_unit_id">Sub Unit</Label>
                  <select
                    {...register("sub_units.0.id", { valueAsNumber: true })}
                    className={`${selectStyles} w-full`}
                  >
                    <option value="">Select Sub Unit</option>
                    {subUnits?.map((unit) => (
                      <option key={unit.id} value={unit.id}>
                        {unit.unit_name_en}
                      </option>
                    ))}
                  </select>
                  {errors.sub_units && (
                    <p className="text-red-500 text-sm">
                      {errors?.sub_units.message}
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor="default_sale_unit">Default Sale Unit</Label>
                  <Input
                    type="text"
                    id="default_sale_unit"
                    placeholder="Enter default sale unit"
                    {...register("default_sale_unit")}
                    error={!!errors.default_sale_unit}
                    hint={errors.default_sale_unit?.message}
                    icon={<Layers className="w-4 h-4" />}
                  />
                </div>

                <div>
                  <Label htmlFor="default_purchase_unit">
                    Default Purchase Unit
                  </Label>
                  <Input
                    type="text"
                    id="default_purchase_unit"
                    placeholder="Enter default purchase unit"
                    {...register("default_purchase_unit")}
                    error={!!errors.default_purchase_unit}
                    hint={errors.default_purchase_unit?.message}
                    icon={<Layers className="w-4 h-4" />}
                  />
                </div>
              </div>
            </ComponentCard>

            {/* Branch & Status Section */}
            <ComponentCard
              title="Branch & Status"
              icon={<GitBranch className="text-purple-500 w-5 h-5" />}
            >
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <Label htmlFor="branch_id">Branch</Label>
                  <select
                    {...register("branches.0.branch_id", {
                      valueAsNumber: true,
                    })}
                    className={`${selectStyles} w-full`}
                  >
                    <option value="">Select Branch</option>
                    {branches?.map((branch) => (
                      <option key={branch.id} value={branch.id}>
                        {branch.branch_name_en}
                      </option>
                    ))}
                  </select>
                  {errors.branch_id && (
                    <p className="text-red-500 text-sm">
                      {errors?.branch_id.message}
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor="is_active">Status</Label>
                  <select
                    {...register("is_active")}
                    className={`${selectStyles} w-full`}
                  >
                    <option value="true">Active</option>
                    <option value="false">Inactive</option>
                  </select>
                </div>
              </div>
            </ComponentCard>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end mt-6">
            <button
              type="submit"
              className="px-6 py-3 text-sm font-medium disabled:opacity-50 text-white transition rounded-lg shadow-theme-xs bg-[#465FFF] hover:bg-[#465FFF] flex items-center gap-2"
              disabled={
                isSubmitting || addProduct.isPending || updateProduct.isPending
              }
            >
              {(addProduct.isPending || updateProduct.isPending) && (
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
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
              )}
              {isUpdate ? "Update" : "Create"}
            </button>
          </div>
        </form>
      )}
      {/* </ComponentCard> */}
    </>
  );
}
