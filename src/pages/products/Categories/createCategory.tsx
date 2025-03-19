import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import ComponentCard from "../../../components/common/ComponentCard";
import PageBreadcrumb from "../../../components/common/PageBreadCrumb";
import Input from "../../../components/form/input/InputField";
import TextArea from "../../../components/form/input/TextArea";
import Label from "../../../components/form/Label";
import { useMeStore } from "../../../store/useMeStore";
import {
  useAddCategory,
  useFetchCategory,
  useUpdateCategory,
} from "@/hooks/prouducts/useCategories";
import {
  categorySchema,
  type CategoryType,
} from "@/components/lib/validations/category";
import { Home } from "lucide-react";

export default function CategoryForm() {
  const { id } = useParams();
  const isUpdate = Boolean(id);
  const addCategory = useAddCategory();
  const updateCategory = useUpdateCategory();
  const organizationId = useMeStore((state) => state.organizationId);

  const { data: categoryData, isLoading } = useFetchCategory(Number(id), {
    enabled: isUpdate,
  });

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
    control,
  } = useForm<CategoryType>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      category_name_en: categoryData?.category_name_en ?? "",
      category_name_ar: categoryData?.category_name_ar ?? "",
      description_en: categoryData?.description_en ?? "",
      description_ar: categoryData?.description_ar ?? "",
      code: categoryData?.code ?? "",
    },
  });

  useEffect(() => {
    if (categoryData) {
      setValue("category_name_en", categoryData.category_name_en ?? "");
      setValue("category_name_ar", categoryData.category_name_ar ?? "");
      setValue("description_en", categoryData.description_en ?? "");
      setValue("description_ar", categoryData.description_ar ?? "");
      setValue("code", categoryData.code ?? "");
    }
  }, [categoryData, setValue]);

  const onSubmit = async (formData: CategoryType) => {
    const payload = {
      organization_id: organizationId,
      ...formData,
    };

    if (isUpdate && id) {
      await updateCategory.mutateAsync({
        id: Number(id),
        data: payload,
      });
    } else {
      await addCategory.mutateAsync(payload);
    }
  };

  return (
    <>
      <div className="py-4 px-1">
        <PageBreadcrumb
          baseLink="/categories"
          baseTitle="Category"
          pageTitle={isUpdate ? "Update Category" : "Create Category"}
          icon={<Home className="w-4 h-4" />}
        />

        <ComponentCard title={isUpdate ? "Update Category" : "Create Category"}>
          {isUpdate && isLoading ? (
            <p>Loading Category data...</p>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <div className="py-2">
                    <Label htmlFor="category_name_ar">Name (Ar)</Label>
                    <Input
                      type="text"
                      id="category_name_ar"
                      placeholder="Please Enter Category Name (Ar)"
                      {...register("category_name_ar")}
                      error={!!errors.category_name_ar}
                      hint={errors.category_name_ar?.message}
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

                <div>
                  <div className="py-2">
                    <Label htmlFor="category_name_en">Name (En)</Label>
                    <Input
                      type="text"
                      id="category_name_en"
                      placeholder="Enter category name"
                      {...register("category_name_en")}
                      error={!!errors.category_name_en}
                      hint={errors.category_name_en?.message}
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

              <div className="mt-6">
                <Label htmlFor="code">Code</Label>
                <Input
                  type="text"
                  id="code"
                  placeholder="Please enter category code"
                  {...register("code")}
                  error={!!errors.code}
                  hint={errors.code?.message}
                />
              </div>

              <div className="flex justify-end mt-6">
                <button
                  type="submit"
                  className="px-6 py-3 text-sm font-medium disabled:opacity-50 text-white transition rounded-lg shadow-theme-xs bg-[#465FFF] hover:bg-[#465FFF] flex items-center gap-2"
                  disabled={
                    isSubmitting ||
                    addCategory.isPending ||
                    updateCategory.isPending
                  }
                >
                  {(addCategory.isPending || updateCategory.isPending) && (
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
    </>
  );
}
