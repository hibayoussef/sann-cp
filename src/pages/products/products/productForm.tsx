import Switch from "@/components/form/switch/Switch";
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
import {
  useFetchSubUnitsById
} from "@/hooks/prouducts/useSubUnits";
import { useFetchTaxes } from "@/hooks/prouducts/useTaxes";
import { useFetchUnits } from "@/hooks/prouducts/useUnits";
import { useFetchWarranties } from "@/hooks/prouducts/useWarranties";
import { useFetchBranches } from "@/hooks/settings/useBranches";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Box,
  Calendar,
  DollarSign,
  GitBranch,
  Info,
  Layers,
  Package,
  Tag
} from "lucide-react";
import { useEffect } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { FaMoneyBill } from "react-icons/fa";
import { IoAdd, IoColorPalette, IoTrash } from "react-icons/io5";
import { useParams } from "react-router-dom";
import ComponentCard from "../../../components/common/ComponentCard";
import PageBreadcrumb from "../../../components/common/PageBreadCrumb";
import Input from "../../../components/form/input/InputField";
import Label from "../../../components/form/Label";
import { useMeStore } from "../../../store/useMeStore";

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
  // const { data: subUnits } = useFetchSubUnits();
  const { data: branches } = useFetchBranches();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    control,
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
      tax_id: productData?.tax_id ?? 0,
      brand_id: productData?.brand_id ?? 0,
      category_id: productData?.category_id ?? 0,
      sub_category_id: productData?.sub_category_id ?? 0,
      warranty_id: productData?.warranty_id ?? 0,
      unit_id: productData?.unit_id ?? 0,
      alert_quantity: productData?.alert_quantity ?? 0,
      sale_account: productData?.sale_account ?? 0,
      purchase_account: productData?.purchase_account ?? 0,
      sale_return_account: productData?.sale_return_account ?? 0,
      purchase_return_account: productData?.purchase_return_account ?? 0,
      purchase_price: productData?.purchase_price ?? 0,
      sale_price: productData?.sale_price ?? 0,
      expiry_date: productData?.expiry_date ?? "",
      is_active: productData?.is_active ?? false,
      branches: productData?.branches?.length
        ? productData.branches
        : [{ branch_id: 0, is_active: true }],
      default_sale_unit: productData?.default_sale_unit ?? 0,
      default_purchase_unit: productData?.default_purchase_unit ?? 0,
      sub_units: productData?.sub_units ?? [],
    },
  });

  const selectedUnitId = watch("unit_id");
  const selectedUnit = units?.find((unit) => unit.id === selectedUnitId);

  const { fields, append, remove } = useFieldArray({
    control,
    name: "branches",
  });
  const {
    data: subunits,
    isLoading: subunitsLoading,
    error: subunitsError,
  } = useFetchSubUnitsById(selectedUnitId);

  useEffect(() => {
  if (productData) {
    setValue(
      "sub_units",
      productData.sub_units?.map(su => ({ id: su.id })) || []
    );
  }
  }, [productData, setValue]);
  
  useEffect(() => {
    if (selectedUnitId) {
      const defaultSubUnit = subunits?.data?.[0]?.id || selectedUnitId;
      setValue("default_sale_unit", defaultSubUnit);
      setValue("default_purchase_unit", defaultSubUnit);
    }
  }, [selectedUnitId, subunits, setValue]);

  useEffect(() => {
    if (productData) {
      setValue("product_name_en", productData.product_name_en ?? "");
      setValue("product_name_ar", productData.product_name_ar ?? "");
      setValue("sku", productData.sku ?? "");
      setValue("sale_price", productData.sale_price ?? 0);
      setValue("is_active", productData.is_active ?? false);
      setValue("unit_id", productData?.unit_id ?? 0);
      setValue("category_id", productData.category_id ?? 0);
      setValue("brand_id", productData.brand_id ?? 0);
      setValue("tax_id", productData.tax_id ?? 0);
      setValue("warranty_id", productData.warranty_id ?? 0);
      setValue("sub_category_id", productData.sub_category_id ?? 0);
        setValue(
      "sub_units",
      productData.sub_units?.map(su => ({ id: su.id })) || []
    );
    }
  }, [productData, setValue]);

  useEffect(() => {
  if (selectedUnitId && subunits?.data) {
    // تحديد كل الوحدات الفرعية تلقائيًا إذا كانت موجودة
    setValue(
      "sub_units",
      subunits.data.map(subunit => ({ id: subunit.id }))
    )
  }
  }, [subunits?.data, setValue]);
  
  console.log("error r:", errors);
  const onSubmit = async (formData: any) => {
    const payload = {
      ...formData,
      organization_id: organizationId,
      branches: formData.branches.map((b: any) => ({
        branch_id: Number(b.branch_id),
        is_active: b.is_active ? 1 : 0,
      })),
      // sub_units:
      //   formData?.sub_units.map((su: any) => ({
      //     id: su.id ? Number(su.id) : null,
      //   })) || [],
      sub_unit: formData.sub_units.map((suId: number) => ({
        id: Number(suId),
      })),
      is_active: formData.is_active ? 1 : 0,
      sale_account: formData.sale_account ? Number(formData.sale_account) : 0,
      purchase_account: formData.purchase_account
        ? Number(formData.purchase_account)
        : 0,
      sale_return_account: formData.sale_return_account
        ? Number(formData.sale_return_account)
        : 0,
      purchase_return_account: formData.purchase_return_account
        ? Number(formData.purchase_return_account)
        : 0,
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

  const selectStyles = `
  w-full text-sm rounded-lg border border-gray-300 shadow-sm 
  focus:border-blue-500 focus:ring-1 focus:ring-blue-500 
  transition-colors duration-200 ease-in-out p-1.5
  text-gray-500
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
      {isUpdate && isLoading ? (
        <p>Loading product data...</p>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Basic Information Section */}
          <ComponentCard
            title="Basic Information"
            icon={<Package className="text-blue-500 w-5 h-5" />}
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

          {/* Two Columns Layout for Next Sections */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Pricing & Inventory Section */}
            <ComponentCard
              title="Pricing & Inventory"
              icon={<DollarSign className="text-green-500 w-5 h-5" />}
            >
              <div className="space-y-4">
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
                    {...register("sale_price", { valueAsNumber: true })}
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
                    {...register("alert_quantity", { valueAsNumber: true })}
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

            {/* Category & Tax Section */}
            <ComponentCard
              title="Classification"
              icon={<Tag className="text-red-500 w-5 h-5" />}
            >
              <div className="space-y-4">
                <div>
                  <Label htmlFor="category_id">Category</Label>
                  <select
                    {...register("category_id", { valueAsNumber: true })}
                    className={selectStyles}
                  >
                    <option
                      value=""
                      disabled
                      selected
                      className="text-gray-400"
                    >
                      Select Category
                    </option>
                    {categories?.map((category) => (
                      <option
                        key={category.id}
                        className="text-gray-950"
                        value={category.id}
                      >
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
                    className={selectStyles}
                  >
                    <option
                      value=""
                      disabled
                      selected
                      className="text-gray-400"
                    >
                      Select Sub Category
                    </option>
                    {subCategories?.map((subCategory) => (
                      <option
                        key={subCategory.id}
                        className="text-gray-950"
                        value={subCategory.id}
                      >
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
                  <Label htmlFor="warranty_id">Warranty</Label>
                  <select
                    {...register("warranty_id", { valueAsNumber: true })}
                    className={selectStyles}
                  >
                    <option
                      value=""
                      disabled
                      selected
                      className="text-gray-400"
                    >
                      Select Warranty
                    </option>
                    {warranties?.map((warranty) => (
                      <option
                        key={warranty.id}
                        className="text-gray-950"
                        value={warranty.id}
                      >
                        {warranty.warranty_name_en}
                      </option>
                    ))}
                  </select>
                  {errors.warranty_id && (
                    <p className="text-red-500 text-sm">
                      {errors?.warranty_id.message}
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor="brand_id">Brand</Label>
                  <select
                    {...register("brand_id", { valueAsNumber: true })}
                    className={selectStyles}
                  >
                    <option
                      value=""
                      disabled
                      selected
                      className="text-gray-400"
                    >
                      Select Brand
                    </option>
                    {brands?.map((brand) => (
                      <option
                        key={brand.id}
                        className="text-gray-950"
                        value={brand.id}
                      >
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
                  <Label htmlFor="tax_id">Tax</Label>
                  <select
                    {...register("tax_id", { valueAsNumber: true })}
                    className={selectStyles}
                  >
                    <option
                      value=""
                      disabled
                      selected
                      className="text-gray-400"
                    >
                      Select Tax
                    </option>
                    {taxes?.map((tax) => (
                      <option
                        key={tax.id}
                        className="text-gray-950"
                        value={tax.id}
                      >
                        {tax?.tax_name_en} ({tax?.amount}%)
                      </option>
                    ))}
                  </select>
                  {errors.tax_id && (
                    <p className="text-red-500 text-sm">
                      {errors?.tax_id.message}
                    </p>
                  )}
                </div>
              </div>
            </ComponentCard>
          </div>

          {/* Two Columns Layout for Units and Branch Sections */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ComponentCard
              title="Units Management"
              icon={<Layers className="text-blue-500 w-5 h-5" />}
            >
              <div className="space-y-4">
                {/* حقل الوحدة الرئيسية */}
                <div>
                  <Label htmlFor="unit_id">Main Unit*</Label>
                  <select
                    id="unit_id"
                    {...register("unit_id", {
                      valueAsNumber: true,
                      required: "Main unit is required",
                    })}
                    className={`${selectStyles} ${
                      errors.unit_id ? "border-red-500" : ""
                    }`}
                  >
                    <option value="" disabled className="text-gray-400">
                      Select Main Unit
                    </option>
                    {units?.map((unit) => (
                      <option
                        key={unit.id}
                        value={unit.id? unit.id:""}
                        className="text-gray-950"
                      >
                        {unit.unit_name_en}
                      </option>
                    ))}
                  </select>
                  {errors.unit_id && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.unit_id.message}
                    </p>
                  )}
                </div>

                {/* شرط إظهار الوحدات الفرعية */}
                {selectedUnitId && (
                  <>
                    {subunitsLoading ? (
                      <div className="text-gray-500 text-sm">
                        Loading subunits...
                      </div>
                    ) : subunitsError ? (
                      <div className="text-red-500 text-sm">
                        Error loading subunits
                      </div>
                    ) : (
                     subunits &&  subunits?.data?.length > 0 && (
                        <div>
                          <Label htmlFor="sub_units">Available Sub Units</Label>
                          <select
                            id="sub_units"
                            multiple
                            {...register("sub_units", {
                              validate: (value: any) => {
                                if (
                                  value.length === 0 &&
                                  subunits?.data?.length > 0
                                ) {
                                  return "At least one sub unit must be selected";
                                }
                                return true;
                              },
                            })}
                            className={`${selectStyles} ${
                              errors.sub_units ? "border-red-500" : ""
                            } h-32`}
                          >
                            {subunits?.data?.map((subunit) => (
                              <option
                                key={subunit.id}
                                value={subunit.id}
                                className="text-gray-950"
                              >
                                {subunit.unit_name_en} ({subunit.conversion_factor}{" "}
                                per main unit)
                              </option>
                            ))}
                          </select>
                          {errors.sub_units && (
                            <p className="text-red-500 text-sm mt-1">
                              {errors.sub_units.message}
                            </p>
                          )}
                        </div>
                      )
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="default_sale_unit">
                          Default Sale Unit*
                        </Label>
                        <select
                          id="default_sale_unit"
                          {...register("default_sale_unit", {
                            valueAsNumber: true,
                            required: "Sale unit is required",
                          })}
                          className={`${selectStyles} ${
                            errors.default_sale_unit ? "border-red-500" : ""
                          }`}
                        >
                          {selectedUnit && (
                            <option value={selectedUnit.id? selectedUnit.id: ""}>
                              {selectedUnit.unit_name_en} (Main)
                            </option>
                          )}
                          {subunits?.data?.map((subunit) => (
                            <option
                              key={subunit.id}
                              value={subunit.id}
                              className="text-gray-950"
                            >
                              {subunit.unit_name_en} (Sub)
                            </option>
                          ))}
                        </select>
                        {errors.default_sale_unit && (
                          <p className="text-red-500 text-sm mt-1">
                            {errors.default_sale_unit.message}
                          </p>
                        )}
                      </div>

                      <div>
                        <Label htmlFor="default_purchase_unit">
                          Default Purchase Unit*
                        </Label>
                        <select
                          id="default_purchase_unit"
                          {...register("default_purchase_unit", {
                            valueAsNumber: true,
                            required: "Purchase unit is required",
                          })}
                          className={`${selectStyles} ${
                            errors.default_purchase_unit ? "border-red-500" : ""
                          }`}
                        >
                          {selectedUnit && (
                              <option value={selectedUnit.id ? selectedUnit.id : ""}>
                                {selectedUnit.unit_name_en} (Main)
                            </option>
                          )}
                          {subunits?.data?.map((subunit) => (
                            <option
                              key={subunit.id}
                              value={subunit.id}
                              className="text-gray-950"
                            >
                              {subunit.unit_name_en} (Sub)
                            </option>
                          ))}
                        </select>
                        {errors.default_purchase_unit && (
                          <p className="text-red-500 text-sm mt-1">
                            {errors.default_purchase_unit.message}
                          </p>
                        )}
                      </div>
                    </div>
                  </>
                )}
              </div>
            </ComponentCard>
            {/* Branch & Status Section */}
            <ComponentCard title="Branch Management" icon={<GitBranch />}>
              <div className="space-y-4">
                {fields.map((field, index) => (
                  <div key={field.id} className="flex gap-4 items-end">
                    <div className="flex-1">
                      <Label>Branch</Label>
                      <select
                        {...register(`branches.${index}.branch_id`)}
                        className={selectStyles}
                      >
                        <option
                          value=""
                          disabled
                          selected
                          className="text-gray-400"
                        >
                          Select Branch
                        </option>
                        {branches?.map((branch) => (
                          <option
                            key={branch.id}
                            className="text-gray-950"
                            value={branch.id}
                          >
                            {branch.branch_name_en}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="flex items-center gap-2 mb-2">
                      <Label>Active</Label>
                      {/* <Switch
                      checked={watch(`branches.${index}.is_active`)}
                      onChange={(checked) =>
                        setValue(`branches.${index}.is_active`, checked)
                      }
                    /> */}
                      <Switch
                        label=""
                        defaultChecked={watch(`branches.${index}.is_active`)}
                        onChange={(checked) =>
                          setValue(`branches.${index}.is_active`, checked)
                        }
                      />
                    </div>

                    <button
                      type="button"
                      onClick={() => remove(index)}
                      className="text-red-500 hover:text-red-700 p-2 rounded-lg hover:bg-red-50 transition-colors"
                      title="Remove branch"
                    >
                      <IoTrash className="w-4 h-4" />
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => append({ branch_id: 0, is_active: false })}
                  className="text-blue-500 hover:text-blue-700 text-xs"
                >
                  + Add Branch
                </button>
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
    </>
  );
}
