import { useAddMapSetting, useFetchAllowedBranches, useFetchMapSettings, useUpdateMapSetting } from "@/hooks/settings/Accountant/useMapSettings";
import { zodResolver } from "@hookform/resolvers/zod";
import { GitBranch, User, UserCog2, Wallet } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { IoAdd, IoGitBranch } from "react-icons/io5";
import { useParams } from "react-router-dom";
import ComponentCard from "../../../components/common/ComponentCard";
import PageBreadcrumb from "../../../components/common/PageBreadCrumb";
import Label from "../../../components/form/Label";
import { useMeStore } from "../../../store/useMeStore";

import { mapsettingSchema, MapSettingType } from "@/components/lib/validations/mapSetting";
import { CustomSelect } from "@/components/ui/select/customSelect";
import { useFetchAccounts } from "@/hooks/settings/useAccounts";
import { useFetchBranches } from "@/hooks/settings/useBranches";
import { MapSettingForm } from "@/types/settings/map_setting";



export default function MapSettingsForm() {
  const { id } = useParams();
  const isUpdate = Boolean(id);
  const addMapSetting = useAddMapSetting();
  const updateMapSetting = useUpdateMapSetting();
  const organizationId = useMeStore((state) => state.organizationId);
  const [accountOptions, setAccountOptions] = useState<Array<{ value: string; label: string }>>([]);
  const [branchOptions, setBranchOptions] = useState<Array<{ value: string; label: string }>>([]);
  
  const { data: mapSettingsData, isLoading } = useFetchMapSettings();
  const { data: accounts } = useFetchAccounts();
  const { data: branches } = useFetchAllowedBranches();
  const { data: branchesU } = useFetchBranches();
//   console.log('Accounts:', accounts);
// console.log('Branches:', branches);
// console.log('Map Settings:', mapSettingsData);
  const {
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
    trigger,
    reset,
  } =
  //   useForm<MapSettingType>({
  //   resolver: zodResolver(mapsettingSchema),
  //   defaultValues: {
  //     branch_id: 0,
  //     customer_account_id: 0,
  //     vendor_account_id: 0,
  //     employee_account_id: 0,
  //     sale_account_id: 0,
  //     sale_return_account_id: 0,
  //     purchase_account_id: 0,
  //     purchase_return_account_id: 0,
  //     jobcard_account_id: 0,
  //   },
  // });
useForm<MapSettingType>({
  resolver: zodResolver(mapsettingSchema),
  defaultValues: {
    branch_id: undefined,
    customer_account_id: undefined,
    vendor_account_id: undefined,
    employee_account_id: undefined,
    sale_account_id: undefined,
    sale_return_account_id: undefined,
    purchase_account_id: undefined,
    purchase_return_account_id: undefined,
    jobcard_account_id: undefined,
  },
});
  // Initialize account options
  useEffect(() => {
    if (accounts) {
      setAccountOptions(
        accounts.map((account) => ({
          value: account.id?.toString() || "",
          label: account.account_name_en || "",
        }))
      );
    }
  }, [accounts]);

  // Initialize branch options
  // useEffect(() => {
  //   if (branches) {
  //     setBranchOptions(
  //       branches.map((branch) => ({
  //         value: branch.id?.toString() || "",
  //         label: branch.branch_name_en || "",
  //       }))
  //     );
  //   }
  // }, [branches]);
// Initialize branch options based on mode (create/update)
useEffect(() => {
  const branchesData = isUpdate ? branchesU : branches;
  if (branchesData) {
    setBranchOptions(
      branchesData.map((branch) => ({
        value: branch.id?.toString() || "",
        label: branch.branch_name_en || "",
      }))
    );
  }
}, [branches, branchesU, isUpdate]);
  // Initialize form values for update
  // useEffect(() => {
  //   if (isUpdate && id && mapSettingsData && Array.isArray(mapSettingsData)) {
  //     const setting = mapSettingsData.find(item => item.id === Number(id));
  //           console.log('Setting found for update:', setting); // Debug
  //     if (setting) {
  //       reset({
  //         branch_id: setting.branch_id ?? 0,
  //         customer_account_id: setting.customer_account_id ?? 0,
  //         vendor_account_id: setting.vendor_account_id ?? 0,
  //         employee_account_id: setting.employee_account_id ?? 0,
  //         sale_account_id: setting.sale_account_id ?? 0,
  //         sale_return_account_id: setting.sale_return_account_id ?? 0,
  //         purchase_account_id: setting.purchase_account_id ?? 0,
  //         purchase_return_account_id: setting.purchase_return_account_id ?? 0,
  //         jobcard_account_id: setting.jobcard_account_id ?? 0,
  //       });
  //     }
  //   }
  // }, [mapSettingsData, isUpdate, id, reset]);
useEffect(() => {
  if (isUpdate && id && mapSettingsData && branchesU) {
    const setting = mapSettingsData.find(item => item.id === Number(id));
    if (setting) {
      reset({
        branch_id: setting.branch_id,
        customer_account_id: setting.customer_account_id,
        vendor_account_id: setting.vendor_account_id,
        employee_account_id: setting.employee_account_id,
        sale_account_id: setting.sale_account_id,
        sale_return_account_id: setting.sale_return_account_id,
        purchase_account_id: setting.purchase_account_id,
        purchase_return_account_id: setting.purchase_return_account_id,
        jobcard_account_id: setting.jobcard_account_id,
      });
    }
  }
}, [mapSettingsData, isUpdate, id, reset,branchesU]);
  const handleSelectChange = async (name: keyof MapSettingType, value: string) => {
      console.log(`Field ${name} changed to:`, value); // Debug
    const numericValue = Number(value);
    if (!isNaN(numericValue)) {
      setValue(name, numericValue, { shouldValidate: true });
    }
    await trigger(name);
  };

//   const onSubmit = async (formData: MapSettingType) => {
//     const payload = {
//       organization_id: organizationId,
//       branch_id: formData.branch_id,
//       customer: formData.customer_account_id,
//       vendor: formData.vendor_account_id,
//       employee: formData.employee_account_id,
//       sale: formData.sale_account_id,
//       sale_return: formData.sale_return_account_id,
//       purchase: formData.purchase_account_id,
//       purchase_return: formData.purchase_return_account_id,
//       jobcard: formData.jobcard_account_id,
//     };
// console.log('Payload:', payload);
//     try {
//       if (isUpdate && id) {
//         await updateMapSetting.mutateAsync({
//           id: Number(id),
//           data: payload,
//         });
//       } else {
//         await addMapSetting.mutateAsync(payload);
//       }
//     } catch (error) {
//       console.error("Error submitting form:", error);
//     }
//   };

  const onSubmit = async (formData: MapSettingType) => {
  const payload: MapSettingForm = {
    organization_id: organizationId || undefined,
    branch_id: formData.branch_id,
    customer: formData.customer_account_id,
    vendor: formData.vendor_account_id,
    employee: formData.employee_account_id,
    sale: formData.sale_account_id,
    sale_return: formData.sale_return_account_id,
    purchase: formData.purchase_account_id,
    purchase_return: formData.purchase_return_account_id,
    jobcard: formData.jobcard_account_id,
  };

  try {
    if (isUpdate && id) {
      await updateMapSetting.mutateAsync({
        id: Number(id),
        data: payload,
      });
    } else {
      await addMapSetting.mutateAsync(payload);
    }
  } catch (error) {
    console.error("Error submitting form:", error);
  }
};


  return (
    <>
      <PageBreadcrumb
        baseLink="/map-settings"
        baseTitle="Map Settings"
        pageTitle={isUpdate ? "Update Map Settings" : "Create Map Settings"}
        icon={
          <div className="w-6 h-6 flex items-center justify-center dark:bg-gray-800 bg-gray-200 rounded-full">
            <IoAdd className="w-5 h-5" />
          </div>
        }
      />

      <ComponentCard title={isUpdate ? "Update Map Settings" : "Create Map Settings"}>
  {isUpdate && isLoading ? (
    <p>Loading map settings data...</p>
  ) : (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* Branch Section */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          <GitBranch className="w-5 h-5 text-blue-600" />
          <h2 className="text-xl font-semibold dark:text-gray-400">Branches</h2>
        </div>
        <div className="max-w-md">
          <Label>Select Branch</Label>
          <CustomSelect
            name="branch_id"
            options={branchOptions}
            placeholder="Select Branch"
            error={errors.branch_id?.message}
            onChange={(value) => handleSelectChange("branch_id", value)}
            isRequired={true}
                    icon={<IoGitBranch className="w-4 h-4" />}
                  value={watch('branch_id')?.toString()}
          />
        </div>
      </div>

      {/* Accounts Section */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          <UserCog2 className="w-5 h-5 text-green-600" />
          <h2 className="text-xl font-semibold dark:text-gray-400">Accounts</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Column 1 */}
          <div className="space-y-4">
            {/* Customer Account */}
            <div>
              <Label>Customer Account</Label>
              <CustomSelect
                name="customer_account_id"
                options={accountOptions}
                placeholder="Select Customer Account"
                error={errors.customer_account_id?.message}
                onChange={(value) => handleSelectChange("customer_account_id", value)}
                isRequired={true}
                        icon={<User className="w-4 h-4" />}
                         value={watch('customer_account_id')?.toString()}
              />
            </div>

            {/* Vendor Account */}
            <div>
              <Label>Vendor Account</Label>
              <CustomSelect
                name="vendor_account_id"
                options={accountOptions}
                placeholder="Select Vendor Account"
                error={errors.vendor_account_id?.message}
                onChange={(value) => handleSelectChange("vendor_account_id", value)}
                isRequired={true}
                        icon={<User className="w-4 h-4" />}
                          value={watch('vendor_account_id')?.toString()}
              />
            </div>

            {/* Employee Account */}
            <div>
              <Label>Employee Account</Label>
              <CustomSelect
                name="employee_account_id"
                options={accountOptions}
                placeholder="Select Employee Account"
                error={errors.employee_account_id?.message}
                onChange={(value) => handleSelectChange("employee_account_id", value)}
                isRequired={true}
                        icon={<User className="w-4 h-4" />}
                          value={watch('employee_account_id')?.toString()}
                   
              />
            </div>
            
            {/* Jobcard Account */}
            <div>
              <Label>Jobcard Account</Label>
              <CustomSelect
                name="jobcard_account_id"
                options={accountOptions}
                placeholder="Select Jobcard Account"
                error={errors.jobcard_account_id?.message}
                onChange={(value) => handleSelectChange("jobcard_account_id", value)}
                isRequired={true}
                        icon={<User className="w-4 h-4" />}
                          value={watch('jobcard_account_id')?.toString()}
              />
            </div>
          </div>

          {/* Column 2 */}
          <div className="space-y-4">
            {/* Sale Account */}
            <div>
              <Label>Sale Account</Label>
              <CustomSelect
                name="sale_account_id"
                options={accountOptions}
                placeholder="Select Sale Account"
                error={errors.sale_account_id?.message}
                onChange={(value) => handleSelectChange("sale_account_id", value)}
                isRequired={true}
                        icon={<Wallet className="w-4 h-4" />}
                         value={watch('sale_account_id')?.toString()}
              />
            </div>

            {/* Sale Return Account */}
            <div>
              <Label>Sale Return Account</Label>
              <CustomSelect
                name="sale_return_account_id"
                options={accountOptions}
                placeholder="Select Sale Return Account"
                error={errors.sale_return_account_id?.message}
                onChange={(value) => handleSelectChange("sale_return_account_id", value)}
                isRequired={true}
                        icon={<Wallet className="w-4 h-4" />}
                              value={watch('sale_return_account_id')?.toString()}
              />
            </div>

            {/* Purchase Account */}
            <div>
              <Label>Purchase Account</Label>
              <CustomSelect
                name="purchase_account_id"
                options={accountOptions}
                placeholder="Select Purchase Account"
                error={errors.purchase_account_id?.message}
                onChange={(value) => handleSelectChange("purchase_account_id", value)}
                isRequired={true}
                        icon={<Wallet className="w-4 h-4" />}
                         value={watch('purchase_account_id')?.toString()}
              />
            </div>

            {/* Purchase Return Account */}
            <div>
              <Label>Purchase Return Account</Label>
              <CustomSelect
                name="purchase_return_account_id"
                options={accountOptions}
                placeholder="Select Purchase Return Account"
                error={errors.purchase_return_account_id?.message}
                onChange={(value) => handleSelectChange("purchase_return_account_id", value)}
                isRequired={true}
                        icon={<Wallet className="w-4 h-4" />}
                         value={watch('purchase_return_account_id')?.toString()}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <div className="flex justify-end mt-6">
        <button
          type="submit"
          className="px-6 py-3 text-sm font-medium disabled:opacity-50 text-white transition rounded-lg shadow-theme-xs bg-[#465FFF] hover:bg-[#465FFF] flex items-center gap-2"
          disabled={isSubmitting || addMapSetting.isPending || updateMapSetting.isPending}
        >
          {(addMapSetting.isPending || updateMapSetting.isPending) && (
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