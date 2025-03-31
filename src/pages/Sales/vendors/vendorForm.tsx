import Radio from "@/components/form/input/Radio";
import {
  customerSchema,
  type CustomerType,
} from "@/components/lib/validations/customer";
import {
  useAddContact,
  useFetchContact,
  useUpdateContact,
} from "@/hooks/sales/contacts";
import { useFetchBranches } from "@/hooks/settings/useBranches";
import { useFetchPaymentTerms } from "@/hooks/settings/usePaymentTerm";
import { useFetchCountries, useFetchCurrencies } from "@/hooks/useCommon";
import type { Currency } from "@/types/common";
import { IContact } from "@/types/sales/contact";
import type { IBranch } from "@/types/settings/branches";
import type { IPaymentTerm } from "@/types/settings/payment_term";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Badge,
  Briefcase,
  Building,
  Building2,
  Calendar,
  CreditCard,
  Facebook,
  FileText,
  Globe,
  IdCard,
  Inbox,
  Info,
  Landmark,
  Mail,
  MapPin,
  MessageSquareText,
  Package,
  Phone,
  User,
  UserCheck,
  UserCircle,
  Wallet
} from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaXRay } from "react-icons/fa";
import { IoAdd, IoSwapHorizontal } from "react-icons/io5";
import { useParams } from "react-router-dom";
import ComponentCard from "../../../components/common/ComponentCard";
import PageBreadcrumb from "../../../components/common/PageBreadCrumb";
import Input from "../../../components/form/input/InputField";
import Label from "../../../components/form/Label";
import { useMeStore } from "../../../store/useMeStore";

const TABS = [
  { id: 1, name: "Other Details" },
  { id: 2, name: "Contact Details" },
  { id: 3, name: "Address" },
  { id: 4, name: "Contact Person" }

];

