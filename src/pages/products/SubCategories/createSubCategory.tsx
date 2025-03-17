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
import { useAddCategory, useFetchCategory, useUpdateCategory } from "@/hooks/prouducts/useCategories";
import { categorySchema, type CategoryType } from "@/components/lib/validations/category";

export default function SubCategoryForm() {
  const { id } = useParams();
  const isUpdate = Boolean(id);
  const addCategory  = useAddCategory();
  const updateCategory = useUpdateCategory();
  const organizationId = useMeStore((state) => state.organizationId);

  const { data: categoryData, isLoading } = useFetchCategory(Number(id), {
    enabled: isUpdate
  });

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    control,
  } = useForm<CategoryType>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      category_name_en: categoryData?.category_name_en ?? "",
      category_name_ar: categoryData?.category_name_ar ?? "",
      description_en: categoryData?.description_en ?? "",
      description_ar: categoryData?.description_ar ?? "",
      code: categoryData?.code ?? ""
    }
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
      <PageBreadcrumb
        baseLink="/brands"
        baseTitle="Brand"
        pageTitle={isUpdate ? "Update Brand" : "Create Brand"}
      />

      <ComponentCard title={isUpdate ? "Update Brand" : "Create Brand"}>
        {isUpdate && isLoading ? (
          <p>Loading brand data...</p>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-6">
              <div>
                <Label htmlFor="input">Name (En)</Label>
                <Input
                  type="text"
                  id="input"
                  placeholder="Please enter brand name"
                  {...register("category_name_en")}
                  error={!!errors.category_name_en}
                  hint={errors.category_name_en?.message}
                />
              </div>
              <div>
                <Label>Description (En)</Label>
                <TextArea
                  rows={6}
                  {...register("description_en")}
                  error={!!errors.description_en}
                  hint={errors.description_en?.message}
                />
              </div>

              <div className="w-full h-px bg-gray-200 dark:bg-gray-600 mb-2"></div>

              <div>
                <Label htmlFor="input">Name (Ar)</Label>
                <Input
                  type="text"
                  id="input"
                  placeholder="Please enter brand name"
                  {...register("category_name_ar")}
                  error={!!errors.category_name_ar}
                  hint={errors.category_name_ar?.message}
                />
              </div>
              <div>
                <Label>Description (Ar)</Label>
                <TextArea
                  rows={6}
                  {...register("description_ar")}
                  error={!!errors.description_ar}
                  hint={errors.description_ar?.message}
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="px-6 py-3 text-sm font-medium disabled:opacity-50 text-white transition rounded-lg shadow-theme-xs bg-bg-[#465FFF] hover:bg-bg-[#465FFF]"
                >
                  {isUpdate ? "Update" : "Create"}
                </button>
              </div>
            </div>
          </form>
        )}
      </ComponentCard>
    </>
  );
}
