import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams } from "react-router-dom";
import ComponentCard from "../../../components/common/ComponentCard";
import PageBreadcrumb from "../../../components/common/PageBreadCrumb";
import Input from "../../../components/form/input/InputField";
import Label from "../../../components/form/Label";
import { useMeStore } from "../../../store/useMeStore";
import {
  useAddWarranty,
  useFetchWarranty,
  useUpdateWarranty,
} from "@/hooks/prouducts/useWarranties";
import {
  warrantySchema,
  type WarrantyType,
} from "@/components/lib/validations/warranty";
import { Clock, Percent, PercentIcon, Tag, Type } from "lucide-react";
import { WarrantiesType } from "@/types/enums/warrantiesType";
import { IoAdd } from "react-icons/io5";

export default function WarrantyForm() {
  const { id } = useParams();
  const isUpdate = Boolean(id);
  const addWarranty = useAddWarranty();
  const updateWarranty = useUpdateWarranty();
  const organizationId = useMeStore((state) => state.organizationId);

  // Fetch warranty data for updating
  const { data: warrantyData = null, isLoading } = useFetchWarranty(
    Number(id),
    {
      enabled: isUpdate,
    }
  );

  // Hook form initialization
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<WarrantyType>({
    resolver: zodResolver(warrantySchema),
    defaultValues: {
      warranty_name_ar: "",
      warranty_name_en: "",
      duration: 0,
      duration_type: "Days",
    },
  });

  // Populate form fields with warranty data
  useEffect(() => {
    if (warrantyData) {
      setValue("warranty_name_ar", warrantyData?.warranty_name_ar ?? "");
      setValue("warranty_name_en", warrantyData?.warranty_name_en ?? "");
      setValue("duration", warrantyData?.duration ?? 0);
      setValue("duration_type", warrantyData?.duration_type ?? "Days");
    }
  }, [warrantyData, setValue]);

  // Submit handler
  const onSubmit = async (formData: WarrantyType) => {
    const payload = {
      organization_id: organizationId,
      ...formData,
    };

    if (isUpdate && id) {
      await updateWarranty.mutateAsync({
        id: id,
        data: payload,
      });
    } else {
      await addWarranty.mutateAsync(payload);
    }
  };

  // Render form
  return (
    <>
      <PageBreadcrumb
        baseLink="/warranties"
        baseTitle="Warranties"
        pageTitle={isUpdate ? "Update Warranty" : "Create Warranty"}
        icon={
          <div className="w-6 h-6 flex items-center dark:bg-gray-800  justify-center bg-gray-200 rounded-full">
            <IoAdd className="w-5 h-5" />
          </div>
        }
      />

      <ComponentCard title={isUpdate ? "Update Warranty" : "Create Warranty"}>
        {isUpdate && isLoading ? (
          <p>Loading warranty data...</p>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* English Fields (Left Side) */}
              <div>
                <div className="py-3">
                  <Label htmlFor="warranty-name-en">Name (En)</Label>
                  <Input
                    type="text"
                    id="warranty-name-en"
                    placeholder="Please enter warranty name (En)"
                    {...register("warranty_name_en")}
                    error={!!errors.warranty_name_en}
                    hint={errors.warranty_name_en?.message}
                    className="w-full p-3 border rounded-md"
                    icon={<Type className="w-4 h-4" />}
                  />
                </div>
                <div className="py-3">
                  <Label htmlFor="duration">Duration</Label>
                  <Input
                    type="number"
                    id="duration"
                    placeholder="Please enter duration"
                    {...register("duration", { valueAsNumber: true })}
                    error={!!errors.duration}
                    hint={errors.duration?.message}
                    className="w-full p-3 border rounded-md"
                    icon={<Percent className="w-4 h-4" />}
                  />
                </div>
              </div>

              {/* Arabic Fields (Right Side) */}
              <div>
                <div className="py-3">
                  <Label htmlFor="warranty-name-ar">Name (Ar)</Label>
                  <Input
                    type="text"
                    id="warranty-name-ar"
                    placeholder="Please enter warranty name (Ar)"
                    {...register("warranty_name_ar")}
                    error={!!errors.warranty_name_ar}
                    hint={errors.warranty_name_ar?.message}
                    className="w-full p-3 border rounded-md"
                    icon={<Type className="w-4 h-4" />}
                  />
                </div>
                <div className="py-3">
                  <Label htmlFor="duration-type">Duration Type</Label>
                  <select
                    id="duration-type"
                    className="w-full p-1 border rounded-md dark:bg-gray-900 dark:text-gray-400"
                    {...register("duration_type")}
                  >
                    <option value="Days">{WarrantiesType.Days}</option>
                    <option value="Months">{WarrantiesType.MONTHS}</option>
                    <option value="Years">{WarrantiesType.YEARS}</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end mt-12">
              <button
                type="submit"
                className="px-6 py-3 text-sm font-medium disabled:opacity-50 text-white transition rounded-lg shadow-theme-xs bg-[#465FFF] hover:bg-[#465FFF] flex items-center gap-2"
                disabled={
                  isSubmitting ||
                  addWarranty.isPending ||
                  updateWarranty.isPending
                }
              >
                {(addWarranty.isPending || updateWarranty.isPending) && (
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
    </>
  );
}
