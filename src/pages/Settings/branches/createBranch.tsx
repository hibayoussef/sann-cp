import { useAddBranch, useFetchBranch, useUpdateBranch } from "@/hooks/settings/useBranches";
import { zodResolver } from "@hookform/resolvers/zod";
import { Code, Home, Tag } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import ComponentCard from "../../../components/common/ComponentCard";
import PageBreadcrumb from "../../../components/common/PageBreadCrumb";
import Input from "../../../components/form/input/InputField";
import TextArea from "../../../components/form/input/TextArea";
import Label from "../../../components/form/Label";
import { useMeStore } from "../../../store/useMeStore";
import { branchSchema, BranchType } from "@/components/lib/validations/branch";

export default function CreateBranch() {
  const { id } = useParams();
  const isUpdate = Boolean(id);
  const addBranch = useAddBranch();
  const updateBranch = useUpdateBranch();
  const organizationId = useMeStore((state) => state.organizationId);

  const { data: branchData, isLoading } = useFetchBranch(Number(id), {
    enabled: isUpdate,
  });

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<BranchType>({
    resolver: zodResolver(branchSchema),
    defaultValues: {
      branch_name_en: branchData?.branch_name_en ?? "",
      branch_name_ar: branchData?.branch_name_ar ?? "",
      email: branchData?.email ?? "",
      mobile: branchData?.mobile ?? "",
      website: branchData?.website ?? "",
      country_state_id: branchData?.country_state_id ?? 0,
      street1: branchData?.street1 ?? "",
      street2: branchData?.street2 ?? "",
      city: branchData?.city ?? "",
      postal_code: branchData?.postal_code ?? "",
      registered_for_vat: branchData?.registered_for_vat ?? false,
      tax_registration_number_label: branchData?.tax_registration_number_label ?? "",
      tax_registration_number: branchData?.tax_registration_number ?? "",
      vat_registered_on: branchData?.vat_registered_on ?? "",
    },
  });

  useEffect(() => {
    if (branchData) {
      setValue("branch_name_en", branchData.branch_name_en ?? "");
      setValue("branch_name_ar", branchData.branch_name_ar ?? "");
      setValue("email", branchData.email ?? "");
      setValue("mobile", branchData.mobile ?? "");
      setValue("website", branchData.website ?? "");
      setValue("country_state_id", branchData.country_state_id ?? 0);
      setValue("street1", branchData.street1 ?? "");
      setValue("street2", branchData.street2 ?? "");
      setValue("city", branchData.city ?? "");
      setValue("postal_code", branchData.postal_code ?? "");
      setValue("registered_for_vat", branchData.registered_for_vat ?? false);
      setValue("tax_registration_number_label", branchData.tax_registration_number_label ?? "");
      setValue("tax_registration_number", branchData.tax_registration_number ?? "");
      setValue("vat_registered_on", branchData.vat_registered_on ?? "");
    }
  }, [branchData, setValue]);

  const onSubmit = async (formData: any) => {
    const payload = {
      organization_id: organizationId,
      ...formData,
    };

    if (isUpdate && id) {
      await updateBranch.mutateAsync({
        id: Number(id),
        data: payload,
      });
    } else {
      await addBranch.mutateAsync(payload);
    }
  };

  return (
    <>
      <div className="py-4 px-1">
        <PageBreadcrumb
          baseLink="/branches"
          baseTitle="Branches"
          pageTitle={isUpdate ? "Update Branch" : "Create Branch"}
          icon={<Home className="w-4 h-4" />}
        />

        <ComponentCard title={isUpdate ? "Update Branch" : "Create Branch"}>
          {isUpdate && isLoading ? (
            <p>Loading Branch data...</p>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <div className="py-2">
                    <Label htmlFor="branch_name_ar">Name (Ar)</Label>
                    <Input
                      type="text"
                      id="branch_name_ar"
                      placeholder="Please Enter Branch Name (Ar)"
                      {...register("branch_name_ar")}
                      error={!!errors.branch_name_ar}
                      hint={errors.branch_name_ar?.message}
                      icon={<Tag className="w-4 h-4" />}
                    />
                  </div>
                  <div>
                    <Label htmlFor="branch_name_en">Name (En)</Label>
                    <Input
                      type="text"
                      id="branch_name_en"
                      placeholder="Enter branch name"
                      {...register("branch_name_en")}
                      error={!!errors.branch_name_en}
                      hint={errors.branch_name_en?.message}
                      icon={<Tag className="w-4 h-4" />}
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      type="email"
                      id="email"
                      placeholder="Enter branch email"
                      {...register("email")}
                      error={!!errors.email}
                      hint={errors.email?.message}
                    />
                  </div>
                  <div>
                    <Label htmlFor="mobile">Mobile</Label>
                    <Input
                      type="text"
                      id="mobile"
                      placeholder="Enter branch mobile number"
                      {...register("mobile")}
                      error={!!errors.mobile}
                      hint={errors.mobile?.message}
                    />
                  </div>
                  <div>
                    <Label htmlFor="website">Website</Label>
                    <Input
                      type="text"
                      id="website"
                      placeholder="Enter branch website"
                      {...register("website")}
                      error={!!errors.website}
                      hint={errors.website?.message}
                    />
                  </div>
                </div>

                <div>
                  <div className="py-2">
                    <Label htmlFor="country_state_id">Country/State ID</Label>
                    <Input
                      type="number"
                      id="country_state_id"
                      placeholder="Enter country/state ID"
                      {...register("country_state_id")}
                      error={!!errors.country_state_id}
                      hint={errors.country_state_id?.message}
                    />
                  </div>
                  <div>
                    <Label htmlFor="street1">Street 1</Label>
                    <Input
                      type="text"
                      id="street1"
                      placeholder="Enter street 1"
                      {...register("street1")}
                      error={!!errors.street1}
                      hint={errors.street1?.message}
                    />
                  </div>
                  <div>
                    <Label htmlFor="street2">Street 2</Label>
                    <Input
                      type="text"
                      id="street2"
                      placeholder="Enter street 2"
                      {...register("street2")}
                      error={!!errors.street2}
                      hint={errors.street2?.message}
                    />
                  </div>
                  <div>
                    <Label htmlFor="city">City</Label>
                    <Input
                      type="text"
                      id="city"
                      placeholder="Enter city"
                      {...register("city")}
                      error={!!errors.city}
                      hint={errors.city?.message}
                    />
                  </div>
                  <div>
                    <Label htmlFor="postal_code">Postal Code</Label>
                    <Input
                      type="text"
                      id="postal_code"
                      placeholder="Enter postal code"
                      {...register("postal_code")}
                      error={!!errors.postal_code}
                      hint={errors.postal_code?.message}
                    />
                  </div>
                  <div>
                    <Label htmlFor="registered_for_vat">Registered for VAT</Label>
                    <Input
                      type="checkbox"
                      id="registered_for_vat"
                      {...register("registered_for_vat")}
                      error={!!errors.registered_for_vat}
                    />
                  </div>
                  <div>
                    <Label htmlFor="tax_registration_number">Tax Registration Number</Label>
                    <Input
                      type="text"
                      id="tax_registration_number"
                      placeholder="Enter tax registration number"
                      {...register("tax_registration_number")}
                      error={!!errors.tax_registration_number}
                      hint={errors.tax_registration_number?.message}
                    />
                  </div>
                  <div>
                    <Label htmlFor="vat_registered_on">VAT Registered On</Label>
                    <Input
                      type="date"
                      id="vat_registered_on"
                      placeholder="Enter VAT registration date"
                      {...register("vat_registered_on")}
                      error={!!errors.vat_registered_on}
                      hint={errors.vat_registered_on?.message}
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
                    addBranch.isPending ||
                    updateBranch.isPending
                  }
                >
                  {(addBranch.isPending || updateBranch.isPending) && (
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
