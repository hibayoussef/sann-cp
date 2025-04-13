import Switch from "@/components/form/switch/Switch";
import { productSchema } from "@/components/lib/validations/product";
import { CustomSelect } from "@/components/ui/select/customSelect";
import { useFetchBrands } from "@/hooks/prouducts/useBrands";
import { useFetchCategories } from "@/hooks/prouducts/useCategories";
import {
  useAddProduct,
  useFetchProduct,
  useUpdateProduct,
} from "@/hooks/prouducts/useProducts";
import { useFetchSubCategoryById } from "@/hooks/prouducts/useSubCategories";
import { useFetchSubUnitsById } from "@/hooks/prouducts/useSubUnits";
import { useFetchTaxes } from "@/hooks/prouducts/useTaxes";
import { useFetchUnits } from "@/hooks/prouducts/useUnits";
import { useFetchWarranties } from "@/hooks/prouducts/useWarranties";
import { useFetchAccounts } from "@/hooks/settings/useAccounts";
import { useFetchBranches } from "@/hooks/settings/useBranches";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Box,
  Calendar,
  GitBranch,
  Info,
  Layers,
  Package,
  Settings,
  Tag,
  Wallet,
} from "lucide-react";
import { useEffect, useState } from "react";
import { FormProvider, useFieldArray, useForm } from "react-hook-form";
import { FaMoneyBill } from "react-icons/fa";
import { IoAdd, IoColorPalette, IoTrash } from "react-icons/io5";
import { useParams } from "react-router-dom";
import ComponentCard from "../../../components/common/ComponentCard";
import PageBreadcrumb from "../../../components/common/PageBreadCrumb";
import Input from "../../../components/form/input/InputField";
import Label from "../../../components/form/Label";
import { useMeStore } from "../../../store/useMeStore";
import Select from 'react-select';

interface ProductType {
  for_selling: number;
  type: "Goods" | "Service" | "Landing Cost";
  product_name_ar: string;
  product_name_en: string;
  sku: string;
  color: string;
  tax_id: number | null;
  brand_id: number | null;
  category_id: number;
  sub_category_id: number | null;
  unit_id: number;
  sub_unit_id: number | null;
  sub_units: {id: number}[];
  warranty_id: number | null;
  alert_quantity: number;
  description: string;
  branches: { branch_id: number; is_active: boolean }[];
  expiry_date?: string;
  sale_account: number;
  purchase_account: number;
  sale_return_account: number;
  purchase_return_account: number;
  purchase_price: number;
  sale_price: number;
  is_active: number;
  default_sale_unit: number;
  default_purchase_unit: number;
}