const getErrorMessages = (errors: any, parentKey = ""): string[] => {
  return Object.entries(errors).flatMap(([key, value]: [string, any]) => {
    if (value?.message) {
      return [`${parentKey ? `${parentKey} > ` : ""}${key}: ${value.message}`];
    }
    if (Array.isArray(value)) {
      return value.flatMap((item, index) =>
        getErrorMessages(item, `Person Details[${index}]`)
      );
    }
    if (typeof value === "object") {
      return getErrorMessages(value, key);
    }
    return [];
  });
};
const selectStyles = `
  w-full text-sm rounded-lg border border-gray-300 shadow-sm 
  focus:border-blue-500 focus:ring-1 focus:ring-blue-500 
  transition-colors duration-200 ease-in-out p-1.5
  text-gray-500 dark:bg-gray-900
`;
export default function VendorForm() {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState(1);
  const isUpdate = Boolean(id);
  const addCustomer = useAddContact();
  const updateCustomer = useUpdateContact();
  const organizationId = useMeStore((state) => state.organizationId);

  const { data: customerData, isLoading } = useFetchContact(Number(id), {
    enabled: isUpdate,
  });
  const { data: branches } = useFetchBranches();
  const { data: paymentsTerm } = useFetchPaymentTerms();
  const { data: currencies } = useFetchCurrencies();
  const { data: countriesData } = useFetchCountries();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<CustomerType>({
    resolver: zodResolver(customerSchema),
    // defaultValues: customerData ?? {},
  });

  const contactType = watch("contact_type");

  // useEffect(() => {
  //   if (customerData) {
  //     Object.keys(customerData).forEach((key) => {
  //       setValue(key, customerData[key]);
  //     });
  //   }
  // }, [customerData, setValue]);
  console.log(errors);
  const onSubmit = (formData: CustomerType) => {
    const payload: any = {
      ...formData,
      organization_id: organizationId?.toString()!,
      type: "vendor",
    };

    console.log(payload);
    if (isUpdate && id) {
      updateCustomer.mutateAsync({ id: Number(id), data: payload });
    } else {
      addCustomer.mutateAsync(payload);
    }
  };

  return (
    <>
      <PageBreadcrumb
        baseLink="/vendors"
        baseTitle="Vendors"
        pageTitle={isUpdate ? "Update Vendor" : "Create Vendor"}
        icon={
          <div className="w-6 h-6 flex items-center justify-center bg-gray-200 rounded-full">
            <IoAdd className="w-5 h-5" />
          </div>
        }
      />
      <ComponentCard title={isUpdate ? "Update Vendor" : "Create Vendor"}>
        {isUpdate && isLoading ? (
          <p>Loading customer data...</p>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 ">
              {/* Contact Type */}
              <div className="space-y-2">
                <div className="flex items-center gap-4">
                  <Label className="mb-0">Customer Type</Label>{" "}
                  <div className="flex items-center gap-6">
                    <Radio
                      id="individual"
                      name="contact_type"
                      value="individual"
                      checked={contactType === "individual"}
                      onChange={(value) =>
                        setValue(
                          "contact_type",
                          value as "business" | "individual"
                        )
                      }
                      label="Individual"
                      className="flex items-center gap-2"
                    />
                    <Radio
                      id="business"
                      name="contact_type"
                      value="business"
                      checked={contactType === "business"}
                      onChange={(value) =>
                        setValue(
                          "contact_type",
                          value as "business" | "individual"
                        )
                      }
                      label="Business"
                      className="flex items-center gap-2"
                    />
                  </div>
                </div>
                {errors.contact_type && (
                  <p className="text-red-500 text-sm">
                    {errors.contact_type.message}
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              {/* Primary Contact */}
              <div className="space-y-2">
                <div className="space-y-2">
                  <Label>Full Name (En)</Label>
                  <Input
                    {...register("full_name_en")}
                    error={!!errors.full_name_en}
                    hint={errors.full_name_en?.message}
                    icon={<Info className="w-4 h-4" />}
                    placeholder="Please Enter Your Full Name (En)"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Full Name (Ar)</Label>
                  <Input
                    {...register("full_name_ar")}
                    error={!!errors.full_name_ar}
                    hint={errors.full_name_ar?.message}
                    icon={<Info className="w-4 h-4" />}
                    placeholder="Please Enter Your Full Name (Ar)"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <div className="space-y-2">
                  <Label>First Name (En)</Label>
                  <Input
                    {...register("first_name_en")}
                    error={!!errors.first_name_en}
                    hint={errors.first_name_en?.message}
                    icon={<Info className="w-4 h-4" />}
                    placeholder="Please Enter Your First Name (En)"
                  />
                </div>

                <div className="space-y-2">
                  <Label>First Name (Ar)</Label>
                  <Input
                    {...register("first_name_ar")}
                    error={!!errors.first_name_ar}
                    hint={errors.first_name_ar?.message}
                    icon={<Info className="w-4 h-4" />}
                    placeholder="Please Enter Your First Name (Ar)"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <div className="space-y-2">
                  <Label>Last Name (En)</Label>
                  <Input
                    {...register("last_name_en")}
                    error={!!errors.last_name_en}
                    hint={errors.last_name_en?.message}
                    icon={<Info className="w-4 h-4" />}
                    placeholder="Please Enter Your Last Name (En)"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Last Name (Ar)</Label>
                  <Input
                    {...register("last_name_ar")}
                    error={!!errors.last_name_ar}
                    hint={errors.last_name_ar?.message}
                    icon={<Info className="w-4 h-4" />}
                    placeholder="Please Enter Your Last Name (Ar)"
                  />
                </div>
              </div>

              {/* Contact Info */}

              <div className="space-y-2">
                <Label>Email Address</Label>
                <Input
                  type="email"
                  {...register("email")}
                  error={!!errors.email}
                  hint={errors.email?.message}
                  placeholder="contact@example.com"
                  icon={<Mail className="w-4 h-4" />}
                />
              </div>

              <div className="space-y-2">
                <Label>Phone Number</Label>
                <Input
                  type="tel"
                  {...register("mobile")}
                  error={!!errors.mobile}
                  hint={errors.mobile?.message}
                  placeholder="+966 123 456 789"
                  icon={<Phone className="w-4 h-4" />}
                />
              </div>
            </div>
            {/* </div> */}

            {/* Tabs Section */}
            <div className="bg-white p-6 rounded-lg shadow-sm border dark:bg-gray-900 border-gray-100">
              <div className="border-b border-gray-200 mb-6">
                <nav className="flex space-x-4">
                  {TABS.map((tab) => (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setActiveTab(tab.id)}
                      className={`px-4 py-2 text-sm font-medium transition-colors ${
                        activeTab === tab.id
                          ? "text-blue-600 border-b-2 border-blue-600"
                          : "text-gray-500 hover:text-gray-700"
                      }`}
                    >
                      {tab.name}
                    </button>
                  ))}
                </nav>
              </div>

              {/* Other Details Tab */}
              {activeTab === 1 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>Nationality</Label>
                      <select
                        {...register("nationality_id")}
                        className={selectStyles}
                      >
                        <option value="" disabled>
                          Select Nationality
                        </option>
                        {countriesData?.data?.map((country) => (
                          <option key={country.id} value={country.id}>
                            {country.nationality_en}{" "}
                          </option>
                        ))}
                      </select>
                      {errors.nationality_id && (
                        <p className="text-red-500 text-sm">
                          {errors.nationality_id.message}
                        </p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label>Branch</Label>
                      <select
                        {...register("branch_id")}
                        className={selectStyles}
                      >
                        <option value="" disabled>
                          Select Branch
                        </option>
                        {branches?.map((branch: IBranch) => (
                          <option key={branch.id} value={branch.id}>
                            {branch.branch_name_en}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="space-y-2">
                      <Label>Payment Terms</Label>
                      <select
                        {...register("payment_term_id")}
                        className={selectStyles}
                      >
                        <option value="" disabled>
                          Select Payment Term
                        </option>
                        {paymentsTerm?.map((term: IPaymentTerm) => (
                          <option key={term.id} value={term.id}>
                            {term.term_name_en}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="space-y-2">
                      <Label>Currency</Label>
                      <select
                        {...register("currency_id")}
                        className={selectStyles}
                      >
                        <option value="" disabled>
                          Select Currency
                        </option>
                        {currencies?.data.map((currency: Currency) => (
                          <option key={currency.id} value={currency.id}>
                            {currency.currency_name} ({currency.currency_symbol}
                            )
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="space-y-2">
                      <div className="space-y-2">
                        <Label>Exchange Rate</Label>
                        <Input
                          type="number"
                          {...register("exchange_rate")}
                          error={!!errors.exchange_rate}
                          hint={errors.exchange_rate?.message}
                          placeholder="1.00"
                          icon={<IoSwapHorizontal className="w-4 h-4" />}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>Portal Access</Label>
                      <select
                        {...register("portal_access")}
                        className={selectStyles}
                      >
                        <option value="" disabled>
                          Select Access
                        </option>
                        <option value="1">Enabled</option>
                        <option value="0">Disabled</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <Label>Portal Language</Label>
                      <select
                        {...register("portal_language")}
                        className={selectStyles}
                      >
                        <option value="" disabled>
                          Select Language
                        </option>
                        <option value="en">English</option>
                        <option value="ar">Arabic</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <Label>Balance</Label>
                      <Input
                        type="number"
                        step={0.01}
                        {...register("balance")}
                        error={!!errors.balance}
                        hint={errors.balance?.message}
                        placeholder="Enter balance amount"
                        icon={<Wallet className="w-4 h-4" />}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Address Tab */}
              {activeTab === 2 && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                      <Label>Passport Number</Label>
                      <Input
                        {...register("contact_details.passport_number")}
                        error={!!errors.contact_details?.passport_number}
                        hint={errors.contact_details?.passport_number?.message}
                        placeholder="Enter passport number"
                        icon={<FileText className="w-4 h-4" />}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Work Phone</Label>
                      <Input
                        {...register("contact_details.work_phone")}
                        error={!!errors.contact_details?.work_phone}
                        hint={errors.contact_details?.work_phone?.message}
                        type="tel"
                        placeholder="Enter work phone"
                        icon={<Phone className="w-4 h-4" />}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Website URL</Label>
                      <Input
                        {...register("contact_details.website_url")}
                        error={!!errors.contact_details?.website_url}
                        hint={errors.contact_details?.website_url?.message}
                        type="url"
                        placeholder="Enter website URL"
                        icon={<Globe className="w-4 h-4" />}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Department</Label>
                      <Input
                        {...register("contact_details.department")}
                        error={!!errors.contact_details?.department}
                        hint={errors.contact_details?.department?.message}
                        placeholder="Enter department name"
                        icon={<Building className="w-4 h-4" />}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Profession</Label>
                      <Input
                        {...register("contact_details.profession")}
                        error={!!errors.contact_details?.profession}
                        hint={errors.contact_details?.profession?.message}
                        placeholder="Enter profession"
                        icon={<Briefcase className="w-4 h-4" />}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Designation</Label>
                      <Input
                        {...register("contact_details.designation")}
                        error={!!errors.contact_details?.designation}
                        hint={errors.contact_details?.designation?.message}
                        placeholder="Enter designation"
                        icon={<Badge className="w-4 h-4" />}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Social Media</Label>
                      <Input
                        {...register("contact_details.social_media")}
                        error={!!errors.contact_details?.social_media}
                        hint={errors.contact_details?.social_media?.message}
                        placeholder="Enter social media profile/link"
                        icon={<Globe className="w-4 h-4" />}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Issued Date</Label>
                      <Input
                        {...register("contact_details.id_issued_date")}
                        error={!!errors.contact_details?.id_issued_date}
                        hint={errors.contact_details?.id_issued_date?.message}
                        type="date"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Expiry Date</Label>
                      <Input
                        {...register("contact_details.id_expiry_date")}
                        error={!!errors.contact_details?.id_expiry_date}
                        hint={errors.contact_details?.id_expiry_date?.message}
                        type="date"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Unified Number</Label>
                      <Input
                        {...register("contact_details.unified_number")}
                        error={!!errors.contact_details?.unified_number}
                        hint={errors.contact_details?.unified_number?.message}
                        type="number"
                        placeholder="Enter unified number"
                        icon={<IdCard className="w-4 h-4" />}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Date of birth</Label>
                      <Input
                        {...register("contact_details.date_of_birth")}
                        error={!!errors.contact_details?.date_of_birth}
                        hint={errors.contact_details?.date_of_birth?.message}
                        type="date"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Place of birth</Label>
                      <Input
                        {...register("contact_details.place_of_birth")}
                        error={!!errors.contact_details?.place_of_birth}
                        hint={errors.contact_details?.place_of_birth?.message}
                        type="date"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label> Visa Number</Label>
                      <div className="relative group">
                        <Input
                          {...register("contact_details.visit_visa_number", {
                            valueAsNumber: true,
                          })}
                          error={!!errors.contact_details?.visit_visa_number}
                          hint={
                            errors.contact_details?.visit_visa_number?.message
                          }
                          type="number"
                          className="pl-12"
                          placeholder="Enter visit visa number"
                        />
                        <div className="absolute inset-y-0 left-0 flex items-center px-3 pointer-events-none bg-gray-50 border-r border-gray-300 rounded-l-md group-focus-within:border-blue-500 dark:bg-gray-800 dark:border-gray-700">
                          <svg
                            className="w-5 h-5 text-gray-500 dark:text-gray-400"
                            viewBox="0 0 20 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <circle
                              cx="6.25"
                              cy="10"
                              r="5.625"
                              fill="#E80B26"
                            />
                            <circle
                              cx="13.75"
                              cy="10"
                              r="5.625"
                              fill="#F59D31"
                            />
                            <path
                              d="M10 14.1924C11.1508 13.1625 11.875 11.6657 11.875 9.99979C11.875 8.33383 11.1508 6.8371 10 5.80713C8.84918 6.8371 8.125 8.33383 8.125 9.99979C8.125 11.6657 8.84918 13.1625 10 14.1924Z"
                              fill="#FC6020"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Driving License Number</Label>
                      <Input
                        {...register("contact_details.driving_license_number")}
                        error={!!errors.contact_details?.driving_license_number}
                        hint={
                          errors.contact_details?.driving_license_number
                            ?.message
                        }
                        type="number"
                        placeholder="Enter driving license number"
                        icon={<CreditCard className="w-4 h-4" />}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Driving License Issued By</Label>
                      <Input
                        {...register(
                          "contact_details.driving_license_issued_by"
                        )}
                        error={
                          !!errors.contact_details?.driving_license_issued_by
                        }
                        hint={
                          errors.contact_details?.driving_license_issued_by
                            ?.message
                        }
                        placeholder="Enter issuing authority"
                        icon={<Building className="w-4 h-4" />}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Driving License Issued Date</Label>
                      <Input
                        {...register(
                          "contact_details.driving_license_issued_date"
                        )}
                        error={
                          !!errors.contact_details?.driving_license_issued_date
                        }
                        hint={
                          errors.contact_details?.driving_license_issued_date
                            ?.message
                        }
                        type="date"
                        icon={<Calendar className="w-4 h-4" />}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Driving License Expiry Date</Label>
                      <Input
                        {...register(
                          "contact_details.driving_license_expiry_date"
                        )}
                        error={
                          !!errors.contact_details?.driving_license_expiry_date
                        }
                        hint={
                          errors.contact_details?.driving_license_expiry_date
                            ?.message
                        }
                        type="date"
                        icon={<Calendar className="w-4 h-4 text-red-500" />}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Home Address</Label>
                      <Input
                        {...register("contact_details.home_address")}
                        error={!!errors.contact_details?.home_address}
                        hint={errors.contact_details?.home_address?.message}
                        placeholder="Enter home address"
                        icon={<MapPin className="w-4 h-4" />}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Work Address</Label>
                      <Input
                        {...register("contact_details.work_address")}
                        error={!!errors.contact_details?.work_address}
                        hint={errors.contact_details?.work_address?.message}
                        placeholder="Enter work address"
                        icon={<Building2 className="w-4 h-4" />}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>P.O. Box</Label>
                      <Input
                        {...register("contact_details.p_o_box")}
                        error={!!errors.contact_details?.p_o_box}
                        hint={errors.contact_details?.p_o_box?.message}
                        placeholder="Enter P.O. Box number"
                        icon={<Inbox className="w-4 h-4" />}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Contact Person Tab */}
              {activeTab === 4 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>Salutation (Ar)</Label>
                      <Input
                        {...register("contact_persons.0.salutation_ar")}
                        error={!!errors.contact_persons?.["0"]?.salutation_ar}
                        hint={
                          errors.contact_persons?.["0"]?.salutation_ar?.message
                        }
                        placeholder="Enter salutation in Arabic"
                        icon={<MessageSquareText className="w-4 h-4" />}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Salutation (En)</Label>
                      <Input
                        {...register("contact_persons.0.salutation_en")}
                        error={!!errors.contact_persons?.["0"]?.salutation_en}
                        hint={
                          errors.contact_persons?.["0"]?.salutation_en?.message
                        }
                        placeholder="Enter salutation in English"
                        icon={<MessageSquareText className="w-4 h-4" />}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Full Name (Ar)</Label>
                      <Input
                        {...register("contact_persons.0.full_name_ar")}
                        error={!!errors.contact_persons?.["0"]?.full_name_ar}
                        hint={
                          errors.contact_persons?.["0"]?.full_name_ar?.message
                        }
                        placeholder="Enter full name in Arabic"
                        icon={<User className="w-4 h-4" />}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Full Name (En)</Label>
                      <Input
                        {...register("contact_persons.0.full_name_en")}
                        error={!!errors.contact_persons?.["0"]?.full_name_en}
                        hint={
                          errors.contact_persons?.["0"]?.full_name_en?.message
                        }
                        placeholder="Enter full name in English"
                        icon={<User className="w-4 h-4" />}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>First Name (Ar)</Label>
                      <Input
                        {...register("contact_persons.0.first_name_ar")}
                        error={!!errors.contact_persons?.["0"]?.first_name_ar}
                        hint={
                          errors.contact_persons?.["0"]?.first_name_ar?.message
                        }
                        placeholder="Enter full name in Arabic"
                        icon={<UserCircle className="w-4 h-4" />}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>First Name (En)</Label>
                      <Input
                        {...register("contact_persons.0.first_name_en")}
                        error={!!errors.contact_persons?.["0"]?.first_name_en}
                        hint={
                          errors.contact_persons?.["0"]?.first_name_en?.message
                        }
                        placeholder="Enter first name in English"
                        icon={<UserCircle className="w-4 h-4" />}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Last Name (Ar)</Label>
                      <Input
                        {...register("contact_persons.0.last_name_ar")}
                        error={!!errors.contact_persons?.["0"]?.last_name_ar}
                        hint={
                          errors.contact_persons?.["0"]?.last_name_ar?.message
                        }
                        placeholder="Enter full name in Arabic"
                        icon={<UserCheck className="w-4 h-4" />}
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>Last Name (En)</Label>
                      <Input
                        {...register("contact_persons.0.last_name_en")}
                        error={!!errors.contact_persons?.["0"]?.last_name_en}
                        hint={
                          errors.contact_persons?.["0"]?.last_name_en?.message
                        }
                        placeholder="Enter last name in English"
                        icon={<User className="w-4 h-4" />}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Email</Label>
                      <Input
                        type="email"
                        {...register("contact_persons.0.email")}
                        error={!!errors.contact_persons?.[0]?.email}
                        hint={errors.contact_persons?.[0]?.email?.message}
                        placeholder="Enter your email"
                        icon={<Mail className="w-4 h-4" />}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Phone</Label>
                      <Input
                        type="tel"
                        {...register("contact_persons.0.mobile")}
                        error={!!errors.contact_persons?.[0]?.mobile}
                        hint={errors.contact_persons?.[0]?.mobile?.message}
                        placeholder="Enter phone number"
                        icon={<Phone className="w-4 h-4" />}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Designation</Label>
                      <Input
                        {...register("contact_persons.0.designation")}
                        error={!!errors.contact_persons?.[0]?.designation}
                        hint={errors.contact_persons?.[0]?.designation?.message}
                        placeholder="Enter designation"
                        icon={<Briefcase className="w-4 h-4" />}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Department</Label>
                      <Input
                        {...register("contact_persons.0.department")}
                        error={!!errors.contact_persons?.[0]?.department}
                        hint={errors.contact_persons?.[0]?.department?.message}
                        placeholder="Enter department"
                        icon={<Building className="w-4 h-4" />}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Social Media</Label>
                      <Input
                        {...register("contact_persons.0.social_media")}
                        error={!!errors.contact_persons?.[0]?.social_media}
                        hint={
                          errors.contact_persons?.[0]?.social_media?.message
                        }
                        placeholder="Enter social media handle"
                        icon={<Facebook className="w-4 h-4" />}
                      />
                    </div>
                  </div>
                </div>
                )}
                {activeTab === 3 && (
                <div className="space-y-4">
                 
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-gray-800">
                        Billing Address
                      </h3>
                      <div className="space-y-2">
                        <Label>Billing Address Attention</Label>
                        <Input
                          {...register(
                            "contact_details.billing_address_attention"
                          )}
                          error={
                            !!errors.contact_details?.billing_address_attention
                          }
                          hint={
                            errors.contact_details?.billing_address_attention
                              ?.message
                          }
                          icon={<FileText className="w-4 h-4" />}
                          placeholder="Please enter your shipping address attention"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Billing Address Country</Label>
                        <select
                          {...register(
                            "contact_details.billing_address_country_id"
                          )}
                          className={selectStyles}

                          // disabled={countriesLoading}
                        >
                          <option value="" disabled>
                            Select Country
                          </option>

                          {countriesData?.data?.map((country) => (
                            <option key={country.id} value={country.id}>
                              {country.name_en}{" "}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="space-y-2">
                        <Label>Street Address 1</Label>
                        <Input
                          {...register(
                            "contact_details.billing_address_street_1"
                          )}
                          error={
                            !!errors.contact_details?.billing_address_street_1
                          }
                          hint={
                            errors.contact_details?.billing_address_street_1
                              ?.message
                          }
                          icon={<MapPin className="w-4 h-4" />}
                          placeholder="Please Enter Your street address 1"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Street Address 2</Label>
                        <Input
                          {...register(
                            "contact_details.billing_address_street_2"
                          )}
                          error={
                            !!errors.contact_details?.billing_address_street_2
                          }
                          hint={
                            errors.contact_details?.billing_address_street_2
                              ?.message
                          }
                          icon={<MapPin className="w-4 h-4" />}
                          placeholder="Please Enter Your street address 1"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>City</Label>
                          <Input
                            {...register(
                              "contact_details.billing_address_city"
                            )}
                            error={
                              !!errors.contact_details?.billing_address_city
                            }
                            hint={
                              errors.contact_details?.billing_address_city
                                ?.message
                            }
                            icon={<MapPin className="w-4 h-4" />}
                            placeholder="Please Enter Your City"
                          />
                        </div>
                        <div>
                          <Label>State</Label>
                          <select
                            {...register(
                              "contact_details.shipping_address_country_state_id"
                            )}
                            className={selectStyles}

                            // disabled={countriesLoading}
                          >
                            <option value="" disabled>
                              Select State
                            </option>
                            {countriesData?.data
                              .find(
                                (country) =>
                                  country.id.toString() ==
                                  watch(
                                    "contact_details.billing_address_country_id"
                                  )
                              )
                              ?.country_states.map((state) => (
                                <option key={state.id} value={state.id}>
                                  {state.name_en}{" "}
                                  {/* أو nationality_ar حسب اللغة */}
                                </option>
                              ))}
                          </select>
                        </div>
                        <div className="space-y-2">
                          <Label>Postal Code</Label>
                          <Input
                            {...register(
                              "contact_details.billing_address_zip_code"
                            )}
                            error={
                              !!errors.contact_details?.billing_address_zip_code
                            }
                            hint={
                              errors.contact_details?.billing_address_zip_code
                                ?.message
                            }
                            icon={<Landmark className="w-4 h-4" />}
                            placeholder="Please Enter Postal Code"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Address Phone</Label>
                          <Input
                            {...register(
                              "contact_details.billing_address_phone"
                            )}
                            error={
                              !!errors.contact_details?.billing_address_phone
                            }
                            hint={
                              errors.contact_details?.billing_address_phone
                                ?.message
                            }
                            icon={<Phone className="w-4 h-4" />}
                            placeholder="Please Enter Address Phone"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Fax Number</Label>
                          <Input
                            {...register(
                              "contact_details.billing_address_fax_number"
                            )}
                            error={
                              !!errors.contact_details
                                ?.billing_address_fax_number
                            }
                            hint={
                              errors.contact_details?.billing_address_fax_number
                                ?.message
                            }
                            icon={<FaXRay className="w-4 h-4" />}
                            placeholder="Please Enter Fax Number"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-gray-800">
                        Shipping Address
                      </h3>
                      <div className="space-y-2">
                        <Label>Shipping Address Attention</Label>
                        <Input
                          {...register(
                            "contact_details.shipping_address_attention"
                          )}
                          error={
                            !!errors.contact_details?.shipping_address_attention
                          }
                          hint={
                            errors.contact_details?.shipping_address_attention
                              ?.message
                          }
                          icon={<Package className="w-4 h-4" />}
                          placeholder="Please enter your shipping address attention"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>shipping Address Country</Label>
                        <select
                          {...register(
                            "contact_details.shipping_address_country_id"
                          )}
                          className={selectStyles}

                          // disabled={countriesLoading}
                        >
                          <option value="" disabled>
                            Select Country
                          </option>

                          {countriesData?.data?.map((country) => (
                            <option key={country.id} value={country.id}>
                              {country.name_en}{" "}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="space-y-2">
                        <Label>Street Address 1</Label>
                        <Input
                          {...register(
                            "contact_details.shipping_address_street_1"
                          )}
                          error={
                            !!errors.contact_details?.shipping_address_street_1
                          }
                          hint={
                            errors.contact_details?.shipping_address_street_1
                              ?.message
                          }
                          icon={<MapPin className="w-4 h-4" />}
                          placeholder="Please Enter Your street address 1"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Street Address 2</Label>
                        <Input
                          {...register(
                            "contact_details.shipping_address_street_2"
                          )}
                          error={
                            !!errors.contact_details?.shipping_address_street_2
                          }
                          hint={
                            errors.contact_details?.shipping_address_street_2
                              ?.message
                          }
                          icon={<MapPin className="w-4 h-4" />}
                          placeholder="Please Enter Your street address 2"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>City</Label>
                          <Input
                            {...register(
                              "contact_details.shipping_address_city"
                            )}
                            error={
                              !!errors.contact_details?.shipping_address_city
                            }
                            hint={
                              errors.contact_details?.shipping_address_city
                                ?.message
                            }
                            icon={<MapPin className="w-4 h-4" />}
                            placeholder="Please Enter Your City"
                          />
                        </div>
                        <div>
                          <Label>State</Label>
                          <select
                            {...register(
                              "contact_details.billing_address_country_state_id"
                            )}
                            className={selectStyles}

                            // disabled={countriesLoading}
                          >
                            <option value="" disabled>
                              Select State
                            </option>
                            {countriesData?.data
                              .find(
                                (country) =>
                                  country.id.toString() ==
                                  watch(
                                    "contact_details.shipping_address_country_id"
                                  )
                              )
                              ?.country_states.map((state) => (
                                <option key={state.id} value={state.id}>
                                  {state.name_en}{" "}
                                </option>
                              ))}
                          </select>
                        </div>
                        <div className="space-y-2">
                          <Label>Postal Code</Label>
                          <Input
                            {...register(
                              "contact_details.shipping_address_zip_code"
                            )}
                            error={
                              !!errors.contact_details
                                ?.shipping_address_zip_code
                            }
                            hint={
                              errors.contact_details?.shipping_address_zip_code
                                ?.message
                            }
                            icon={<Landmark className="w-4 h-4" />}
                            placeholder="Please Enter Postal Code"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Fax Number</Label>
                          <Input
                            {...register(
                              "contact_details.shipping_address_fax_number"
                            )}
                            error={
                              !!errors.contact_details
                                ?.shipping_address_fax_number
                            }
                            hint={
                              errors.contact_details
                                ?.shipping_address_fax_number?.message
                            }
                            icon={<FaXRay className="w-4 h-4" />}
                            placeholder="Please Enter Fax Number"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

            </div>

            {Object.keys(errors).length > 0 && (
              <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-md">
                <p className="font-semibold">
                  Please fix the following errors:
                </p>
                <ul className="list-disc list-inside">
                  {getErrorMessages(errors).map((errorMessage, index) => (
                    <li key={index} className="text-sm">
                      {errorMessage}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Submit Button */}
            <div className="flex justify-end">
              <button
                type="submit"
                className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 text-sm font-medium"
                disabled={
                  isSubmitting ||
                  addCustomer.isPending ||
                  updateCustomer.isPending
                }
              >
                {isUpdate ? "Update Customer" : "Create Customer"}
              </button>
            </div>
          </form>
        )}
      </ComponentCard>
    </>
  );
}
