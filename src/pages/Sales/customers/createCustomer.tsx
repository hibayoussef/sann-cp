import Radio from "@/components/form/input/Radio";
import {
  customerSchema,
  type CustomerType,
} from "@/components/lib/validations/customer";
import {
  useAddContact,
  useUpdateContact
} from "@/hooks/sales/contacts";
import { useFetchBranches } from "@/hooks/settings/useBranches";
import { useFetchPaymentTerms } from "@/hooks/settings/usePaymentTerm";
import { useFetchCountries, useFetchCurrencies } from "@/hooks/useCommon";
import { zodResolver } from "@hookform/resolvers/zod";
import { Info, Mail, Phone } from "lucide-react";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { IoAdd } from "react-icons/io5";
import { useParams } from "react-router-dom";
import ComponentCard from "../../../components/common/ComponentCard";
import PageBreadcrumb from "../../../components/common/PageBreadCrumb";
import Input from "../../../components/form/input/InputField";
import Label from "../../../components/form/Label";
import { useMeStore } from "../../../store/useMeStore";
import AddressTab from "./tabs/AddressTab";
import ContactDetailsTab from "./tabs/ContactDetailsTab";
import ContactPersonTab from "./tabs/ContactPersonTab";
import { OtherDetailsTab } from "./tabs/OtherDetailsTab";

