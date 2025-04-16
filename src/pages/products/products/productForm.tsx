import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useMemo, useState } from "react";
import { FormProvider, useFieldArray, useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import Select from "react-select";

// Icons
import {
  Box,
  Calendar,
  FolderTree,
  GitBranch,
  Layers,
  Package,
  Settings,
  ShieldCheck,
  Tag,
  Tags,
  Type,
  Wallet,
  Wallet2
} from "lucide-react";
import { FaMoneyBill } from "react-icons/fa";
import { IoAdd, IoColorPalette, IoTrash } from "react-icons/io5";

// Components
import Input from "@/components/form/input/InputField";
import Label from "@/components/form/Label";
import Switch from "@/components/form/switch/Switch";
import { CustomSelect } from "@/components/ui/select/customSelect";
import ComponentCard from "../../../components/common/ComponentCard";
import PageBreadcrumb from "../../../components/common/PageBreadCrumb";

// Hooks and Schemas
import { productSchema } from "@/components/lib/validations/product";
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
import { useMeStore } from "../../../store/useMeStore";

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
  sub_units: { id: number }[];
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
  const organizationId = useMeStore((state) => state.organizationId);

  // States
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(
    null
  );
  const [shouldLoadSubUnits, setShouldLoadSubUnits] = useState(false);

  // Data Hooks
  const { data: productData, isLoading } = useFetchProduct(Number(id), {
    enabled: isUpdate,
  });
  const addProduct = useAddProduct();
  const updateProduct = useUpdateProduct();

  const { data: accounts } = useFetchAccounts();
  const { data: taxes } = useFetchTaxes();
  const { data: categories } = useFetchCategories();
  const { data: subCategories, isLoading: subCategoriesLoading } =
    useFetchSubCategoryById(selectedCategoryId);
  const { data: warranties } = useFetchWarranties();
  const { data: brands } = useFetchBrands();
  const { data: units } = useFetchUnits();
  const { data: branches } = useFetchBranches();

  // Form Setup
  const methods = useForm<ProductType>({
    resolver: zodResolver(productSchema) as any,
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
      description: "",
      sub_unit_id: null,
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

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    control,
    formState: { errors, isSubmitting },
    trigger,
    reset,
  } = methods;

  const { fields, append, remove } = useFieldArray({
    control,
    name: "branches",
  });

  const { data: subunits, isLoading: subunitsLoading } = useFetchSubUnitsById(
    watch("unit_id"),
    { enabled: shouldLoadSubUnits || !!watch("unit_id") }
  );
  
  // Watched Values
  const selectedUnitId = watch("unit_id");
  // const selectedSubCategoryId = watch("sub_category_id");
  const watchedBranches = watch("branches");
  const watchedSubUnits = watch("sub_units");

  // Memoized Options
  const categoryOptions = useMemo(
    () =>
      categories?.map((c) => ({
        value: c?.id?.toString(),
        label: c.category_name_en,
      })) || [],
    [categories]
  );

  const subCategoryOptions = useMemo(
    () =>
      subCategories?.data?.map((sc) => ({
        value: sc.id.toString(),
        label: sc.sub_category_name_en,
      })) || [],
    [subCategories]
  );

  const warrantyOptions = useMemo(
    () =>
      warranties?.map((w) => ({
        value: w.id.toString(),
        label: w.warranty_name_en,
      })) || [],
    [warranties]
  );

  const brandOptions = useMemo(
    () =>
      brands?.map((b) => ({
        value: b.id.toString(),
        label: b.brand_name_en,
      })) || [],
    [brands]
  );

  const unitOptions = useMemo(
    () =>
      units?.map((u) => ({
        value: u?.id?.toString(),
        label: u.unit_name_en,
      })) || [],
    [units]
  );

  const taxOptions = useMemo(
    () =>
      taxes?.map((t) => ({
        value: t.id.toString(),
        label: `${t.tax_name_en} (${t.amount}%)`,
      })) || [],
    [taxes]
  );

  const accountOptions = useMemo(
    () =>
      accounts?.map((a) => ({
        value: a.id.toString(),
        label: a.account_name_en,
      })) || [],
    [accounts]
  );

  const branchOptions = useMemo(
    () =>
      branches?.map((b) => ({
        value: b.id.toString(),
        label: b.branch_name_en,
      })) || [],
    [branches]
  );

  const subUnitOptions = useMemo(
    () =>
      subunits?.data?.map((su) => ({
        value: su.id.toString(),
        label: `${su.unit_name_en} (${su.conversion_factor} per main unit)`,
      })) || [],
    [subunits]
  );

  const defaultUnitOptions = useMemo(() => {
    if (!selectedUnitId) return [];

    const mainUnit = units?.find((u) => u.id === selectedUnitId);
    const mainUnitOption = {
      value: selectedUnitId.toString(),
      label: `${mainUnit?.unit_name_en} (Main)`,
    };

    const subUnitOptionsList = (watchedSubUnits || []).map((su) => ({
      value: su.id.toString(),
      label:
        subUnitOptions.find((opt) => opt.value === su.id.toString())?.label ||
        "",
    }));

    return [mainUnitOption, ...subUnitOptionsList];
  }, [selectedUnitId, watchedSubUnits, subUnitOptions, units]);

  // Handlers
  const handleUnitChange = (value: string) => {
    const unitId = Number(value);
    if (!isNaN(unitId)) {
      setValue("unit_id", unitId);
      setShouldLoadSubUnits(true);
      setValue("sub_units", []);
      setValue("default_sale_unit", unitId);
      setValue("default_purchase_unit", unitId);

      if (productData?.sub_units && isUpdate) {
        setValue(
          "sub_units",
          productData.sub_units.map((su) => ({ id: Number(su.id) }))
        );
      }
    }
  };

  const updateDefaultUnits = (selectedSubUnits: { id: number }[]) => {
    const currentSaleUnit = watch("default_sale_unit");
    const currentPurchaseUnit = watch("default_purchase_unit");
    const mainUnitId = watch("unit_id");

    if (
      !selectedSubUnits.some((su) => su.id === currentSaleUnit) &&
      currentSaleUnit !== mainUnitId
    ) {
      setValue("default_sale_unit", mainUnitId);
    }

    if (
      !selectedSubUnits.some((su) => su.id === currentPurchaseUnit) &&
      currentPurchaseUnit !== mainUnitId
    ) {
      setValue("default_purchase_unit", mainUnitId);
    }
  };

  // Effects
  useEffect(() => {
    if (!productData) return;

    const defaultValues: any = {
      product_name_en: productData.product_name_en || "",
      product_name_ar: productData.product_name_ar || "",
      sku: productData.sku || "",
      color: productData.color || "",
      type: productData.type || "Goods",
      purchase_price: Number(productData.purchase_price) || 0,
      sale_price: Number(productData.sale_price) || 0,
      expiry_date: productData.expiry_date?.split("T")[0] || "",
      alert_quantity: productData.alert_quantity || 1,
      sale_account: productData.sale_account || 0,
      purchase_account: productData.purchase_account || 0,
      sale_return_account: productData.sale_return_account || 0,
      purchase_return_account: productData.purchase_return_account || 0,
      tax_id: productData.tax_id || null,
      brand_id: productData.brand_id || null,
      category_id: productData.category_id || 0,
      sub_category_id: productData.sub_category_id || null,
      unit_id: productData.unit_id || 0,
      warranty_id: productData.warranty_id || null,
      sub_units: productData.sub_units?.map((su) => ({ id: su.id })) || [],
      is_active: Number(productData.is_active) === 1 ? 1 : 0,
      for_selling: Number(productData.for_selling) === 1 ? 1 : 0,
      branches: productData.branches?.map((b) => ({
        branch_id: b.branch_id,
        is_active: Boolean(b.is_active),
      })) || [{ branch_id: 0, is_active: true }],
      default_sale_unit:
        productData.default_sale_unit || productData.unit_id || 0,
      default_purchase_unit:
        productData.default_purchase_unit || productData.unit_id || 0,
    };

    reset(defaultValues);

    // Set the selected category ID to trigger subcategory loading
    if (productData.category_id) {
      setSelectedCategoryId(productData.category_id);
    }

    if (productData.unit_id) {
      setShouldLoadSubUnits(true);
    }
  }, [productData, reset]);

  const onSubmit = async (formData: ProductType) => {
    const payload: any = {
      ...formData,
      organization_id: organizationId,
      branches: formData.branches.map((b) => ({
        branch_id: Number(b.branch_id),
        is_active: b.is_active ? 1 : 0,
      })),
      sub_units: formData.sub_units.map((su) => ({
        id: Number(su.id),
      })),
      is_active: formData.is_active ? 1 : 0,
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

  // Branch Management
  const remainingBranches = branches?.filter(
    (branch) => !watchedBranches?.map((b) => b.branch_id).includes(branch.id)
  );
  const canAddBranch = remainingBranches && remainingBranches.length > 0;

  const handleBranchChange = (index: number, value: string) => {
    const branchId = Number(value);
    if (!isNaN(branchId)) {
      setValue(`branches.${index}.branch_id`, branchId, {
        shouldValidate: true,
      });
      trigger(`branches.${index}.branch_id`);
    }
  };

  if (isUpdate && isLoading) {
    return <p>Loading product data...</p>;
  }

  const formatDateForInput = (dateString: string | null | undefined) => {
    if (!dateString || dateString === "null" || dateString === "undefined")
      return "";
    try {
      const date = new Date(dateString);
      return isNaN(date.getTime()) ? "" : date.toISOString().split("T")[0];
    } catch {
      return "";
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

      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Basic Information Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <ComponentCard
              title="Basic Information"
              icon={<Package className="text-blue-500 w-5 h-5" />}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="product_name_en">Name (En)</Label>
                  <Input
                    type="text"
                    id="product_name_en"
                    {...register("product_name_en")}
                    placeholder="Product name (English)"
                    error={!!errors.product_name_en}
                    hint={errors.product_name_en?.message}
                    icon={<Type className="w-4 h-4" />}
                  />
                </div>
                <div>
                  <Label htmlFor="product_name_ar">Name (Ar)</Label>
                  <Input
                    type="text"
                    id="product_name_ar"
                    {...register("product_name_ar")}
                    placeholder="Product name (Arabic)"
                    error={!!errors.product_name_ar}
                    hint={errors.product_name_ar?.message}
                    icon={<Type className="w-4 h-4" />}
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
                    onChange={(value) => setValue("type", value as any)}
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
                {/* Product Availability */}
                <div className="flex flex-col gap-2">
                  <Label className="text-[14px] font-medium text-gray-700">
                    Product Availability
                  </Label>
                  <div className="flex items-center gap-3 p-3 bg-white rounded-lg border border-gray-200">
                    <div className="pr-3 border-r border-gray-200">
                      <Switch
                        label="Available for Selling"
                        defaultChecked={
                          productData?.for_selling === 1 ||
                          watch("for_selling") === 1
                        }
                        onChange={(checked) => {
                          const value = checked ? 1 : 0;
                          setValue("for_selling", value, {
                            shouldValidate: true,
                          });
                        }}
                      />
                    </div>
                    <div className="flex-1 pl-3">
                      <p className="text-sm font-medium">
                        Available for Selling
                      </p>
                      <p className="text-xs text-gray-500">
                        Enable to list product in sales channels
                      </p>
                    </div>
                  </div>
                </div>

                {/* Product Status */}
                <div className="flex flex-col gap-2">
                  <Label className="text-[14px] font-medium text-gray-700">
                    Product Status
                  </Label>
                  <div className="flex items-center gap-3 p-3 bg-white rounded-lg border border-gray-200">
                    <div className="pr-3 border-r border-gray-200">
                      <Switch
                        label="Active Status"
                        defaultChecked={
                          productData?.is_active === 1 ||
                          watch("is_active") === 1
                        }
                        onChange={(checked) => {
                          const value = checked ? 1 : 0;
                          setValue("is_active", value, {
                            shouldValidate: true,
                          });
                        }}
                      />
                    </div>
                    <div className="flex-1 pl-3">
                      <p className="text-sm font-medium">Active Status</p>
                      <p className="text-xs text-gray-500">
                        Enable to make product visible in system
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </ComponentCard>
          </div>

          {/* Classification and Pricing Sections */}
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
                      setSelectedCategoryId(categoryId);
                      setValue("category_id", categoryId);
                      setValue("sub_category_id", null);
                    }}
                    isRequired={true}
                    icon={<FolderTree className="w-4 h-4" />}
                  />
                </div>

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
                      onChange={(value) =>
                        setValue("sub_category_id", Number(value))
                      }
                      value={watch("sub_category_id")?.toString()}
                      isRequired={true}
                      icon={<Tag className="w-4 h-4" />}
                    />
                  )}
                </div>

                <div>
                  <Label htmlFor="warranty_id">Warranty</Label>
                  <CustomSelect
                    name="warranty_id"
                    options={warrantyOptions}
                    placeholder="Select Warranty"
                    error={errors.warranty_id?.message}
                    onChange={(value) => setValue("warranty_id", Number(value))}
                    icon={<ShieldCheck className="w-4 h-4" />}
                  />
                </div>

                <div>
                  <Label htmlFor="brand_id">Brand</Label>
                  <CustomSelect
                    name="brand_id"
                    options={brandOptions}
                    placeholder="Select Brand"
                    error={errors.brand_id?.message}
                    onChange={(value) => setValue("brand_id", Number(value))}
                    icon={<Tags className="w-4 h-4" />}
                  />
                </div>

                <div>
                  <Label htmlFor="tax_id">Tax</Label>
                  <CustomSelect
                    name="tax_id"
                    options={taxOptions}
                    placeholder="Select Tax"
                    error={errors.tax_id?.message}
                    onChange={(value) => setValue("tax_id", Number(value))}
                    icon={<Wallet2 className="w-4 h-4" />}
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
                    placeholder="Purchase price"
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
                    placeholder="Sale price"
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
                    onChange={(value) =>
                      setValue("sale_account", Number(value))
                    }
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
                    onChange={(value) =>
                      setValue("purchase_account", Number(value))
                    }
                    isRequired={true}
                    icon={<Wallet className="w-4 h-4" />}
                  />
                </div>

                <div>
                  <Label htmlFor="sale_return_account">
                    Sale Return Account*
                  </Label>
                  <CustomSelect
                    name="sale_return_account"
                    options={accountOptions}
                    placeholder="Select Sale Return Account"
                    error={errors.sale_return_account?.message}
                    onChange={(value) =>
                      setValue("sale_return_account", Number(value))
                    }
                    isRequired={true}
                    icon={<Wallet className="w-4 h-4" />}
                  />
                </div>

                <div>
                  <Label htmlFor="purchase_return_account">
                    Purchase Return Account*
                  </Label>
                  <CustomSelect
                    name="purchase_return_account"
                    options={accountOptions}
                    placeholder="Select Purchase Return Account"
                    error={errors.purchase_return_account?.message}
                    onChange={(value) =>
                      setValue("purchase_return_account", Number(value))
                    }
                    isRequired={true}
                    icon={<Wallet className="w-4 h-4" />}
                  />
                </div>
              </div>
            </ComponentCard>
          </div>

          {/* Units and Branch Management */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Units Management Section */}
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
                    onChange={handleUnitChange}
                    value={watch("unit_id")?.toString()}
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
                    ) : (
                      subunits?.data &&
                      subunits.data.length > 0 && (
                        <div>
                          <Label htmlFor="sub_units">Available Sub Units</Label>
                          <Select
                            isMulti
                            options={subUnitOptions}
                            value={watchedSubUnits?.map((su) => ({
                              value: su?.id.toString(),
                              label:
                                subUnitOptions.find(
                                  (opt) => opt?.value === su?.id.toString()
                                )?.label || "",
                            }))}
                            onChange={(selectedOptions) => {
                              const selectedValues = selectedOptions.map(
                                (option) => ({
                                  id: Number(option.value),
                                })
                              );
                              setValue("sub_units", selectedValues);
                              updateDefaultUnits(selectedValues);
                            }}
                            className="basic-multi-select"
                            classNamePrefix="select"
                          />
                          {errors.sub_units && (
                            <p className="text-red-500 text-xs mt-1">
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
                        <CustomSelect
                          name="default_sale_unit"
                          options={defaultUnitOptions}
                          placeholder="Select Default Sale Unit"
                          error={errors.default_sale_unit?.message}
                          onChange={(value) =>
                            setValue("default_sale_unit", Number(value))
                          }
                          value={watch("default_sale_unit")?.toString()}
                          isRequired={true}
                          icon={<Layers className="w-4 h-4" />}
                        />
                      </div>

                      <div>
                        <Label htmlFor="default_purchase_unit">
                          Default Purchase Unit*
                        </Label>
                        <CustomSelect
                          name="default_purchase_unit"
                          options={defaultUnitOptions}
                          placeholder="Select Default Purchase Unit"
                          error={errors.default_purchase_unit?.message}
                          onChange={(value) =>
                            setValue("default_purchase_unit", Number(value))
                          }
                          value={watch("default_purchase_unit")?.toString()}
                          isRequired={true}
                          icon={<Layers className="w-4 h-4" />}
                        />
                      </div>
                    </div>
                  </>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="expiry_date">Expiry Date</Label>
                    <Input
                      type="date"
                      id="expiry_date"
                      {...register("expiry_date")}
                      value={formatDateForInput(watch("expiry_date"))}
                      error={!!errors.expiry_date}
                      hint={errors.expiry_date?.message}
                      icon={<Calendar className="w-4 h-4" />}
                    />
                  </div>
                  <div>
                    <Label htmlFor="alert_quantity">Alert Quantity</Label>
                    <Switch
                      label=""
                      defaultChecked={watch("alert_quantity") > 0}
                      onChange={(checked) =>
                        setValue("alert_quantity", checked ? 1 : 0)
                      }
                    />
                  </div>
                </div>
              </div>
            </ComponentCard>

            {/* Branch Management Section */}
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

                <div className="relative inline-block group">
                  <button
                    type="button"
                    onClick={() => append({ branch_id: 0, is_active: true })}
                    disabled={!canAddBranch}
                    className={`
                      text-blue-500 hover:text-blue-700 
                      flex items-center gap-1 text-sm
                      ${!canAddBranch ? "opacity-50 cursor-not-allowed" : ""}
                    `}
                  >
                    <IoAdd className="w-4 h-4" />
                    Add Branch
                  </button>

                  {!canAddBranch && (
                    <div
                      className="
                      absolute hidden group-hover:block 
                      bg-gray-800 text-white text-xs 
                      rounded py-1 px-2 bottom-full mb-2 
                      whitespace-nowrap
                    "
                    >
                      No available branches to add
                    </div>
                  )}
                </div>

                {!canAddBranch && fields.length === 0 && (
                  <p className="text-gray-500 text-sm">No branches available</p>
                )}
              </div>
            </ComponentCard>
          </div>

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
    </>
  );
}