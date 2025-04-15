import { zodResolver } from "@hookform/resolvers/zod";
import { Info, Mail, Phone } from "lucide-react";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { IoAdd } from "react-icons/io5";
import { useParams } from "react-router-dom";

// Components
import ComponentCard from "@/components/common/ComponentCard";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import Input from "@/components/form/input/InputField";
import Radio from "@/components/form/input/Radio";
import Label from "@/components/form/Label";
import Loader from "@/components/ui/loader/loader";

// Schemas and Types
import {
  customerSchema,
  type CustomerType,
} from "@/components/lib/validations/customer";

// Hooks
import { useFetchContact, useUpdateContact } from "@/hooks/sales/contacts";
import { useFetchBranches } from "@/hooks/settings/useBranches";
import { useFetchPaymentTerms } from "@/hooks/settings/usePaymentTerm";
import { useFetchCountries, useFetchCurrencies } from "@/hooks/useCommon";

// Stores
import { useMeStore } from "@/store/useMeStore";

// Tabs
import type { ISocialMedia } from "@/types/sales/contact";
import { OtherDetailsTab } from "../customers/tabs/OtherDetailsTab";
import ContactDetailsTab from "../customers/tabs/ContactDetailsTab";
import ContactPersonTab from "../customers/tabs/ContactPersonTab";
import AddressTab from "../customers/tabs/AddressTab";


