import Switch from "@/components/form/switch/Switch";
import { unitBaseSchema, unitSchema, type UnitType } from "@/components/lib/validations/unit";
import { useAddUnit, useFetchUnit, useUpdateUnit } from "@/hooks/prouducts/useUnits";
import { useMeStore } from "@/store/useMeStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { Hash, Percent, ShoppingBag, Type } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { IoAdd } from "react-icons/io5";
import { useParams } from "react-router-dom";
import ComponentCard from "../../../components/common/ComponentCard";
import PageBreadcrumb from "../../../components/common/PageBreadCrumb";
import Input from "../../../components/form/input/InputField";
import Label from "../../../components/form/Label";
import Loader from "@/components/ui/loader/loader";

export default function UnitForm() {
  const { id } = useParams();
  const isUpdate = Boolean(id);
  const addUnit = useAddUnit();
  const updateUnit = useUpdateUnit();
  const { data: unitData, isLoading } = useFetchUnit(Number(id), {
    enabled: isUpdate,
  });
  const organizationId = useMeStore((state) => state.organizationId);
  
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<UnitType>({
    resolver: zodResolver(unitBaseSchema),
    defaultValues: {
      unit_name_en: unitData?.unit_name_en ?? "",
      unit_name_ar: unitData?.unit_name_ar ?? "",
      short_name_en: unitData?.short_name_en ?? "",
      short_name_ar: unitData?.short_name_ar ?? "",
      allow_decimal: unitData?.allow_decimal ?? 0,
      multiplier: unitData?.multiplier ?? 1,
    },
  });

  const allowDecimalValue = watch("allow_decimal");

  useEffect(() => {
    if (unitData) {
      setValue("unit_name_en", unitData.unit_name_en ?? "");
      setValue("unit_name_ar", unitData.unit_name_ar ?? "");
      setValue("short_name_en", unitData.short_name_en ?? "");
      setValue("short_name_ar", unitData.short_name_ar ?? "");
      setValue("allow_decimal", unitData.allow_decimal ?? 0);
      setValue("multiplier", unitData.multiplier ?? 1);
    }
  }, [unitData, setValue]);

  const onSubmit = async (formData: UnitType) => {
    const payload: any = {
      ...formData, 
      organization_id: organizationId,
      multiplier: Number(1)
     };

    if (isUpdate && id) {
      await updateUnit.mutateAsync({ id: Number(id), data: payload });
    } else {
      await addUnit.mutateAsync(payload);
    }
  };

  return (
    <>
      <PageBreadcrumb
        baseLink="/units"
        baseTitle="Units"
        pageTitle={isUpdate ? "Update Unit" : "Create Unit"}
        icon={
          <div className="w-6 h-6 flex items-center justify-center dark:bg-gray-800 bg-gray-200 rounded-full">
            <IoAdd className="w-5 h-5" />
          </div>
        }
      />

      <ComponentCard title={isUpdate ? "Update Unit" : "Create Unit"}>
        {isUpdate && isLoading ? (
          <Loader />
        ) : (
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-1 gap-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Unit Name (En)</Label>
                  <Input
                    {...register("unit_name_en")}
                    placeholder="Enter unit name (English)"
                    error={!!errors.unit_name_en}
                    icon={<Type className="w-4 h-4 text-gray-500" />}
                    hint={errors.unit_name_en?.message}
                  />
                </div>
                <div>
                  <Label>Unit Name (Ar)</Label>
                  <Input
                    {...register("unit_name_ar")}
                    placeholder="Enter unit name (Arabic)"
                    error={!!errors.unit_name_ar}
                    icon={<Type className="w-4 h-4 text-gray-500" />}
                    hint={errors.unit_name_ar?.message}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Short Name (En)</Label>
                  <Input
                    {...register("short_name_en")}
                    placeholder="Enter short name (English)"
                    error={!!errors.short_name_en}
                    icon={<ShoppingBag className="w-4 h-4 text-gray-500" />}
                    hint={errors.short_name_en?.message}
                  />
                </div>
                <div>
                  <Label>Short Name (Ar)</Label>
                  <Input
                    {...register("short_name_ar")}
                    placeholder="Enter short name (Arabic)"
                    error={!!errors.short_name_ar}
                    icon={<ShoppingBag className="w-4 h-4 text-gray-500" />}
                    hint={errors.short_name_ar?.message}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Allow Decimal</Label>
                  <Switch
                    label=""
                    checked={allowDecimalValue === 1}
                    onChange={(checked) =>
                      setValue("allow_decimal", checked ? 1 : 0)
                    }
                  />
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="px-6 py-3 text-sm font-medium disabled:opacity-50 text-white transition rounded-lg shadow-theme-xs bg-[#465FFF] hover:bg-[#465FFF] flex items-center gap-2"
                  disabled={
                    isSubmitting ||
                    addUnit.isPending ||
                    updateUnit.isPending
                  }
                >
                  {(addUnit.isPending || updateUnit.isPending) && (
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