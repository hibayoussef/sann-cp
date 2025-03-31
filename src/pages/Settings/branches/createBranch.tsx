import { branchSchema, BranchType } from "@/components/lib/validations/branch";
import {
  useAddBranch,
  useFetchBranch,
  useUpdateBranch,
} from "@/hooks/settings/useBranches";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Calendar,
  CreditCard,
  Flag,
  Folder,
  Globe,
  Home,
  Mail,
  MapPin,
  Phone,
  Tag,
} from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import ComponentCard from "../../../components/common/ComponentCard";
import PageBreadcrumb from "../../../components/common/PageBreadCrumb";
import Input from "../../../components/form/input/InputField";
import Label from "../../../components/form/Label";
import Switch from "../../../components/form/switch/Switch";
import { useMeStore } from "../../../store/useMeStore";
import { IoAdd } from "react-icons/io5";
import Loader from "@/components/ui/loader/loader";
import { useFetchCountries } from "@/hooks/useCommon";

export default function CreateBranch() {
  const { id } = useParams();
  const isUpdate = Boolean(id);
  const addBranch = useAddBranch();
  const updateBranch = useUpdateBranch();
  const { data: countries } = useFetchCountries();

  const organizationId = useMeStore((state) => state.organizationId);

  const { data: branchData, isLoading }: any = useFetchBranch(Number(id), {
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
      registered_for_vat: branchData?.registered_for_vat ?? 0,
      tax_registration_number_label:
        branchData?.tax_registration_number_label ?? "",
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
      setValue("registered_for_vat", branchData.registered_for_vat ?? 0)
      setValue(
        "tax_registration_number_label",
        branchData.tax_registration_number_label ?? ""
      );
      setValue(
        "tax_registration_number",
        branchData.tax_registration_number ?? ""
      );
      setValue("vat_registered_on", branchData.vat_registered_on ?? "");
    }
  }, [branchData, setValue]);

  const onSubmit = async (formData: any) => {
    const payload = {
      organization_id: organizationId,
      country_state_id: Number(formData.country_state_id),
      ...formData,
    };

    if (isUpdate && id) {
      const updatedPayload = {
        ...payload,
        _method: "PUT",
      };
      await updateBranch.mutateAsync({ id: Number(id), data: updatedPayload });
    } else {
      await addBranch.mutateAsync(payload);
    }
  };

  console.log("eror: ", errors);

  return (
    <div className="py-4 px-1">
      <PageBreadcrumb
        baseLink="/branches"
        baseTitle="Branches"
        pageTitle={isUpdate ? "Update Branch" : "Create Branch"}
        icon={
          <div className="w-6 h-6 flex items-center justify-center dark:bg-gray-800 bg-gray-200 rounded-full">
            <IoAdd className="w-5 h-5" />
          </div>
        }
      />
      <ComponentCard title={isUpdate ? "Update Branch" : "Create Branch"}>
        {isUpdate && isLoading ? (
          <Loader />
        ) : (
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              <div>
                <Label htmlFor="branch_name_ar">Name (Ar)</Label>
                <Input
                  type="text"
                  id="branch_name_ar"
                  placeholder="Enter name (Ar)"
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
                  placeholder="Enter name (En)"
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
                  placeholder="Enter email"
                  {...register("email")}
                  error={!!errors.email}
                  hint={errors.email?.message}
                  icon={<Mail className="w-4 h-4" />}
                />
              </div>
              <div>
                <Label htmlFor="mobile">Mobile</Label>
                <Input
                  type="text"
                  id="mobile"
                  placeholder="Enter mobile"
                  {...register("mobile")}
                  error={!!errors.mobile}
                  hint={errors.mobile?.message}
                  icon={<Phone className="w-4 h-4" />}
                />
              </div>
              <div>
                <Label htmlFor="website">Website</Label>
                <Input
                  type="text"
                  id="website"
                  placeholder="Enter website"
                  {...register("website")}
                  error={!!errors.website}
                  hint={errors.website?.message}
                  icon={<Globe className="w-4 h-4" />}
                />
              </div>
              <div>
                <Label>
                  Country
                  <span className="text-error-500">*</span>
                </Label>
                <div className="relative">
                  <select
                    {...register("country_state_id", { valueAsNumber: true })}
                    className="text-sm rounded-lg border dark:bg-gray-900 dark:text-gray-400 border-gray-300 shadow-sm w-full pl-10 pr-3 py-1.5 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors duration-200 ease-in-out"
                  >
                    <option value="" disabled selected>
                      Select a location
                    </option>
                    {countries?.data?.map((country) => (
                      <option key={country.id} value={country.id}>
                        {country.name_en}
                      </option>
                    ))}
                  </select>
                  <Flag className="absolute left-3 top-2.5 w-4 h-4 text-gray-500" />
                </div>
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
                  icon={<MapPin className="w-4 h-4" />}
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
                  icon={<MapPin className="w-4 h-4" />}
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
                  icon={<MapPin className="w-4 h-4" />}
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
                  icon={<MapPin className="w-4 h-4" />}
                />
              </div>
              <div>
                <Label htmlFor="tax_registration_number">
                  Tax Registration Number
                </Label>
                <Input
                  type="text"
                  id="tax_registration_number"
                  placeholder="Enter tax registration number"
                  {...register("tax_registration_number")}
                  error={!!errors.tax_registration_number}
                  hint={errors.tax_registration_number?.message}
                  icon={<CreditCard className="w-4 h-4" />}
                />
              </div>
              <div>
                <Label htmlFor="vat_registered_on">VAT Registered On</Label>
                <Input
                  type="date"
                  id="vat_registered_on"
                  {...register("vat_registered_on")}
                  error={!!errors.vat_registered_on}
                  hint={errors.vat_registered_on?.message}
                  icon={<Calendar className="w-4 h-4" />}
                />
              </div>
              <div>
                <Label htmlFor="tax_registration_number_label">
                  Tax Registration Number Label
                </Label>
                <Input
                  type="text"
                  id="tax_registration_number_label"
                  placeholder="Enter tax registration number label"
                  {...register("tax_registration_number_label")}
                  error={!!errors.tax_registration_number_label}
                  hint={errors.tax_registration_number_label?.message}
                  icon={<Tag className="w-4 h-4" />}
                />
              </div>
              <div key="registered_for_vat">
                <Label htmlFor="registered_for_vat">Registered for VAT</Label>
                  <Switch
                    label=""
                    defaultChecked={branchData?.registered_for_vat === 1}
                    onChange={(checked) =>
                      setValue("registered_for_vat", checked ? 1 : 0)
                    }
                  />
              </div>
            </div>

            <div className="flex justify-end mt-6">
              <button
                type="submit"
                className="px-6 py-3 text-sm font-medium disabled:opacity-50 text-white transition rounded-lg shadow-theme-xs bg-[#465FFF] hover:bg-[#465FFF] flex items-center gap-2"
                disabled={
                  isSubmitting || addBranch.isPending || updateBranch.isPending
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
  );
}
