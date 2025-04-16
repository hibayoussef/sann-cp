import Radio from "@/components/form/input/Radio";
import {
  customerSchema,
  type CustomerType,
} from "@/components/lib/validations/customer";
import { useAddContact } from "@/hooks/sales/vendors";
import { useFetchBranches } from "@/hooks/settings/useBranches";
import { useFetchPaymentTerms } from "@/hooks/settings/usePaymentTerm";
import { useFetchCountries, useFetchCurrencies } from "@/hooks/useCommon";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail, Phone, Type } from "lucide-react";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { IoAdd } from "react-icons/io5";
import { useParams } from "react-router-dom";
import ComponentCard from "../../../components/common/ComponentCard";
import PageBreadcrumb from "../../../components/common/PageBreadCrumb";
import Input from "../../../components/form/input/InputField";
import Label from "../../../components/form/Label";
import { useMeStore } from "../../../store/useMeStore";
import AddressTab from "../customers/tabs/AddressTab";
import ContactDetailsTab from "../customers/tabs/ContactDetailsTab";
import ContactPersonTab from "../customers/tabs/ContactPersonTab";
import { OtherDetailsTab } from "../customers/tabs/OtherDetailsTab";


const TABS = [
  { id: 1, name: "Other Details" },
  { id: 2, name: "Contact Details" },
  { id: 3, name: "Contact Person" },
  { id: 4, name: "Address" },
];

function cleanContactDetails(contactDetails: any): any {
  if (!contactDetails) return null;

  const cleaned = Object.entries(contactDetails).reduce((acc, [key, value]) => {
    if (
      value === null ||
      value === undefined ||
      value === "" ||
      value === "undefined"
    ) {
      return acc;
    }
    if (Array.isArray(value) && value.length === 0) {
      return acc;
    }
    return { ...acc, [key]: value };
  }, {});

  return Object.keys(cleaned).length > 0 ? cleaned : null;
}

export default function VendorForm() {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState(1);
  const isUpdate = Boolean(id);
  const addCustomer = useAddContact();
  const organizationId = useMeStore((state) => state.organizationId);
  const { data: branches } = useFetchBranches();
  const { data: paymentsTerm } = useFetchPaymentTerms();
  const { data: currencies } = useFetchCurrencies();
  const { data: countriesData } = useFetchCountries();

  const methods = useForm<CustomerType>({
    resolver: zodResolver(customerSchema),
    defaultValues: {
      exchange_rate: 1,
      balance: 1,
      contact_type: "individual",
      portal_access: "0",
      portal_language: "en", 

    },
  });

  const contactType = methods.watch("contact_type");
const onSubmit = async (formData: CustomerType) => {
  const full_name_ar = `${formData?.first_name_ar} ${formData?.last_name_ar}`;
  const full_name_en = `${formData?.first_name_en} ${formData?.last_name_en}`;

  let contactDetails = cleanContactDetails(formData.contact_details);
  
  if (contactDetails && contactDetails.social_media) {
    contactDetails = {
      ...contactDetails,
      social_media: JSON.stringify(contactDetails.social_media)
    };
  }

  const payload: any = {
    ...formData,
    organization_id: organizationId?.toString()!,
    full_name_ar: full_name_ar,
    full_name_en: full_name_en,
    contact_persons: formData?.contact_persons?.map((person) => ({
      ...person,
      social_media: person.social_media ? JSON.stringify(person.social_media) : null,
      full_name_ar: `${person?.first_name_ar} ${person?.last_name_ar}`,
      full_name_en: `${person?.first_name_en} ${person?.last_name_en}`,
    })),
    contact_details: contactDetails,
    type: "customer",
  };

  await addCustomer.mutateAsync(payload);
};
  return (
    <>
      <PageBreadcrumb
        baseLink="/vendors"
        baseTitle="Vendors"
        pageTitle={isUpdate ? "Update Vendor" : "Create Vendor"}
        icon={
          <div className="w-6 h-6 flex items-center justify-center dark:bg-gray-900 bg-gray-200 rounded-full">
            <IoAdd className="w-5 h-5" />
          </div>
        }
      />
      <ComponentCard title={isUpdate ? "Update Vendor" : "Create Vendor"}>
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <div className="flex items-center gap-4">
                  <Label className="mb-0">Vendor Type</Label>
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
              <div className="space-y-2">
                <div className="space-y-2">
                  <Label>First Name (En)</Label>
                  <Input
                    {...methods.register("first_name_en")}
                    error={!!methods.formState.errors.first_name_en}
                    hint={methods.formState.errors.first_name_en?.message}
                    icon={<Type className="w-4 h-4" />}
                    placeholder="Please Enter Your First Name (En)"
                  />
                </div>

                <div className="space-y-2">
                  <Label>First Name (Ar)</Label>
                  <Input
                    {...methods.register("first_name_ar")}
                    error={!!methods.formState.errors.first_name_ar}
                    hint={methods.formState.errors.first_name_ar?.message}
                    icon={<Type className="w-4 h-4" />}
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
                    icon={<Type className="w-4 h-4" />}
                    placeholder="Please Enter Your Last Name (En)"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Last Name (Ar)</Label>
                  <Input
                    {...methods.register("last_name_ar")}
                    error={!!methods.formState.errors.last_name_ar}
                    hint={methods.formState.errors.last_name_ar?.message}
                    icon={<Type className="w-4 h-4" />}
                    placeholder="Please Enter Your Last Name (Ar)"
                  />
                </div>
              </div>

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
                  placeholder="Enter Your phone number"
                  icon={<Phone className="w-4 h-4" />}
                />
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border dark:bg-gray-900 border-gray-100">
              <div className="border-b border-gray-200 mb-6">
                <nav className="flex flex-col justify-start items-center md:flex-row space-x-4">
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

            <div className="flex justify-end">
              <button
                type="submit"
                className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 text-sm font-medium"
                disabled={addCustomer.isPending}
              >
                {isUpdate ? "Update Vendor" : "Create Vendor"}
              </button>
            </div>
          </form>
        </FormProvider>
      </ComponentCard>
    </>
  );
}