const TABS = [
  { id: 1, name: "Other Details" },
  { id: 2, name: "Contact Details" },
  { id: 3, name: "Contact Persons" },
  { id: 4, name: "Addresses" },
];
function cleanContactObject(obj: any): any {
  if (!obj) return null;

  const cleaned = Object.entries(obj).reduce((acc, [key, value]) => {
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

export default function UpdateVendor() {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState(1);
  const organizationId = useMeStore((state) => state.organizationId);

  // API Hooks
  const { data: customerData, isLoading } = useFetchContact(Number(id), {
    enabled: !!id,
  });
  const updateCustomer = useUpdateContact();
  const { data: branches } = useFetchBranches();
  const { data: paymentsTerm } = useFetchPaymentTerms();
  const { data: currencies } = useFetchCurrencies();
  const { data: countriesData } = useFetchCountries();

  // Form Setup
  const methods = useForm<CustomerType>({
    resolver: zodResolver(customerSchema),
    defaultValues: {
      exchange_rate: 1,
      balance: 1,
      contact_type: "individual",
      portal_access: "1",
      portal_language: "en",
      contact_details: {
        social_media: [],
        passport_number: "",
        work_phone: "",
        website_url: "",
        department: "",
        profession: "",
        designation: "",
        id_issued_date: "",
        id_expiry_date: "",
        unified_number: "",
        date_of_birth: "",
        place_of_birth: "",
        visit_visa_number: "",
        driving_license_number: "",
        driving_license_issued_by: undefined,
        driving_license_issued_date: "",
        driving_license_expiry_date: "",
        home_address: "",
        work_address: "",
        p_o_box: "",
        billing_address_attention: "",
        billing_address_country_id: undefined,
        billing_address_street_1: "",
        billing_address_street_2: "",
        billing_address_city: "",
        billing_address_country_state_id: undefined,
        billing_address_zip_code: "",
        billing_address_phone: "",
        billing_address_fax_number: "",
        shipping_address_attention: "",
        shipping_address_country_id: undefined,
        shipping_address_street_1: "",
        shipping_address_street_2: "",
        shipping_address_city: "",
        shipping_address_country_state_id: "",
        shipping_address_zip_code: "",
        shipping_address_fax_number: "",
      },
      contact_persons: [],
    },
  });

  // Parse social media data from API
  const parseSocialMedia = (
    sm: ISocialMedia[] | string | null | undefined
  ): ISocialMedia[] => {
    if (!sm) return [];
    if (typeof sm === "string") {
      try {
        const parsed = JSON.parse(sm);
        return Array.isArray(parsed) ? parsed : [];
      } catch {
        return [];
      }
    }
    return sm;
  };
  // Load customer data into form
  useEffect(() => {
    if (customerData) {
      const { details, persons, ...mainData } = customerData;

      const formattedData: any = {
        ...mainData,
        branch_id: mainData.branch_id?.toString(),
        portal_access: mainData.portal_access?.toString(),
        payment_term_id: mainData.payment_term_id?.toString(),
        currency_id: mainData.currency_id?.toString(),
        nationality_id: mainData.nationality_id?.toString(),
        exchange_rate: parseFloat(mainData.exchange_rate?.toString() || "1"),
        balance: parseFloat(mainData.balance?.toString() || "1"),
        contact_details: details
          ? {
              ...details,
              social_media: parseSocialMedia(details.social_media),
              billing_address_country_state_id:
                details?.billing_address_country_state_id || "",
              billing_address_country_id:
                details?.billing_address_country_id || "",
              driving_license_issued_by:
                details?.driving_license_issued_by || "",
              shipping_address_country_state_id:
                details?.shipping_address_country_state_id || "",
              shipping_address_country_id:
                details?.shipping_address_country_id || "",
            }
          : undefined,
        contact_persons:
          persons?.map((person) => ({
            ...person,
            social_media: parseSocialMedia(person.social_media),
          })) || [],
      };

      methods.reset(formattedData);
    }
  }, [customerData, methods]);

  const stringifySocialMedia = (
    sm: ISocialMedia[] | string | null | undefined
  ): string | null => {
    if (!sm) return null;
    if (typeof sm === "string") {
      try {
        JSON.parse(sm);
        return sm;
      } catch {
        return "[]";
      }
    }
    return JSON.stringify(sm);
  };

  const onSubmit = async (formData: CustomerType) => {
    try {
      const full_name_ar = `${formData.first_name_ar || ""} ${
        formData.last_name_ar || ""
      }`.trim();
      const full_name_en = `${formData.first_name_en || ""} ${
        formData.last_name_en || ""
      }`.trim();

      const cleanedContactDetails = cleanContactObject({
        ...formData.contact_details,
        social_media: stringifySocialMedia(
          formData.contact_details?.social_media
        ),
        // billing_address_country_id: formData.contact_details?.billing_address_country_id || undefined,
        // billing_address_country_state_id: formData.contact_details?.billing_address_country_state_id || undefined,
        shipping_address_country_id:
          formData.contact_details?.shipping_address_country_id || undefined,
        shipping_address_country_state_id:
          formData.contact_details?.shipping_address_country_state_id ||
          undefined,
        // driving_license_issued_by:
        //   formData.contact_details?.driving_license_issued_by.toString() || undefined,
        billing_address_country_id:
          formData.contact_details?.billing_address_country_id?.toString() ||
          undefined,
        billing_address_country_state_id:
          formData.contact_details?.billing_address_country_state_id?.toString() ||
          undefined,
      });

      const contactPersons =
        formData.contact_persons?.map((person: any) => ({
          ...person,
          social_media: stringifySocialMedia(person.social_media),
          full_name_ar: `${person.first_name_ar || ""} ${
            person.last_name_ar || ""
          }`.trim(),
          full_name_en: `${person.first_name_en || ""} ${
            person.last_name_en || ""
          }`.trim(),
        })) || [];

      const payload = {
        ...formData,
        id: Number(id),
        organization_id: organizationId?.toString(),
        full_name_ar,
        full_name_en,
        branch_id: Number(formData.branch_id),
        portal_access: Number(formData.portal_access),
        payment_term_id: Number(formData.payment_term_id),
        currency_id: Number(formData.currency_id),
        nationality_id: Number(formData.nationality_id),
        exchange_rate: formData.exchange_rate.toString(),
        balance: formData.balance.toString(),
        contact_details: cleanedContactDetails,
        contact_persons: contactPersons,
      };

      const finalPayload = JSON.parse(JSON.stringify(payload));

      await updateCustomer.mutateAsync({
        id: Number(id),
        data: {
          ...finalPayload,
          _method: "PUT",
        },
      });
    } catch (error) {
      console.error("Error updating customer:", error);
    }
  };
  if (isLoading) {
    return <Loader />;
  }

  if (!id) {
    return (
      <div className="text-center py-10">No customer selected for update</div>
    );
  }

  return (
    <>
      <PageBreadcrumb
        baseLink="/vendors"
        baseTitle="Vendors"
        pageTitle="Update Customer"
        icon={
          <div className="w-6 h-6 flex items-center justify-center dark:bg-gray-900 bg-gray-200 rounded-full">
            <IoAdd className="w-5 h-5" />
          </div>
        }
      />

      <ComponentCard title="Update Vendor Details">
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-8">
            {/* Customer Type Selection */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <div className="flex items-center gap-4">
                  <Label className="mb-0">Customer Type</Label>
                  <div className="flex items-center gap-6">
                    <Radio
                      id="individual"
                      name="contact_type"
                      value="individual"
                      checked={methods.watch("contact_type") === "individual"}
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
                      checked={methods.watch("contact_type") === "business"}
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
                    {methods.formState.errors.contact_type?.message}
                  </p>
                )}
              </div>
            </div>

            {/* Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <div className="space-y-2">
                <div className="space-y-2">
                  <Label>First Name (English)</Label>
                  <Input
                    {...methods.register("first_name_en")}
                    error={!!methods.formState.errors.first_name_en}
                    hint={methods.formState.errors.first_name_en?.message}
                    icon={<Info className="w-4 h-4" />}
                    placeholder="Enter first name in English"
                  />
                </div>

                <div className="space-y-2">
                  <Label>First Name (Arabic)</Label>
                  <Input
                    {...methods.register("first_name_ar")}
                    error={!!methods.formState.errors.first_name_ar}
                    hint={methods.formState.errors.first_name_ar?.message}
                    icon={<Info className="w-4 h-4" />}
                    placeholder="Enter first name in Arabic"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="space-y-2">
                  <Label>Last Name (English)</Label>
                  <Input
                    {...methods.register("last_name_en")}
                    error={!!methods.formState.errors.last_name_en}
                    hint={methods.formState.errors.last_name_en?.message}
                    icon={<Info className="w-4 h-4" />}
                    placeholder="Enter last name in English"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Last Name (Arabic)</Label>
                  <Input
                    {...methods.register("last_name_ar")}
                    error={!!methods.formState.errors.last_name_ar}
                    hint={methods.formState.errors.last_name_ar?.message}
                    icon={<Info className="w-4 h-4" />}
                    placeholder="Enter last name in Arabic"
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
                  placeholder="example@domain.com"
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
                  placeholder="Enter phone number"
                  icon={<Phone className="w-4 h-4" />}
                />
              </div>
            </div>

            {/* Tabs Navigation */}
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

              {/* Tabs Content */}
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

            {/* Submit Button */}
            <div className="flex justify-end">
              <button
                type="submit"
                className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 text-sm font-medium"
                disabled={updateCustomer.isPending}
              >
                {updateCustomer.isPending ? "Updating..." : "Save Changes"}
              </button>
            </div>
          </form>
        </FormProvider>
      </ComponentCard>
    </>
  );
}



// import { zodResolver } from "@hookform/resolvers/zod";
// import { Info, Mail, Phone } from "lucide-react";
// import { useEffect, useState } from "react";
// import { FormProvider, useForm } from "react-hook-form";
// import { IoAdd } from "react-icons/io5";
// import { useParams } from "react-router-dom";
// import { toast } from "react-toastify";

// // Components
// import ComponentCard from "@/components/common/ComponentCard";
// import PageBreadcrumb from "@/components/common/PageBreadCrumb";
// import Input from "@/components/form/input/InputField";
// import Radio from "@/components/form/input/Radio";
// import Label from "@/components/form/Label";
// import Loader from "@/components/ui/loader/loader";

// // Schemas and Types
// import {
//   customerSchema,
//   type CustomerType,
// } from "@/components/lib/validations/customer";

// // Hooks
// import { useFetchContact, useUpdateContact } from "@/hooks/sales/contacts";
// import { useFetchBranches } from "@/hooks/settings/useBranches";
// import { useFetchPaymentTerms } from "@/hooks/settings/usePaymentTerm";
// import { useFetchCountries, useFetchCurrencies } from "@/hooks/useCommon";

// // Stores
// import { useMeStore } from "@/store/useMeStore";

// // Tabs
// import type { ISocialMedia } from "@/types/sales/contact";
// import { OtherDetailsTab } from "../customers/tabs/OtherDetailsTab";
// import ContactDetailsTab from "../customers/tabs/ContactDetailsTab";
// import ContactPersonTab from "../customers/tabs/ContactPersonTab";
// import AddressTab from "../customers/tabs/AddressTab";

// const TABS = [
//   { id: 1, name: "Other Details" },
//   { id: 2, name: "Contact Details" },
//   { id: 3, name: "Contact Persons" },
//   { id: 4, name: "Addresses" },
// ];

// function cleanContactObject(obj: any): any {
//   if (!obj) return null;

//   const cleaned = Object.entries(obj).reduce((acc, [key, value]) => {
//     if (
//       value === null ||
//       value === undefined ||
//       value === "" ||
//       value === "undefined"
//     ) {
//       return acc;
//     }
//     if (Array.isArray(value) && value.length === 0) {
//       return acc;
//     }
//     return { ...acc, [key]: value };
//   }, {});

//   return Object.keys(cleaned).length > 0 ? cleaned : null;
// }

// export default function UpdateCustomer() {
//   const { id } = useParams();
//   const [activeTab, setActiveTab] = useState(1);
//   const organizationId = useMeStore((state) => state.organizationId);

//   // API Hooks
//   const { data: customerData, isLoading } = useFetchContact(Number(id), {
//     enabled: !!id,
//   });
//   const updateCustomer = useUpdateContact();
//   const { data: branches } = useFetchBranches();
//   const { data: paymentsTerm } = useFetchPaymentTerms();
//   const { data: currencies } = useFetchCurrencies();
//   const { data: countriesData } = useFetchCountries();

//   // Form Setup
//   const methods = useForm<CustomerType>({
//     resolver: zodResolver(customerSchema),
//     defaultValues: {
//       exchange_rate: 1,
//       balance: 1,
//       contact_type: "individual",
//       portal_access: "1",
//       portal_language: "en",
//       contact_details: {
//         social_media: [],
//       },
//       contact_persons: [],
//     },
//   });

//   // Parse social media data from API
//   const parseSocialMedia = (
//     sm: ISocialMedia[] | string | null | undefined
//   ): ISocialMedia[] => {
//     if (!sm) return [];
//     if (typeof sm === "string") {
//       try {
//         const parsed = JSON.parse(sm);
//         return Array.isArray(parsed) ? parsed : [];
//       } catch {
//         return [];
//       }
//     }
//     return sm;
//   };

//   // Load customer data into form
//   useEffect(() => {
//     if (customerData) {
//       const { details, persons, ...mainData } = customerData;

//       const formattedData: any = {
//         ...mainData,
//         branch_id: mainData.branch_id?.toString(),
//         portal_access: mainData.portal_access?.toString(),
//         payment_term_id: mainData.payment_term_id?.toString(),
//         currency_id: mainData.currency_id?.toString(),
//         nationality_id: mainData.nationality_id?.toString(),
//         exchange_rate: parseFloat(mainData.exchange_rate?.toString() || "1"),
//         balance: parseFloat(mainData.balance?.toString() || "1"),
//         contact_details: details
//           ? {
//               ...details,
//               social_media: parseSocialMedia(details.social_media),
//             }
//           : undefined,
//         contact_persons:
//           persons?.map((person) => ({
//             ...person,
//             social_media: parseSocialMedia(person.social_media),
//           })) || [],
//       };

//       methods.reset(formattedData);
//     }
//   }, [customerData, methods]);

//   // Stringify social media for API payload
//   const stringifySocialMedia = (
//     sm: ISocialMedia[] | string | null | undefined
//   ): string | null => {
//     if (!sm) return null;
//     if (typeof sm === "string") {
//       try {
//         JSON.parse(sm);
//         return sm;
//       } catch {
//         return "[]";
//       }
//     }
//     return JSON.stringify(sm);
//   };

//   // Handle form submission
//   const onSubmit = async (formData: CustomerType) => {
//     try {
//       const full_name_ar = `${formData.first_name_ar} ${formData.last_name_ar}`;
//       const full_name_en = `${formData.first_name_en} ${formData.last_name_en}`;

//       // Clean contact details object
//       let contactDetails = cleanContactObject(formData.contact_details);

//       // Process social media if contact details exist
//       if (contactDetails) {
//         contactDetails = {
//           ...contactDetails,
//           social_media: stringifySocialMedia(contactDetails.social_media),
//         };
//       }

//       const payload: any = {
//         ...formData,
//         id: Number(id),
//         organization_id: organizationId?.toString()!,
//         full_name_ar,
//         full_name_en,
//         branch_id: Number(formData.branch_id),
//         portal_access: Number(formData.portal_access),
//         payment_term_id: Number(formData.payment_term_id),
//         currency_id: Number(formData.currency_id),
//         nationality_id: Number(formData.nationality_id),
//         exchange_rate: formData.exchange_rate.toString(),
//         balance: formData.balance.toString(),
//         contact_details: contactDetails,
//         contact_persons:
//           formData?.contact_persons?.map((person: any) => ({
//             ...person,
//             social_media: stringifySocialMedia(person?.social_media),
//             full_name_ar: `${person.first_name_ar} ${person.last_name_ar}`,
//             full_name_en: `${person.first_name_en} ${person.last_name_en}`,
//           })) || [],
//       };

//       const updatedPayload = {
//         ...payload,
//         _method: "PUT",
//       };

//       await updateCustomer.mutateAsync({
//         id: Number(id),
//         data: updatedPayload,
//       });

//       toast.success("Customer updated successfully");
//     } catch (error) {
//       console.error("Error updating customer:", error);
//       toast.error("Failed to update customer");
//     }
//   };

//   if (isLoading) {
//     return <Loader />;
//   }

//   if (!id) {
//     return (
//       <div className="text-center py-10">No customer selected for update</div>
//     );
//   }

//   return (
//     <>
//       <PageBreadcrumb
//         baseLink="/vendors"
//         baseTitle="Vendors"
//         pageTitle="Update Vendor"
//         icon={
//           <div className="w-6 h-6 flex items-center justify-center dark:bg-gray-900 bg-gray-200 rounded-full">
//             <IoAdd className="w-5 h-5" />
//           </div>
//         }
//       />

//       <ComponentCard title="Update Vendor Details">
//         <FormProvider {...methods}>
//           <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-8">
//             {/* Vendor Type Selection */}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               <div className="space-y-2">
//                 <div className="flex items-center gap-4">
//                   <Label className="mb-0">Vendor Type</Label>
//                   <div className="flex items-center gap-6">
//                     <Radio
//                       id="individual"
//                       name="contact_type"
//                       value="individual"
//                       checked={methods.watch("contact_type") === "individual"}
//                       onChange={(value) =>
//                         methods.setValue(
//                           "contact_type",
//                           value as "business" | "individual"
//                         )
//                       }
//                       label="Individual"
//                       className="flex items-center gap-2"
//                     />
//                     <Radio
//                       id="business"
//                       name="contact_type"
//                       value="business"
//                       checked={methods.watch("contact_type") === "business"}
//                       onChange={(value) =>
//                         methods.setValue(
//                           "contact_type",
//                           value as "business" | "individual"
//                         )
//                       }
//                       label="Business"
//                       className="flex items-center gap-2"
//                     />
//                   </div>
//                 </div>
//                 {methods.formState.errors.contact_type && (
//                   <p className="text-red-500 text-sm">
//                     {methods.formState.errors.contact_type?.message}
//                   </p>
//                 )}
//               </div>
//             </div>

//             {/* Basic Information */}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
//               <div className="space-y-2">
//                 <div className="space-y-2">
//                   <Label>First Name (English)</Label>
//                   <Input
//                     {...methods.register("first_name_en")}
//                     error={!!methods.formState.errors.first_name_en}
//                     hint={methods.formState.errors.first_name_en?.message}
//                     icon={<Info className="w-4 h-4" />}
//                     placeholder="Enter first name in English"
//                   />
//                 </div>

//                 <div className="space-y-2">
//                   <Label>First Name (Arabic)</Label>
//                   <Input
//                     {...methods.register("first_name_ar")}
//                     error={!!methods.formState.errors.first_name_ar}
//                     hint={methods.formState.errors.first_name_ar?.message}
//                     icon={<Info className="w-4 h-4" />}
//                     placeholder="Enter first name in Arabic"
//                   />
//                 </div>
//               </div>

//               <div className="space-y-2">
//                 <div className="space-y-2">
//                   <Label>Last Name (English)</Label>
//                   <Input
//                     {...methods.register("last_name_en")}
//                     error={!!methods.formState.errors.last_name_en}
//                     hint={methods.formState.errors.last_name_en?.message}
//                     icon={<Info className="w-4 h-4" />}
//                     placeholder="Enter last name in English"
//                   />
//                 </div>

//                 <div className="space-y-2">
//                   <Label>Last Name (Arabic)</Label>
//                   <Input
//                     {...methods.register("last_name_ar")}
//                     error={!!methods.formState.errors.last_name_ar}
//                     hint={methods.formState.errors.last_name_ar?.message}
//                     icon={<Info className="w-4 h-4" />}
//                     placeholder="Enter last name in Arabic"
//                   />
//                 </div>
//               </div>

//               <div className="space-y-2">
//                 <Label>Email Address</Label>
//                 <Input
//                   type="email"
//                   {...methods.register("email")}
//                   error={!!methods.formState.errors.email}
//                   hint={methods.formState.errors.email?.message}
//                   placeholder="example@domain.com"
//                   icon={<Mail className="w-4 h-4" />}
//                 />
//               </div>

//               <div className="space-y-2">
//                 <Label>Phone Number</Label>
//                 <Input
//                   type="tel"
//                   {...methods.register("mobile")}
//                   error={!!methods.formState.errors.mobile}
//                   hint={methods.formState.errors.mobile?.message}
//                   placeholder="Enter phone number"
//                   icon={<Phone className="w-4 h-4" />}
//                 />
//               </div>
//             </div>

//             {/* Other Details - Exchange Rate and Balance */}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               <div className="space-y-2">
//                 <Label>Exchange Rate</Label>
//                 <Input
//                   type="number"
//                   step={0.01}
//                   {...methods.register("exchange_rate", {
//                     valueAsNumber: true,
//                   })}
//                   error={!!methods.formState.errors.exchange_rate}
//                   hint={methods.formState.errors.exchange_rate?.message}
//                   placeholder="1.00"
//                 />
//               </div>

//               <div className="space-y-2">
//                 <Label>Balance</Label>
//                 <Input
//                   type="number"
//                   step={0.01}
//                   {...methods.register("balance", {
//                     valueAsNumber: true,
//                   })}
//                   error={!!methods.formState.errors.balance}
//                   hint={methods.formState.errors.balance?.message}
//                   placeholder="0.00"
//                 />
//               </div>
//             </div>

//             {/* Tabs Navigation */}
//             <div className="bg-white p-6 rounded-lg shadow-sm border dark:bg-gray-900 border-gray-100">
//               <div className="border-b border-gray-200 mb-6">
//                 <nav className="flex flex-col justify-start items-center md:flex-row space-x-4">
//                   {TABS.map((tab) => (
//                     <button
//                       key={tab.id}
//                       type="button"
//                       onClick={() => setActiveTab(tab.id)}
//                       className={`px-4 py-2 text-sm font-medium transition-colors ${
//                         activeTab === tab.id
//                           ? "text-blue-600 border-b-2 border-blue-600"
//                           : "text-gray-500 hover:text-gray-700"
//                       }`}
//                     >
//                       {tab.name}
//                     </button>
//                   ))}
//                 </nav>
//               </div>

//               {/* Tabs Content */}
//               <div className={activeTab === 1 ? "block" : "hidden"}>
//                 <OtherDetailsTab
//                   countriesData={countriesData}
//                   currencies={currencies}
//                   paymentsTerm={paymentsTerm}
//                   branches={branches}
//                 />
//               </div>

//               <div className={activeTab === 2 ? "block" : "hidden"}>
//                 <ContactDetailsTab countriesData={countriesData} />
//               </div>

//               <div className={activeTab === 3 ? "block" : "hidden"}>
//                 <ContactPersonTab />
//               </div>

//               <div className={activeTab === 4 ? "block" : "hidden"}>
//                 <AddressTab countriesData={countriesData} />
//               </div>
//             </div>

//             {/* Submit Button */}
//             <div className="flex justify-end">
//               <button
//                 type="submit"
//                 className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 text-sm font-medium"
//                 disabled={updateCustomer.isPending}
//               >
//                 {updateCustomer.isPending ? "Updating..." : "Save Changes"}
//               </button>
//             </div>
//           </form>
//         </FormProvider>
//       </ComponentCard>
//     </>
//   );
// }
