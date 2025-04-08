import {
  subUnitSchema,
  type SubUnitType,
} from "@/components/lib/validations/subUnit";
import {
  useAddSubUnit,
  useFetchSubUnit,
  useUpdateSubUnit,
} from "@/hooks/prouducts/useSubUnits";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { IoAdd } from "react-icons/io5";
import { useParams } from "react-router-dom";
import ComponentCard from "../../../components/common/ComponentCard";
import PageBreadcrumb from "../../../components/common/PageBreadCrumb";
import Input from "../../../components/form/input/InputField";
import Label from "../../../components/form/Label";
import { useFetchUnits } from "@/hooks/prouducts/useUnits";
import { Folder, ShoppingBag, Type, Hash } from "lucide-react";
import Switch from "@/components/form/switch/Switch";
import { CustomSelect } from "@/components/ui/select/customSelect";

const isFieldRequired = (fieldName: keyof SubUnitType): boolean => {
  const schemaShape = subUnitSchema.shape;
  const fieldSchema = schemaShape[fieldName];

  if (fieldSchema._def.typeName === "ZodOptional") {
    return false;
  }

  return true;
};

export default function SubUnitForm() {
  const { id } = useParams();
  const isUpdate = Boolean(id);
  const addSubUnit = useAddSubUnit();
  const updateSubUnit = useUpdateSubUnit();
  const { data: units } = useFetchUnits();
  const { data: subUnitData, isLoading } = useFetchSubUnit(Number(id), {
    enabled: isUpdate,
  });

  const [unitOptions, setUnitOptions] = useState<
    Array<{ value: string; label: string }>
  >([]);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
    trigger,
    watch,
  } = useForm<SubUnitType>({
    resolver: zodResolver(subUnitSchema),
    defaultValues: {
      related_to: subUnitData?.related_to?.toString() ?? "",
      unit_name_en: subUnitData?.unit_name_en ?? "",
      unit_name_ar: subUnitData?.unit_name_ar ?? "",
      short_name_en: subUnitData?.short_name_en ?? "",
      short_name_ar: subUnitData?.short_name_ar ?? "",
      allow_decimal: subUnitData?.allow_decimal ?? 0,
      multiplier: subUnitData?.multiplier ?? null,
    },
  });

  const relatedToValue = watch("related_to");

  const handleSelectChange = async (name: keyof SubUnitType, value: string) => {
    setValue(name, value, { shouldValidate: true });
    await trigger(name);
  };

  useEffect(() => {
    if (units) {
      const options = units.map((unit) => ({
        value: unit.id?.toString() || "",
        label: unit.unit_name_en || "Unnamed Unit",
      }));
      setUnitOptions(options);

      if (subUnitData?.related_to && options.length > 0) {
        const selectedUnit = options.find(
          (opt) => opt.value === subUnitData.related_to?.toString()
        );
        if (selectedUnit) {
          setValue("related_to", selectedUnit.value);
        }
      }
    }
  }, [units, subUnitData, setValue]);

  useEffect(() => {
    if (subUnitData) {
      setTimeout(() => {
        setValue("related_to", subUnitData.related_to?.toString() ?? "");
        setValue("unit_name_en", subUnitData.unit_name_en ?? "");
        setValue("unit_name_ar", subUnitData.unit_name_ar ?? "");
        setValue("short_name_en", subUnitData.short_name_en ?? "");
        setValue("short_name_ar", subUnitData.short_name_ar ?? "");
        setValue("allow_decimal", subUnitData.allow_decimal ?? 0);
        setValue("multiplier", subUnitData.multiplier ?? null);
      }, 100);
    }
  }, [subUnitData, setValue]);

  const onSubmit = async (formData: SubUnitType) => {
    const payload: any = {
      ...formData,
      related_to: formData.related_to ? Number(formData.related_to) : null,
    };

    if (isUpdate && id) {
      await updateSubUnit.mutateAsync({ id: id, data: payload });
    } else {
      await addSubUnit.mutateAsync(payload);
    }
  };

  return (
    <>
      <PageBreadcrumb
        baseLink="/sub-units"
        baseTitle="Sub Unit"
        pageTitle={isUpdate ? "Update Sub Unit" : "Create Sub Unit"}
        icon={
          <div className="w-6 h-6 flex items-center justify-center dark:bg-gray-800 bg-gray-200 rounded-full">
            <IoAdd className="w-5 h-5" />
          </div>
        }
      />

      <ComponentCard title={isUpdate ? "Update Sub Unit" : "Create Sub Unit"}>
        {isUpdate && isLoading ? (
          <p>Loading unit data...</p>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-1 gap-6">
              <div className="space-y-2">
                <Label>Unit</Label>
                <CustomSelect
                  name="related_to"
                  options={unitOptions}
                  placeholder="Select Unit"
                  searchPlaceholder="Search units..."
                  error={errors.related_to?.message}
                  onChange={(value) => handleSelectChange("related_to", value)}
                  isRequired={isFieldRequired("related_to")}
                  icon={<Folder className="w-4 h-4" />}
                  value={relatedToValue}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Sub Unit Name (En)</Label>
                  <Input
                    {...register("unit_name_en")}
                    placeholder="Enter unit name (English)"
                    error={!!errors.unit_name_en}
                    icon={<Type className="w-4 h-4" />}
                    hint={errors.unit_name_en?.message}
                  />
                </div>
                <div>
                  <Label>Sub Unit Name (Ar)</Label>
                  <Input
                    {...register("unit_name_ar")}
                    placeholder="Enter unit name (Arabic)"
                    error={!!errors.unit_name_ar}
                    icon={<Type className="w-4 h-4" />}
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
                    icon={<ShoppingBag className="w-4 h-4" />}
                    hint={errors.short_name_en?.message}
                  />
                </div>
                <div>
                  <Label>Short Name (Ar)</Label>
                  <Input
                    {...register("short_name_ar")}
                    placeholder="Enter short name (Arabic)"
                    error={!!errors.short_name_ar}
                    icon={<ShoppingBag className="w-4 h-4" />}
                    hint={errors.short_name_ar?.message}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Multiplier</Label>
                  <Input
                    type="number"
                    {...register("multiplier", { valueAsNumber: true })}
                    placeholder="Enter multiplier value"
                    error={!!errors.multiplier}
                    icon={<Hash className="w-4 h-4" />}
                    hint={errors.multiplier?.message}
                  />
                </div>
                <div>
                  <Label>Allow Decimal</Label>
                  <Switch
                    label=""
                    defaultChecked={subUnitData?.allow_decimal === 1}
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
                    addSubUnit.isPending ||
                    updateSubUnit.isPending
                  }
                >
                  {(addSubUnit.isPending || updateSubUnit.isPending) && (
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
