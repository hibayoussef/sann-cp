import {
  brandSchema,
  type BrandType,
} from "@/components/lib/validations/brand";
import {
  useAddBrand,
  useFetchBrand,
  useUpdateBrand,
} from "@/hooks/prouducts/useBrands";
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

export default function BrandForm() {
  const { id } = useParams();
  const isUpdate = Boolean(id);
  const addBrand = useAddBrand();
  const updateBrand = useUpdateBrand();
  const organizationId = useMeStore((state) => state.organizationId);

  const { data: brandData, isLoading } = useFetchBrand(Number(id), {
    enabled: isUpdate,
  });

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
    control,
  } = useForm<BrandType>({
    resolver: zodResolver(brandSchema),
    defaultValues: {
      brand_name_en: brandData?.brand_name_en ?? "",
      brand_name_ar: brandData?.brand_name_ar ?? "",
      description_en: brandData?.description_en ?? "",
      description_ar: brandData?.description_ar ?? "",
    },
  });

  useEffect(() => {
    if (brandData) {
      setValue("brand_name_en", brandData.brand_name_en ?? "");
      setValue("brand_name_ar", brandData.brand_name_ar ?? "");
      setValue("description_en", brandData.description_en ?? "");
      setValue("description_ar", brandData.description_ar ?? "");
    }
  }, [brandData, setValue]);

  const onSubmit = async (formData: BrandType) => {
    const payload = {
      organization_id: organizationId,
      ...formData,
    };

    if (isUpdate && id) {
      await updateBrand.mutateAsync({
        id: Number(id),
        data: payload,
      });
    } else {
      await addBrand.mutateAsync(payload);
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
                  {...register("brand_name_en")}
                  error={!!errors.brand_name_en}
                  hint={errors.brand_name_en?.message}
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
                  {...register("brand_name_ar")}
                  error={!!errors.brand_name_ar}
                  hint={errors.brand_name_ar?.message}
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
                  className="px-6 py-3 text-sm font-medium disabled:opacity-50 text-white transition rounded-lg shadow-theme-xs bg-[#575db1] hover:bg-[#474ca1] flex items-center gap-2"
                  disabled={
                    isSubmitting || addBrand.isPending || updateBrand.isPending
                  }
                >
                  {(addBrand.isPending || updateBrand.isPending) && (
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
            </div>
          </form>
        )}
      </ComponentCard>
    </>
  );
}
