import {
  subCategorySchema,
  type SubCategoryType,
} from "@/components/lib/validations/subCategory";
import { useFetchCategories } from "@/hooks/prouducts/useCategories";
import {
  useAddSubCategory,
  useFetchSubCategory,
  useUpdateSubCategory,
} from "@/hooks/prouducts/useSubCategories";
import { zodResolver } from "@hookform/resolvers/zod";
import { Code, Folder, Tag, Type } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import ComponentCard from "../../../components/common/ComponentCard";
import PageBreadcrumb from "../../../components/common/PageBreadCrumb";
import Input from "../../../components/form/input/InputField";
import TextArea from "../../../components/form/input/TextArea";
import Label from "../../../components/form/Label";
import { IoAdd } from "react-icons/io5";
import { CustomSelect } from "@/components/ui/select/customSelect";

const isFieldRequired = (fieldName: keyof SubCategoryType): boolean => {
  const schemaShape = subCategorySchema.shape;
  const fieldSchema = schemaShape[fieldName];

  if (fieldSchema._def.typeName === "ZodOptional") {
    return false;
  }

  return true;
};

export default function SubCategoryForm() {
  const { id } = useParams();
  const isUpdate = Boolean(id);
  const addSubCategory = useAddSubCategory();
  const updateSubCategory = useUpdateSubCategory();

  const { data: categories } = useFetchCategories();

  const { data: subCategoryData, isLoading } = useFetchSubCategory(Number(id), {
    enabled: isUpdate,
  });

  const [categoryOptions, setCategoryOptions] = useState<
    Array<{ value: string; label: string }>
  >([]);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
    trigger,
    watch,
  } = useForm<SubCategoryType>({
    resolver: zodResolver(subCategorySchema),
    defaultValues: {
      category_id: subCategoryData?.category_id?.toString() ?? "",
      sub_category_name_en: subCategoryData?.sub_category_name_en ?? "",
      sub_category_name_ar: subCategoryData?.sub_category_name_ar ?? "",
      code: subCategoryData?.code ?? "",
      description_en: subCategoryData?.description_en ?? "",
      description_ar: subCategoryData?.description_ar ?? "",
    },
  });

  const categoryId = watch("category_id");

  const handleSelectChange = async (
    name: keyof SubCategoryType,
    value: string
  ) => {
    setValue(name, value, { shouldValidate: true });
    await trigger(name);
  };

  useEffect(() => {
    if (categories) {
      const options = categories.map((category: any) => ({
        value: category?.id.toString(),
        label: category.category_name_en || "Unnamed Category",
      }));
      setCategoryOptions(options);

      if (subCategoryData?.category_id && options.length > 0) {
        const selectedCategory = options.find(
          (opt) => opt.value === subCategoryData.category_id?.toString()
        );
        if (selectedCategory) {
          setValue("category_id", selectedCategory.value);
        }
      }
    }
  }, [categories, subCategoryData, setValue]);

  useEffect(() => {
    if (subCategoryData) {
      // تأخير تعيين القيم حتى يتم تحميل الخيارات
      setTimeout(() => {
        setValue("category_id", subCategoryData.category_id?.toString() ?? "");
        setValue(
          "sub_category_name_en",
          subCategoryData.sub_category_name_en ?? ""
        );
        setValue(
          "sub_category_name_ar",
          subCategoryData.sub_category_name_ar ?? ""
        );
        setValue("description_en", subCategoryData.description_en ?? "");
        setValue("description_ar", subCategoryData.description_ar ?? "");
        setValue("code", subCategoryData.code ?? "");
      }, 100);
    }
  }, [subCategoryData, setValue]);

  const onSubmit = async (formData: SubCategoryType) => {
    const payload: any = {
      ...formData,
      category_id: formData.category_id ? Number(formData.category_id) : null,
    };

    if (isUpdate && id) {
      await updateSubCategory.mutateAsync({
        id: Number(id),
        data: payload,
      });
    } else {
      await addSubCategory.mutateAsync(payload);
    }
  };

  return (
    <div className="py-4 px-1">
      <PageBreadcrumb
        baseLink="/sub-categories"
        baseTitle="Sub Category"
        pageTitle={isUpdate ? "Update Sub Category" : "Create Sub Category"}
        icon={
          <div className="w-6 h-6 flex items-center justify-center dark:bg-gray-800 bg-gray-200 rounded-full">
            <IoAdd className="w-5 h-5" />
          </div>
        }
      />

      <ComponentCard
        title={isUpdate ? "Update Sub Category" : "Create Sub Category"}
      >
        {isUpdate && isLoading ? (
          <p>Loading Sub Category data...</p>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Category Field */}
              <div className="space-y-2">
                <Label>Category</Label>
                <CustomSelect
                  name="category_id"
                  options={categoryOptions}
                  placeholder="Select Category"
                  searchPlaceholder="Search categories..."
                  error={errors.category_id?.message}
                  onChange={(value) => handleSelectChange("category_id", value)}
                  isRequired={isFieldRequired("category_id")}
                  icon={<Folder className="w-4 h-4" />}
                  value={categoryId}
                />
              </div>

              {/* Code Field */}
              <div className="space-y-2 ">
                <Label htmlFor="code">Code</Label>
                <Input
                  type="text"
                  id="code"
                  placeholder="Enter sub category code"
                  {...register("code")}
                  error={!!errors.code}
                  hint={errors.code?.message}
                    icon={<Code className="w-4 h-4" />}
                    className="dark:bg-gray-900"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Arabic Section */}
              <div>
                <div className="py-2">
                  <Label htmlFor="sub_category_name_ar">Name (Ar)</Label>
                  <Input
                    type="text"
                    id="sub_category_name_ar"
                    placeholder="Enter sub category name (Ar)"
                    {...register("sub_category_name_ar")}
                    error={!!errors.sub_category_name_ar}
                    hint={errors.sub_category_name_ar?.message}
                    icon={<Type className="w-4 h-4" />}
                  />
                </div>
                <div>
                  <Label htmlFor="description_ar">Description (Ar)</Label>
                  <TextArea
                    rows={6}
                    {...register("description_ar")}
                    error={!!errors.description_ar}
                    hint={errors.description_ar?.message}
                  />
                </div>
              </div>

              {/* English Section */}
              <div>
                <div className="py-2">
                  <Label htmlFor="sub_category_name_en">Name (En)</Label>
                  <Input
                    type="text"
                    id="sub_category_name_en"
                    placeholder="Enter sub category name (En)"
                    {...register("sub_category_name_en")}
                    error={!!errors.sub_category_name_en}
                    hint={errors.sub_category_name_en?.message}
                    icon={<Type className="w-4 h-4" />}
                  />
                </div>
                <div>
                  <Label htmlFor="description_en">Description (En)</Label>
                  <TextArea
                    rows={6}
                    {...register("description_en")}
                    error={!!errors.description_en}
                    hint={errors.description_en?.message}
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end mt-6">
              <button
                type="submit"
                className="px-6 py-3 text-sm font-medium disabled:opacity-50 text-white transition rounded-lg shadow-theme-xs bg-[#465FFF] hover:bg-[#465FFF] flex items-center gap-2"
                disabled={
                  isSubmitting ||
                  addSubCategory.isPending ||
                  updateSubCategory.isPending
                }
              >
                {(addSubCategory.isPending || updateSubCategory.isPending) && (
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
      </ComponentCard>
    </div>
  );
}
