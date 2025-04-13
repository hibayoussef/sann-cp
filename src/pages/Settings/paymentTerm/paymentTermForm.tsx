import ComponentCard from "@/components/common/ComponentCard";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import Input from "@/components/form/input/InputField";
import Label from "@/components/form/Label";
import {
  paymentTermSchema,
  type PaymentTermType,
} from "@/components/lib/validations/paymentTerm";
import Loader from "@/components/ui/loader/loader";
import {
  useAddPaymentTerm,
  useFetchPaymentTerm,
  useUpdatePaymentTerm,
} from "@/hooks/settings/usePaymentTerm";
import { useMeStore } from "@/store/useMeStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { BsFillCalendarDayFill } from "react-icons/bs";
import { IoAdd } from "react-icons/io5";
import { MdOutlineShortText } from "react-icons/md";
import { useParams } from "react-router-dom";

export default function PaymentTermForm() {
  const { id } = useParams();
  const isUpdate = Boolean(id);
  const addPaymentTerm = useAddPaymentTerm();
  const updatePaymentTerm = useUpdatePaymentTerm();
  const organizationId = useMeStore((state) => state.organizationId);

  const { data: paymentTermData, isLoading } = useFetchPaymentTerm(Number(id), {
    enabled: isUpdate,
  });

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<PaymentTermType>({
    resolver: zodResolver(paymentTermSchema),
    defaultValues: {
      term_name_ar: "",
      term_name_en: "",
      number_of_days: 0,
    },
  });

  useEffect(() => {
    if (paymentTermData) {
      setValue("term_name_ar", paymentTermData?.term_name_ar ?? "");
      setValue("term_name_en", paymentTermData?.term_name_en ?? "");
      setValue("number_of_days", paymentTermData?.number_of_days ?? 0);
    }
  }, [paymentTermData, setValue]);

  const onSubmit = async (formData: PaymentTermType) => {
    const payload = {
      ...formData,
      organization_id: organizationId,
      ...(isUpdate && id ? { _method: "PUT" } : {}),
    };

    if (isUpdate && id) {
      await updatePaymentTerm.mutateAsync({ id: Number(id), data: payload });
    } else {
      await addPaymentTerm.mutateAsync(payload);
    }
  };

  return (
    <div className="px-1">
      <PageBreadcrumb
        baseLink="/payment-terms"
        baseTitle="Payment Terms"
        pageTitle={isUpdate ? "Update Payment Term" : "Create Payment Term"}
        icon={
          <div className="w-6 h-6 flex items-center justify-center bg-gray-200 rounded-full">
            <IoAdd className="w-5 h-5" />
          </div>
        }
      />
      <ComponentCard
        title={isUpdate ? "Update Payment Term" : "Create Payment Term"}
      >
        <div className="flex-1 p-4 bg-blue-50 border border-blue-200 rounded-lg dark:bg-gray-900 dark:border-gray-700 h-full">
          <h3 className="text-sm font-semibold mb-3 dark:text-white">
            Payment Terms Overview
          </h3>
          <div className="space-y-1 text-xs text-gray-600 dark:text-gray-300">
            <p>
              Payment terms define the conditions and timeframe for when
              payments are due. It helps to manage the timing of payments
              between your organization and clients or suppliers.
            </p>
            <p>
              Example: A payment term of "Net 30" means the payment is due
              within 30 days from the invoice date.
            </p>
            <p>
              Ensure that the payment terms are consistent with your business
              practices and agreements.
            </p>
          </div>
        </div>

        {isUpdate && isLoading ? (
          <Loader />
        ) : (
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {/* Arabic Name */}
            <div className="relative">
              <Label htmlFor="term_name_ar">Term Name (Arabic)</Label>
              <div className="relative">
                <Input
                  id="term_name_ar"
                  placeholder="Enter term name (Ar)"
                  className="pl-10"
                  {...register("term_name_ar")}
                  error={!!errors.term_name_ar}
                  hint={errors.term_name_ar?.message}
                  icon={<MdOutlineShortText className="w-4 h-4" />}
                />
              </div>
            </div>

            {/* English Name */}
            <div className="relative">
              <Label htmlFor="term_name_en">Term Name (English)</Label>
              <div className="relative">
                <Input
                  id="term_name_en"
                  placeholder="Enter term name (En)"
                  className="pl-10"
                  {...register("term_name_en")}
                  error={!!errors.term_name_en}
                  hint={errors.term_name_en?.message}
                  icon={<MdOutlineShortText className="w-4 h-4" />}
                />
              </div>
            </div>

            {/* Number of Days */}
            <div className="relative">
              <Label htmlFor="number_of_days">Number of Days</Label>
              <div className="relative">
                <Input
                  type="number"
                  id="number_of_days"
                  placeholder="Enter days"
                  className="pl-10"
                  {...register("number_of_days")}
                  error={!!errors.number_of_days}
                  hint={errors.number_of_days?.message}
                  icon={<BsFillCalendarDayFill className="w-4 h-4" />}
                />
              </div>
            </div>

            <div className="col-span-full flex justify-end mt-6">
              <button
                type="submit"
                className="px-6 py-3 text-sm font-medium text-white bg-[#465FFF] hover:bg-[#3b51db] rounded-lg shadow transition-all duration-200 ease-in-out"
                disabled={
                  isSubmitting ||
                  addPaymentTerm.isPending ||
                  updatePaymentTerm.isPending
                }
              >
                {addPaymentTerm.isPending || updatePaymentTerm.isPending
                  ? "Processing..."
                  : isUpdate
                  ? "Update"
                  : "Create"}
              </button>
            </div>
          </form>
        )}
      </ComponentCard>
    </div>
  );
}