export default function ProductForm() {
  const { id } = useParams();
  const isUpdate = Boolean(id);
  const addProduct = useAddProduct();
  const updateProduct = useUpdateProduct();
  const organizationId = useMeStore((state) => state.organizationId);
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);
  
  const { data: productData, isLoading } = useFetchProduct(Number(id), {
    enabled: isUpdate,
  });
  const { data: accounts } = useFetchAccounts();
  const { data: taxes } = useFetchTaxes();
  const { data: categories } = useFetchCategories();
  const { data: subCategories, isLoading: subCategoriesLoading } =
    useFetchSubCategoryById(selectedCategoryId);
  const { data: warranties } = useFetchWarranties();
  const { data: brands } = useFetchBrands();
  const { data: units } = useFetchUnits();
  const { data: branches } = useFetchBranches();

  const methods = useForm<ProductType>({
    resolver: zodResolver(productSchema) as any,
    defaultValues: {
      for_selling: 1,
      type: "Goods",
      product_name_en: productData?.product_name_en ?? "",
      product_name_ar: productData?.product_name_ar ?? "",
      sku: productData?.sku ?? "",
      color: productData?.color ?? "",
      tax_id: productData?.tax_id ?? null,
      brand_id: productData?.brand_id ?? null,
      category_id: productData?.category_id ?? 0,
      sub_category_id: productData?.sub_category_id ?? null,
      warranty_id: productData?.warranty_id ?? null,
      unit_id: productData?.unit_id ?? 0,
      alert_quantity: productData?.alert_quantity ?? 1,
      description: "",
      sub_unit_id: null,
      sale_account: productData?.sale_account ?? 0,
      purchase_account: productData?.purchase_account ?? 0,
      sale_return_account: productData?.sale_return_account ?? 0,
      purchase_return_account: productData?.purchase_return_account ?? 0,
      purchase_price: productData?.purchase_price ?? 0,
      sale_price: productData?.sale_price ?? 0,
      expiry_date: productData?.expiry_date ?? "",
      is_active: isUpdate ? productData?.is_active ?? 0 : 0,
      branches: productData?.branches?.length
        ? productData.branches.map(b => ({
            branch_id: Number(b.branch_id),
            is_active: Boolean(b.is_active)
          }))
        : [{ branch_id: 0, is_active: true }],
      default_sale_unit: productData?.default_sale_unit ?? 0,
      default_purchase_unit: productData?.default_purchase_unit ?? 0,
      sub_units: productData?.sub_units?.map(su => ({ id: Number(su.id) })) || [],
    },
  });

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    control,
    formState: { errors, isSubmitting },
    trigger,
  } = methods;

  const { fields, append, remove } = useFieldArray({
    control,
    name: "branches",
  });

  const selectedUnitId = watch("unit_id");

  const {
    data: subunits,
    isLoading: subunitsLoading,
    error: subunitsError,
  } = useFetchSubUnitsById(selectedUnitId);

  const selectedUnit = units?.find((unit) => unit.id === Number(selectedUnitId));
  const selectedSubUnit = subunits?.data?.find(
    (subunit) => subunit.id === Number(watch("sub_unit_id"))
  );

  useEffect(() => {
    if (productData) {
      setValue(
        "sub_units",
        productData?.sub_units?.map((su) => ({ id: Number(su.id) })) || []
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
      setValue("color", productData.color ?? "blue");
      setValue("type", productData.type ?? "Goods");
      setValue("purchase_price", Number(productData.purchase_price) ?? 0);
      setValue("sale_price", Number(productData.sale_price) ?? 0);
      setValue("expiry_date", productData.expiry_date?.split("T")[0] ?? "");
      setValue("alert_quantity", productData.alert_quantity ?? 1);
      setValue("sale_account", productData.sale_account ?? 0);
      setValue("purchase_account", productData.purchase_account ?? 0);
      setValue("sale_return_account", productData.sale_return_account ?? 0);
      setValue(
        "purchase_return_account",
        productData.purchase_return_account ?? 0
      );
      setValue("tax_id", productData.tax_id ?? null);
      setValue("brand_id", productData.brand_id ?? null);
      setValue("category_id", productData.category_id ?? 0);
      setValue("sub_category_id", productData.sub_category_id ?? 0);
      setValue("unit_id", productData.unit_id ?? 0);
      setValue("warranty_id", productData.warranty_id ?? null);
      setValue(
        "sub_units",
        productData?.sub_units?.map((su) => ({ id: Number(su.id) })) || []
      );
      setValue("is_active", productData?.is_active);
      setValue("for_selling", productData.for_selling ?? 1);
      setValue(
        "branches",
        productData.branches?.map((b) => ({
          branch_id: b.branch_id,
          is_active: Boolean(b.is_active),
        })) || [{ branch_id: 0, is_active: true }]
      );
      setValue("default_sale_unit", productData.default_sale_unit ?? 0);
      setValue("default_purchase_unit", productData.default_purchase_unit ?? 0);
    }
  }, [productData, setValue]);

  useEffect(() => {
    if (selectedUnitId && subunits?.data) {
      setValue(
        "sub_units",
        subunits.data.map((subunit) => ({ id: subunit.id }))
      );
    }
  }, [subunits?.data, setValue]);

  const [categoryOptions, setCategoryOptions] = useState<Array<{ value: string; label: string }>>([]);
  const [subCategoryOptions, setSubCategoryOptions] = useState<Array<{ value: string; label: string }>>([]);
  const [warrantyOptions, setWarrantyOptions] = useState<Array<{ value: string; label: string }>>([]);
  const [brandOptions, setBrandOptions] = useState<Array<{ value: string; label: string }>>([]);
  const [unitOptions, setUnitOptions] = useState<Array<{ value: string; label: string }>>([]);
  const [taxOptions, setTaxOptions] = useState<Array<{ value: string; label: string }>>([]);
  const [accountOptions, setAccountOptions] = useState<Array<{ value: string; label: string }>>([]);
  const [branchOptions, setBranchOptions] = useState<Array<{ value: string; label: string }>>([]);
  const [subUnitOptions, setSubUnitOptions] = useState<Array<{ value: string; label: string }>>([]);

  useEffect(() => {
    if (categories) {
      setCategoryOptions(
        categories.map((category) => ({
          value: (category.id || "").toString(),
          label: category.category_name_en || "",
        }))
      );
    }
  }, [categories]);

  useEffect(() => {
    if (subCategories?.data) {
      setSubCategoryOptions(
        subCategories.data.map((subCategory) => ({
          value: (subCategory.id || "").toString(),
          label: subCategory.sub_category_name_en || "",
        }))
      );
    }
  }, [subCategories]);

  useEffect(() => {
    if (warranties) {
      setWarrantyOptions(
        warranties.map((warranty) => ({
          value: (warranty.id || "").toString(),
          label: warranty.warranty_name_en || "",
        }))
      );
    }
  }, [warranties]);

  useEffect(() => {
    if (brands) {
      setBrandOptions(
        brands.map((brand) => ({
          value: (brand.id || "").toString(),
          label: brand.brand_name_en || "",
        }))
      );
    }
  }, [brands]);

  useEffect(() => {
    if (units) {
      setUnitOptions(
        units.map((unit) => ({
          value: (unit.id || "").toString(),
          label: unit.unit_name_en || "",
        }))
      );
    }
  }, [units]);

  useEffect(() => {
    if (taxes) {
      setTaxOptions(
        taxes.map((tax) => ({
          value: (tax.id || "").toString(),
          label: `${tax.tax_name_en || ""} (${tax.amount || 0}%)`,
        }))
      );
    }
  }, [taxes]);

  useEffect(() => {
    if (accounts) {
      setAccountOptions(
        accounts.map((account) => ({
          value: (account.id || "").toString(),
          label: account.account_name_en || "",
        }))
      );
    }
  }, [accounts]);

  useEffect(() => {
    if (branches) {
      setBranchOptions(
        branches.map((branch) => ({
          value: (branch.id || "").toString(),
          label: branch.branch_name_en || "",
        }))
      );
    }
  }, [branches]);

  useEffect(() => {
    if (subunits?.data) {
      setSubUnitOptions(
        subunits.data.map((subunit) => ({
          value: (subunit.id || "").toString(),
          label: `${subunit.unit_name_en || ""} (${subunit.conversion_factor || 0} per main unit)`,
        }))
      );
    }
  }, [subunits]);

  const handleSelectChange = async (name: keyof ProductType, value: string | number) => {
    const numericFields: (keyof ProductType)[] = [
      "category_id",
      "unit_id",
      "sub_unit_id",
      "brand_id",
      "tax_id",
      "warranty_id",
      "sale_account",
      "purchase_account",
      "sale_return_account",
      "purchase_return_account",
      "default_sale_unit",
      "default_purchase_unit"
    ];

    const numericValue = Number(value);
    if (numericFields.includes(name) && !isNaN(numericValue)) {
      setValue(name, numericValue, { shouldValidate: true });
    } else {
      setValue(name, value, { shouldValidate: true });
    }
    await trigger(name);
  };

  const handleBranchChange = (index: number, value: string) => {
    const branchId = Number(value);
    if (!isNaN(branchId)) {
      setValue(`branches.${index}.branch_id`, branchId, { shouldValidate: true });
      trigger(`branches.${index}.branch_id`);
    }
  };

  const defaultUnitOptions = selectedUnit ? [
    { 
      value: selectedUnit.id?.toString() || "", 
      label: `${selectedUnit.unit_name_en || ""} (Main)` 
    }
  ] : [];

  const onSubmit = async (formData: any) => {
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
      ...(isUpdate && id ? { _method: "PUT" } : {}),
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

  return (
    <>
      <PageBreadcrumb
        baseLink="/products"
        baseTitle="Product"
        pageTitle={isUpdate ? "Update Product" : "Create Product"}
        icon={
          <div className="w-6 h-6 flex items-center justify-center dark:bg-gray-800 bg-gray-200 rounded-full">
            <IoAdd className="w-5 h-5" />
          </div>
        }
      />
      {isUpdate && isLoading ? (
        <p>Loading product data...</p>
      ) : (
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                  <div>
                    <Label htmlFor="type">Product Type*</Label>
                    <CustomSelect
                      name="type"
                      options={[
                        { value: "Goods", label: "Goods" },
                        { value: "Service", label: "Service" },
                        { value: "Landing Cost", label: "Landing Cost" },
                      ]}
                      placeholder="Select Type"
                      error={errors.type?.message}
                      onChange={(value) => handleSelectChange("type", value)}
                      isRequired={true}
                      icon={<Package className="w-4 h-4" />}
                    />
                  </div>
                </div>
              </ComponentCard>

              <ComponentCard
                title="General Settings"
                icon={<Settings className="text-gray-500 w-5 h-5" />}
                className="bg-gray-50 rounded-xl"
              >
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col gap-2">
                    <Label
                      htmlFor="for_selling"
                      className="text-[14px] font-medium text-gray-700"
                    >
                      Product Availability
                    </Label>
                    <div className="flex items-center gap-3 p-3 bg-white rounded-lg border border-gray-200">
                      <div className="pr-3 border-r border-gray-200">
                        <Switch
                          label="Available for Selling"
                          defaultChecked={watch("for_selling") === 1}
                          onChange={(checked) =>
                            setValue("for_selling", checked ? 1 : 0)
                          }
                        />
                      </div>
                      <div className="flex-1 pl-3">
                        <p className="text-sm font-medium">Available for Selling</p>
                        <p className="text-xs text-gray-500">
                          Enable to list product in sales channels
                        </p>
                      </div>
                    </div>
                    {errors.for_selling && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.for_selling.message}
                      </p>
                    )}
                  </div>

                  <div className="flex flex-col gap-2">
                    <Label
                      htmlFor="is_active"
                      className="text-[14px] font-medium text-gray-700"
                    >
                      Product Status
                    </Label>
                    <div className="flex items-center gap-3 p-3 bg-white rounded-lg border border-gray-200">
                      <div className="pr-3 border-r border-gray-200">
                        <Switch
                          label="Active Status"
                          defaultChecked={watch("is_active") === 1}
                          onChange={(checked) =>
                            setValue("is_active", checked ? 1 : 0)
                          }
                        />
                      </div>
                      <div className="flex-1 pl-3">
                        <p className="text-sm font-medium">Active Status</p>
                        <p className="text-xs text-gray-500">
                          Enable to make product visible in system
                        </p>
                      </div>
                    </div>
                    {errors.is_active && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.is_active.message}
                      </p>
                    )}
                  </div>
                </div>
              </ComponentCard>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ComponentCard
                title="Classification"
                icon={<Tag className="text-red-500 w-5 h-5" />}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="category_id">Category</Label>
                    <CustomSelect
                      name="category_id"
                      options={categoryOptions}
                      placeholder="Select Category"
                      error={errors.category_id?.message}
                      onChange={(value) => {
                        const categoryId = Number(value);
                        if (!isNaN(categoryId)) {
                          handleSelectChange("category_id", categoryId);
                          setSelectedCategoryId(categoryId);
                          setValue("sub_category_id", null);
                        }
                      }}
                      isRequired={true}
                      icon={<Tag className="w-4 h-4" />}
                    />
                  </div>

                  {selectedCategoryId && (
                    <div>
                      <Label htmlFor="sub_category_id">Sub Category</Label>
                      {subCategoriesLoading ? (
                        <p>Loading subcategories...</p>
                      ) : (
                        <CustomSelect
                          name="sub_category_id"
                          options={subCategoryOptions}
                          placeholder="Select Sub Category"
                          error={errors.sub_category_id?.message}
                          onChange={(value) => handleSelectChange("sub_category_id", value)}
                          isRequired={true}
                          icon={<Tag className="w-4 h-4" />}
                        />
                      )}
                    </div>
                  )}

                  <div>
                    <Label htmlFor="warranty_id">Warranty</Label>
                    <CustomSelect
                      name="warranty_id"
                      options={warrantyOptions}
                      placeholder="Select Warranty"
                      error={errors.warranty_id?.message}
                      onChange={(value) => handleSelectChange("warranty_id", value)}
                      icon={<Calendar className="w-4 h-4" />}
                    />
                  </div>

                  <div>
                    <Label htmlFor="brand_id">Brand</Label>
                    <CustomSelect
                      name="brand_id"
                      options={brandOptions}
                      placeholder="Select Brand"
                      error={errors.brand_id?.message}
                      onChange={(value) => handleSelectChange("brand_id", value)}
                      icon={<Tag className="w-4 h-4" />}
                    />
                  </div>

                  <div>
                    <Label htmlFor="tax_id">Tax</Label>
                    <CustomSelect
                      name="tax_id"
                      options={taxOptions}
                      placeholder="Select Tax"
                      error={errors.tax_id?.message}
                      onChange={(value) => handleSelectChange("tax_id", value)}
                      icon={<Wallet className="w-4 h-4" />}
                    />
                  </div>
                </div>
              </ComponentCard>
              <ComponentCard
                title="Pricing & Accounts"
                icon={<Wallet className="text-purple-500 w-5 h-5" />}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                    <Label htmlFor="sale_account">Sale Account*</Label>
                    <CustomSelect
                      name="sale_account"
                      options={accountOptions}
                      placeholder="Select Sale Account"
                      error={errors.sale_account?.message}
                      onChange={(value) => handleSelectChange("sale_account", value)}
                      isRequired={true}
                      icon={<Wallet className="w-4 h-4" />}
                    />
                  </div>

                  <div>
                    <Label htmlFor="purchase_account">Purchase Account*</Label>
                    <CustomSelect
                      name="purchase_account"
                      options={accountOptions}
                      placeholder="Select Purchase Account"
                      error={errors.purchase_account?.message}
                      onChange={(value) => handleSelectChange("purchase_account", value)}
                      isRequired={true}
                      icon={<Wallet className="w-4 h-4" />}
                    />
                  </div>

                  <div>
                    <Label htmlFor="sale_return_account">Sale Return Account*</Label>
                    <CustomSelect
                      name="sale_return_account"
                      options={accountOptions}
                      placeholder="Select Sale Return Account"
                      error={errors.sale_return_account?.message}
                      onChange={(value) => handleSelectChange("sale_return_account", value)}
                      isRequired={true}
                      icon={<Wallet className="w-4 h-4" />}
                    />
                  </div>

                  <div>
                    <Label htmlFor="purchase_return_account">Purchase Return Account*</Label>
                    <CustomSelect
                      name="purchase_return_account"
                      options={accountOptions}
                      placeholder="Select Purchase Return Account"
                      error={errors.purchase_return_account?.message}
                      onChange={(value) => handleSelectChange("purchase_return_account", value)}
                      isRequired={true}
                      icon={<Wallet className="w-4 h-4" />}
                    />
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
                  <div>
                    <Label htmlFor="unit_id">Main Unit*</Label>
                    <CustomSelect
                      name="unit_id"
                      options={unitOptions}
                      placeholder="Select Main Unit"
                      error={errors.unit_id?.message}
                      onChange={(value) => handleSelectChange("unit_id", value)}
                      isRequired={true}
                      icon={<Layers className="w-4 h-4" />}
                    />
                  </div>

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
                        subunits?.data && subunits.data.length > 0 && (
                          <div>
                            <Label htmlFor="sub_units">Available Sub Units</Label>
                            <Select
                              isMulti
                              options={subUnitOptions}
                              value={watch("sub_units")?.map(su => ({
                                value: su.id.toString(),
                                label: subUnitOptions.find(opt => opt.value === su.id.toString())?.label || ''
                              }))}
                              onChange={(selectedOptions) => {
                                const selectedValues = selectedOptions.map(option => ({
                                  id: Number(option.value)
                                }));
                                setValue("sub_units", selectedValues);
                              }}
                              className="basic-multi-select"
                              classNamePrefix="select"
                            />
                            {errors.sub_units && (
                              <p className="text-red-500 text-xs mt-1">{errors.sub_units.message}</p>
                            )}
                          </div>
                        )
                      )}

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="default_sale_unit">Default Sale Unit*</Label>
                          <CustomSelect
                            name="default_sale_unit"
                            options={[
                              ...defaultUnitOptions,
                              ...subUnitOptions
                            ]}
                            placeholder="Select Default Sale Unit"
                            error={errors.default_sale_unit?.message}
                            onChange={(value) => handleSelectChange("default_sale_unit", value)}
                            isRequired={true}
                            icon={<Layers className="w-4 h-4" />}
                          />
                        </div>

                        <div>
                          <Label htmlFor="default_purchase_unit">Default Purchase Unit*</Label>
                          <CustomSelect
                            name="default_purchase_unit"
                            options={[
                              ...defaultUnitOptions,
                              ...subUnitOptions
                            ]}
                            placeholder="Select Default Purchase Unit"
                            error={errors.default_purchase_unit?.message}
                            onChange={(value) => handleSelectChange("default_purchase_unit", value)}
                            isRequired={true}
                            icon={<Layers className="w-4 h-4" />}
                          />
                        </div>
                      </div>
                    </>
                  )}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="alert_quantity">Alert Quantity</Label>
                      <Input
                        type="number"
                        id="alert_quantity"
                        placeholder="Enter alert quantity"
                        {...register("alert_quantity", {
                          valueAsNumber: true,
                        })}
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
                </div>
              </ComponentCard>

              {/* Branch & Status Section */}
              <ComponentCard title="Branch Management" icon={<GitBranch />}>
                <div className="space-y-4">
                  {fields.map((field, index) => (
                    <div key={field.id} className="flex gap-4 items-end">
                      <div className="flex-1">
                        <Label>Branch</Label>
                        <CustomSelect
                          name={`branches.${index}.branch_id`}
                          options={branchOptions}
                          placeholder="Select Branch"
                          error={errors.branches?.[index]?.branch_id?.message}
                          onChange={(value) => handleBranchChange(index, value)}
                          icon={<GitBranch className="w-4 h-4" />}
                        />
                      </div>

                      <div className="flex items-center gap-2 mb-2">
                        <Label>Active</Label>
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

            {selectedUnit && (
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500">
                  Main Unit: {selectedUnit.unit_name_en || ""}
                </span>
                {selectedSubUnit && (
                  <span className="text-sm text-gray-500">
                    Sub Unit: {selectedSubUnit.unit_name_en || ""} ({selectedSubUnit.conversion_factor || 0} per main unit)
                  </span>
                )}
              </div>
            )}

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
        </FormProvider>
      )}
    </>
  );
}