const TABS = [
  { id: 1, name: "Other Details" },
  { id: 2, name: "Contact Details" },
  { id: 3, name: "Contact Person" },
  { id: 4, name: "Address" },
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

export default function CustomerForm() {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState(1);
  const isUpdate = Boolean(id);
  const addCustomer = useAddContact();
  const updateCustomer = useUpdateContact();
  const organizationId = useMeStore((state) => state.organizationId);

  // const { data: customerData, isLoading } = useFetchContact(Number(id), {
  //   enabled: isUpdate,
  // });
  const { data: branches } = useFetchBranches();
  const { data: paymentsTerm } = useFetchPaymentTerms();
  const { data: currencies } = useFetchCurrencies();
  const { data: countriesData } = useFetchCountries();

  const methods = useForm<CustomerType>({
    resolver: zodResolver(customerSchema),
    // defaultValues: customerData ?? {},
    defaultValues: {
      contact_persons: [
        {
          salutation_ar: "",
          salutation_en: "",
          full_name_ar: "",
          full_name_en: "",
          first_name_ar: "",
          first_name_en: "",
          last_name_ar: "",
          last_name_en: "",
          email: "",
          mobile: "",
          designation: "",
          department: "",
          social_media: "",
        },
      ],
    },
  });

  const contactType = methods.watch("contact_type");

  // useEffect(() => {
  //   if (customerData) {
  //     Object.keys(customerData).forEach((key) => {
  //       setValue(key, customerData[key]);
  //     });
  //   }
  // }, [customerData, setValue]);
  console.log(methods.formState.errors);
  const onSubmit = (formData: CustomerType) => {
    const payload: any = {
      ...formData,
      organization_id: organizationId?.toString()!,
      type: "customer",
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
        baseLink="/customers"
        baseTitle="Customers"
        pageTitle={isUpdate ? "Update Customer" : "Create Customer"}
        icon={
          <div className="w-6 h-6 flex items-center justify-center   bg-gray-200 rounded-full">
            <IoAdd className="w-5 h-5" />
          </div>
        }
      />
      <ComponentCard title={isUpdate ? "Update Customer" : "Create Customer"}>
        {isUpdate ? (
          <p>Loading customer data...</p>
        ) : (
          <FormProvider {...methods}>
            <form
              onSubmit={methods.handleSubmit(onSubmit)}
              className="space-y-8"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                          methods.setValue(
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
                          methods.setValue(
                            "contact_type",
                            value as "business" | "individual"
                          )
                        }
                        label="Business"
                        className="flex items-center gap-2"
                      />
                    </div>
                  </div>
                  {methods.formState.errors.contact_type && (
                    <p className="text-red-500 text-sm">
                      {methods.formState.errors.contact_type.message}
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
                      {...methods.register("full_name_en")}
                      error={!!methods.formState.errors.full_name_en}
                      hint={methods.formState.errors.full_name_en?.message}
                      icon={<Info className="w-4 h-4" />}
                      placeholder="Please Enter Your Full Name (En)"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Full Name (Ar)</Label>
                    <Input
                      {...methods.register("full_name_ar")}
                      error={!!methods.formState.errors.full_name_ar}
                      hint={methods.formState.errors.full_name_ar?.message}
                      icon={<Info className="w-4 h-4" />}
                      placeholder="Please Enter Your Full Name (Ar)"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="space-y-2">
                    <Label>First Name (En)</Label>
                    <Input
                      {...methods.register("first_name_en")}
                      error={!!methods.formState.errors.first_name_en}
                      hint={methods.formState.errors.first_name_en?.message}
                      icon={<Info className="w-4 h-4" />}
                      placeholder="Please Enter Your First Name (En)"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>First Name (Ar)</Label>
                    <Input
                      {...methods.register("first_name_ar")}
                      error={!!methods.formState.errors.first_name_ar}
                      hint={methods.formState.errors.first_name_ar?.message}
                      icon={<Info className="w-4 h-4" />}
                      placeholder="Please Enter Your First Name (Ar)"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="space-y-2">
                    <Label>Last Name (En)</Label>
                    <Input
                      {...methods.register("last_name_en")}
                      error={!!methods.formState.errors.last_name_en}
                      hint={methods.formState.errors.last_name_en?.message}
                      icon={<Info className="w-4 h-4" />}
                      placeholder="Please Enter Your Last Name (En)"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Last Name (Ar)</Label>
                    <Input
                      {...methods.register("last_name_ar")}
                      error={!!methods.formState.errors.last_name_ar}
                      hint={methods.formState.errors.last_name_ar?.message}
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
                    {...methods.register("email")}
                    error={!!methods.formState.errors.email}
                    hint={methods.formState.errors.email?.message}
                    placeholder="contact@example.com"
                    icon={<Mail className="w-4 h-4" />}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Phone Number</Label>
                  <Input
                    type="tel"
                    {...methods.register("mobile")}
                    error={!!methods.formState.errors.mobile}
                    hint={methods.formState.errors.mobile?.message}
                    placeholder="+966 123 456 789"
                    icon={<Phone className="w-4 h-4" />}
                  />
                </div>
              </div>
              {/* </div> */}

              {/* Tabs Section */}
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
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

                {/* Always render all tabs but toggle visibility */}
                <div className={activeTab === 1 ? "block" : "hidden"}>
                  <OtherDetailsTab
                    countriesData={countriesData}
                    currencies={currencies}
                    paymentsTerm={paymentsTerm}
                    branches={branches}
                  />
                </div>

                <div className={activeTab === 2 ? "block" : "hidden"}>
                  <ContactDetailsTab countriesData={countriesData} />
                </div>

                <div className={activeTab === 3 ? "block" : "hidden"}>
                  <ContactPersonTab />
                </div>

                <div className={activeTab === 4 ? "block" : "hidden"}>
                  <AddressTab countriesData={countriesData} />
                </div>
              </div>

              {Object.keys(methods.formState.errors).length > 0 && (
                <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-md">
                  <p className="font-semibold">
                    Please fix the following errors:
                  </p>
                  <ul className="list-disc list-inside">
                    {getErrorMessages(methods.formState.errors).map(
                      (errorMessage, index) => (
                        <li key={index} className="text-sm">
                          {errorMessage}
                        </li>
                      )
                    )}
                  </ul>
                </div>
              )}

              {/* Submit Button */}
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 text-sm font-medium"
                  disabled={addCustomer.isPending || updateCustomer.isPending}
                >
                  {isUpdate ? "Update Customer" : "Create Customer"}
                </button>
              </div>
            </form>
          </FormProvider>
        )}
      </ComponentCard>
    </>
  );
}
