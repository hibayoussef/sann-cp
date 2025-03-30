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
import { Code, Folder, Tag } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import ComponentCard from "../../../components/common/ComponentCard";
import PageBreadcrumb from "../../../components/common/PageBreadCrumb";
import Input from "../../../components/form/input/InputField";
import TextArea from "../../../components/form/input/TextArea";
import Label from "../../../components/form/Label";
import { IoAdd } from "react-icons/io5";

export default function SubCategoryForm() {
  const { id } = useParams();
  const isUpdate = Boolean(id);
  const addSubCategory = useAddSubCategory();
  const updateSubCategory = useUpdateSubCategory();

  const { data: categories } = useFetchCategories();

  const { data: subCategoryData, isLoading } = useFetchSubCategory(Number(id), {
    enabled: isUpdate,
  });

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<SubCategoryType>({
    resolver: zodResolver(subCategorySchema),
    defaultValues: {
      category_id: subCategoryData?.category_id ?? null,
      sub_category_name_en: subCategoryData?.sub_category_name_en ?? "",
      sub_category_name_ar: subCategoryData?.sub_category_name_ar ?? "",
      code: subCategoryData?.code ?? "",
      description_en: subCategoryData?.description_en ?? "",
      description_ar: subCategoryData?.description_ar ?? "",
    },
  });

  useEffect(() => {
    if (subCategoryData) {
      setValue("category_id", subCategoryData.category_id ?? null);
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
    }
  }, [subCategoryData, setValue]);

  const onSubmit = async (formData: SubCategoryType) => {
    const payload = {
      ...formData,
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
          <div className="w-6 h-6 flex items-center justify-center bg-gray-200 rounded-full">
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
                <Label htmlFor="category_id">Category</Label>
                <div className="relative">
                  <select
                    {...register("category_id", { valueAsNumber: true })}
                    className="text-sm rounded-lg border border-gray-300 shadow-sm w-full pl-10 pr-3 py-1.5 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors duration-200 ease-in-out"
                  >
                    <option value="">Select Category</option>
                    {categories?.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.category_name_en}
                      </option>
                    ))}
                  </select>
                  <Folder className="absolute left-3 top-2.5 w-4 h-4 text-gray-500" />
                </div>
                {errors.category_id && (
                  <p className="text-red-500 text-sm">
                    {errors?.category_id.message}
                  </p>
                )}
              </div>

              {/* Code Field */}
              <div className="space-y-2">
                <Label htmlFor="code">Code</Label>
                <Input
                  type="text"
                  id="code"
                  placeholder="Enter sub category code"
                  {...register("code")}
                  error={!!errors.code}
                  hint={errors.code?.message}
                  icon={<Code className="w-4 h-4" />}
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
                    icon={<Tag className="w-4 h-4" />}
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
                    icon={<Tag className="w-4 h-4" />}
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
