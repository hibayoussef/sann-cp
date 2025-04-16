import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams } from "react-router-dom";
import ComponentCard from "../../../components/common/ComponentCard";
import PageBreadcrumb from "../../../components/common/PageBreadCrumb";
import Input from "../../../components/form/input/InputField";
import Label from "../../../components/form/Label";
import { useMeStore } from "../../../store/useMeStore";
import { Percent, Type } from "lucide-react";
import {
  useAddTax,
  useFetchTax,
  useUpdateTax,
} from "@/hooks/prouducts/useTaxes";
import { taxSchema, TaxType } from "@/components/lib/validations/tax";
import { IoAdd } from "react-icons/io5";
import Switch from "@/components/form/switch/Switch";

export default function TaxForm() {
  const { id } = useParams();
  const isUpdate = Boolean(id);
  const addTax = useAddTax();
  const updateTax = useUpdateTax();
  const organizationId = useMeStore((state) => state.organizationId);

  // Fetch tax data for updating
  const { data: taxData = null, isLoading } = useFetchTax(Number(id), {
    enabled: isUpdate,
  });

  // Hook form initialization
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<TaxType>({
    resolver: zodResolver(taxSchema),
    defaultValues: {
      tax_name_ar: "",
      tax_name_en: "",
      amount: 0.0,
      is_active: 0, // Default to inactive for create
    },
  });

  // Get current is_active value
  const isActive = watch("is_active");

  // Populate form fields with tax data
  useEffect(() => {
    if (taxData) {
      setValue("tax_name_ar", taxData?.tax_name_ar ?? "");
      setValue("tax_name_en", taxData?.tax_name_en ?? "");
      setValue("amount", taxData?.amount ?? 0.0);
      setValue("is_active", taxData?.is_active ?? 0); // Keep existing value for update
    }
  }, [taxData, setValue]);

  // Submit handler
  const onSubmit = async (formData: TaxType) => {
    const payload = {
      organization_id: organizationId,
      ...formData,
    };
  
    if (isUpdate && id) {
      await updateTax.mutateAsync({
        id: id,
        data: payload,
      });
    } else {
      await addTax.mutateAsync(payload);
    }
  };

  return (
    <>
      <PageBreadcrumb
        baseLink="/taxes"
        baseTitle="Taxes"
        pageTitle={isUpdate ? "Update Tax" : "Create Tax"}
        icon={
          <div className="w-6 h-6 flex items-center justify-center dark:bg-gray-800 bg-gray-200 rounded-full">
            <IoAdd className="w-5 h-5" />
          </div>
        }
      />

      <ComponentCard title={isUpdate ? "Update Tax" : "Create Tax"}>
        {isUpdate && isLoading ? (
          <p className="dark:text-gray-400">Loading tax data...</p>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-1 gap-6">
              {/* Name Fields (English and Arabic) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="py-2">
                  <Label htmlFor="tax-name-en">Name (En)</Label>
                  <Input
                    type="text"
                    id="tax-name-en"
                    placeholder="Please enter tax name (En)"
                    {...register("tax_name_en")}
                    error={!!errors.tax_name_en}
                    hint={errors.tax_name_en?.message}
                    className="w-full p-2 border rounded-md mt-1"
                    icon={<Type className="w-4 h-4" />}
                  />
                </div>
                <div className="py-2">
                  <Label htmlFor="tax-name-ar">Name (Ar)</Label>
                  <Input
                    type="text"
                    id="tax-name-ar"
                    placeholder="Please enter tax name (Ar)"
                    {...register("tax_name_ar")}
                    error={!!errors.tax_name_ar}
                    hint={errors.tax_name_ar?.message}
                    icon={<Type className="w-4 h-4" />}
                    className="w-full p-2 border rounded-md mt-1"
                  />
                </div>
              </div>
              
              {/* Amount Field */}
              <div className="py-2">
                <Label htmlFor="amount">Amount</Label>
                <Input
                  type="number"
                  id="amount"
                  placeholder="Please enter amount"
                  {...register("amount", { valueAsNumber: true })}
                  error={!!errors.amount}
                  hint={errors.amount?.message}
                  className="w-full p-2 border rounded-md"
                  icon={<Percent className="w-4 h-4" />}
                />
              </div>

              {/* Is Active Switch */}
              <div className="pl-6 mt-3">
                <Label htmlFor="is-active">Tax Status</Label>
                <Switch
                  label={isActive ? "Active" : "Inactive"}
                  defaultChecked={isUpdate ? taxData?.is_active === 1 : false}
                  onChange={(checked) => setValue("is_active", checked ? 1 : 0)}
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end mt-12">
              <button
                type="submit"
                className="px-6 py-3 text-sm font-medium disabled:opacity-50 text-white transition rounded-lg shadow-theme-xs bg-[#465FFF] hover:bg-[#465FFF] flex items-center gap-2"
                disabled={isSubmitting || addTax.isPending || updateTax.isPending}
              >
                {(addTax.isPending || updateTax.isPending) && (
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