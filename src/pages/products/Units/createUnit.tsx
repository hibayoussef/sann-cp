import {
  useAddUnit,
  useFetchUnit,
  useUpdateUnit,
} from "@/hooks/prouducts/useUnits";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { useParams } from "react-router-dom";
import ComponentCard from "../../../components/common/ComponentCard";
import PageBreadcrumb from "../../../components/common/PageBreadCrumb";
import Input from "../../../components/form/input/InputField";
import Label from "../../../components/form/Label";
import { useMeStore } from "../../../store/useMeStore";
import { unitSchema, type UnitType } from "@/components/lib/validations/unit";

export default function UnitForm() {
  const { id } = useParams();
  const isUpdate = Boolean(id);
  const addUnit = useAddUnit();
  const updateUnit = useUpdateUnit();
  const organizationId = useMeStore((state) => state.organizationId);

  const { data: unitData, isLoading } = useFetchUnit(Number(id), {
    enabled: isUpdate,
  });

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    control,
  } = useForm<UnitType>({
    resolver: zodResolver(unitSchema),
    defaultValues: {
      unit_name_en: unitData?.unit_name_en ?? "",
      unit_name_ar: unitData?.unit_name_ar ?? "",
      short_name_en: unitData?.short_name_en ?? "",
      short_name_ar: unitData?.short_name_ar ?? "",
      allow_decimal: unitData?.allow_decimal ?? false,
      multiplier: unitData?.multiplier ?? 0,
      sub_units:
        unitData?.sub_units?.map((sub) => ({
          unit_name_ar: sub.unit_name_ar ?? "",
          unit_name_en: sub.unit_name_en ?? "",
          short_name_ar: sub.short_name_ar ?? "",
          short_name_en: sub.short_name_en ?? "",
          allow_decimal: sub.allow_decimal ?? false,
          multiplier: sub.multiplier ?? 1,
        })) ?? [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "sub_units",
  });

  useEffect(() => {
    if (unitData) {
      setValue("unit_name_en", unitData.unit_name_en ?? "");
      setValue("unit_name_ar", unitData.unit_name_ar ?? "");
      setValue("short_name_en", unitData.short_name_en ?? "");
      setValue("short_name_ar", unitData.short_name_ar ?? "");
      setValue("allow_decimal", unitData.allow_decimal ?? false);
      setValue("multiplier", unitData.multiplier ?? 0);
      setValue("sub_units", unitData.sub_units ?? []);
    }
  }, [unitData, setValue]);

  const onSubmit = async (formData: UnitType) => {
    const payload = {
      organization_id: organizationId,
      ...formData,
    };

    if (isUpdate && id) {
      await updateUnit.mutateAsync({
        id: Number(id),
        data: payload,
      });
    } else {
      await addUnit.mutateAsync(payload);
    }
  };


  return (
    <>
      <PageBreadcrumb
        baseLink="/units"
        baseTitle="Unit"
        pageTitle={isUpdate ? "Update Unit" : "Create Unit"}
      />

      <ComponentCard title={isUpdate ? "Update Unit" : "Create Unit"}>
        {isUpdate && isLoading ? (
          <p>Loading unit data...</p>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-6">
              <div>
                <Label>Unit Name (En)</Label>
                <Input
                  {...register("unit_name_en")}
                  error={!!errors.unit_name_en}
                  hint={errors.unit_name_en?.message}
                />
              </div>
              <div>
                <Label>Unit Name (Ar)</Label>
                <Input
                  {...register("unit_name_ar")}
                  error={!!errors.unit_name_ar}
                  hint={errors.unit_name_ar?.message}
                />
              </div>
              <div>
                <Label>Short Name (En)</Label>
                <Input
                  {...register("short_name_en")}
                  error={!!errors.short_name_en}
                  hint={errors.short_name_en?.message}
                />
              </div>
              <div>
                <Label>Short Name (Ar)</Label>
                <Input
                  {...register("short_name_ar")}
                  error={!!errors.short_name_ar}
                  hint={errors.short_name_ar?.message}
                />
              </div>
              <div>
                <Label>Allow Decimal</Label>
                <input type="checkbox" {...register("allow_decimal")} />
              </div>
              <div>
                <Label>Multiplier</Label>
                <Input
                  type="number"
                  {...register("multiplier")}
                  error={!!errors.multiplier}
                  hint={errors.multiplier?.message}
                />
              </div>
              <div>
                <Label>Sub Units</Label>
                {fields.map((sub, index) => (
                  <div key={sub.id} className="border p-4 rounded-md">
                    <Input
                      placeholder="Sub Unit Name (En)"
                      {...register(`sub_units.${index}.unit_name_en`)}
                    />
                    <Input
                      placeholder="Sub Unit Name (Ar)"
                      {...register(`sub_units.${index}.unit_name_ar`)}
                    />
                    <Input
                      placeholder="Short Name (En)"
                      {...register(`sub_units.${index}.short_name_en`)}
                    />
                    <Input
                      placeholder="Short Name (Ar)"
                      {...register(`sub_units.${index}.short_name_ar`)}
                    />
                    <Input
                      type="number"
                      placeholder="Multiplier"
                      {...register(`sub_units.${index}.multiplier`)}
                    />
                    <button
                      type="button"
                      onClick={() => remove(index)}
                      className="text-red-500"
                    >
                      Remove
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() =>
                    append({
                      unit_name_en: "",
                      unit_name_ar: "",
                      short_name_en: "",
                      short_name_ar: "",
                      multiplier: 1,
                    })
                  }
                  className="text-blue-500"
                >
                  + Add Sub Unit
                </button>
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="px-6 py-3 text-sm font-medium text-white bg-[#575db1] hover:bg-[#474ca1] rounded-lg shadow-theme-xs"
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