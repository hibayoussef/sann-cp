// import {
//   customerSchema,
//   type CustomerType,
// } from "@/components/lib/validations/customer";
// import {
//   useAddContact,
//   useFetchContact,
//   useUpdateContact,
// } from "@/hooks/sales/contacts";
// import { useFetchBranches } from "@/hooks/settings/useBranches";
// import { useFetchPaymentTerms } from "@/hooks/settings/usePaymentTerm";
// import { useFetchCountries, useFetchCurrencies } from "@/hooks/useCommon";
// import type { Currency } from "@/types/common";
// import { ContactType } from "@/types/enums/contactType";
// import type { IBranch } from "@/types/settings/branches";
// import type { IPaymentTerm } from "@/types/settings/payment_term";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useEffect } from "react";
// import { useForm } from "react-hook-form";
// import { IoAdd } from "react-icons/io5";
// import { useParams } from "react-router-dom";
// import ComponentCard from "../../../components/common/ComponentCard";
// import PageBreadcrumb from "../../../components/common/PageBreadCrumb";
// import Input from "../../../components/form/input/InputField";
// import Label from "../../../components/form/Label";
// import { useMeStore } from "../../../store/useMeStore";

// export default function CustomerForm() {
//   const { id } = useParams();
//   const isUpdate = Boolean(id);
//   const addCustomer = useAddContact();
//   const updateCustomer = useUpdateContact();
//   const organizationId = useMeStore((state) => state.organizationId);

//   const { data: customerData, isLoading } = useFetchContact(Number(id), {
//     enabled: isUpdate,
//   });
//   const { data: branches, isLoading: branchesLoading } = useFetchBranches();
//   const { data: paymentsTerm, isLoading: paymentsTermLoading } =
//     useFetchPaymentTerms();
//   const { data: currencies, isLoading: currenciesLoading } =
//     useFetchCurrencies();
//   const { data: countriesData, isLoading: countriesLoading } =
//     useFetchCountries();

//   const {
//     register,
//     handleSubmit,
//     setValue,
//     formState: { errors, isSubmitting },
//   } = useForm<CustomerType>({
//     resolver: zodResolver(customerSchema),
//     defaultValues: customerData ?? {},
//   });

//   useEffect(() => {
//     if (customerData) {
//       Object.keys(customerData).forEach((key) => {
//         setValue(key, customerData[key]);
//       });
//     }
//   }, [customerData, setValue]);

//   const onSubmit = async (formData: CustomerType) => {
//     const payload = {
//       organization_id: organizationId,
//       ...formData,
//     };

//     if (isUpdate && id) {
//       await updateCustomer.mutateAsync({ id: Number(id), data: payload });
//     } else {
//       await addCustomer.mutateAsync(payload);
//     }
//   };

//   return (
//     <>
//       <PageBreadcrumb
//         baseLink="/customers"
//         baseTitle="Customers"
//         pageTitle={isUpdate ? "Update Customer" : "Create Customer"}
//         icon={
//           <div className="w-6 h-6 flex items-center justify-center bg-gray-200 rounded-full">
//             <IoAdd className="w-5 h-5" />
//           </div>
//         }
//       />
//       <ComponentCard title={isUpdate ? "Update Customer" : "Create Customer"}>
//         {isUpdate && isLoading ? (
//           <p>Loading customer data...</p>
//         ) : (
//           <form onSubmit={handleSubmit(onSubmit)}>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               {/* Left Side */}
//               <div>
//                 <Label>Branch</Label>
//                 <select
//                   {...register("branch_id")}
//                   className="w-full p-2 border rounded"
//                   // error={!!errors.branch_id}
//                 >
//                   <option value="">Select a Branch</option>
//                   {branches?.map((branch: IBranch) => (
//                     <option key={branch.id} value={branch.id}>
//                       {branch.branch_name_en}
//                     </option>
//                   ))}
//                 </select>
//                 {errors.branch_id && (
//                   <p className="text-red-500 text-sm">
//                     {errors.branch_id.message}
//                   </p>
//                 )}
//               </div>
//               <div>
//                 <Label>Portal Access</Label>
//                 <select
//                   {...register("portal_access")}
//                   className="w-full p-2 border rounded"
//                   // error={!!errors.portal_access}
//                 >
//                   <option value="">Select Portal Access</option>
//                   <option value="1">Enabled</option>
//                   <option value="0">Disabled</option>
//                 </select>
//                 {errors.portal_access && (
//                   <p className="text-red-500 text-sm">
//                     {errors.portal_access.message}
//                   </p>
//                 )}
//               </div>

//               <div>
//                 <Label>Portal Language</Label>
//                 <select
//                   {...register("portal_language")}
//                   className="w-full p-2 border rounded"
//                   // error={!!errors.portal_language}
//                 >
//                   <option value="">Select Portal Language</option>
//                   <option value="en">English</option>
//                   <option value="ar">Arabic</option>
//                 </select>
//                 {errors.portal_language && (
//                   <p className="text-red-500 text-sm">
//                     {errors.portal_language.message}
//                   </p>
//                 )}
//               </div>

//               <div>
//                 <Label>Type</Label>
//                 <select
//                   {...register("type")}
//                   className="w-full p-2 border rounded"
//                   // error={!!errors.type}
//                 >
//                   <option value="">Select Type</option>
//                   <option value={ContactType.CUSTOMER}>Customer</option>
//                   <option value={ContactType.EMPLOYEE}>Employee</option>
//                   <option value={ContactType.VENDOR}>Vendor</option>
//                 </select>
//                 {errors.type && (
//                   <p className="text-red-500 text-sm">{errors.type.message}</p>
//                 )}
//               </div>
//               <div>
//                 <Label>Payment Term</Label>
//                 <select
//                   {...register("payment_term_id")}
//                   className="w-full p-2 border rounded"
//                   // error={!!errors.payment_term_id}
//                 >
//                   <option value="">Select Payment Term</option>
//                   {paymentsTerm?.map((term: IPaymentTerm) => (
//                     <option key={term.id} value={term.id}>
//                       {term.term_name_en}
//                     </option>
//                   ))}
//                 </select>
//                 {errors.payment_term_id && (
//                   <p className="text-red-500 text-sm">
//                     {errors.payment_term_id.message}
//                   </p>
//                 )}
//               </div>
//               <div>
//                 <Label>Currency</Label>
//                 <select
//                   {...register("currency_id")}
//                   className="w-full p-2 border rounded"
//                   // error={!!errors.currency_id}
//                 >
//                   <option value="">Select Currency</option>
//                   {currenciesLoading ? (
//                     <option disabled>Loading currencies...</option>
//                   ) : (
//                     currencies?.data.map((currency: Currency) => (
//                       <option key={currency.id} value={currency.id}>
//                         {currency.currency_name} ({currency.currency_symbol})
//                       </option>
//                     ))
//                   )}
//                 </select>
//                 {errors.currency_id && (
//                   <p className="text-red-500 text-sm">
//                     {errors.currency_id.message}
//                   </p>
//                 )}
//               </div>

//               <div>
//                 <Label>Exchange Rate</Label>
//                 <Input
//                   type="number"
//                   // step="0.01"
//                   {...register("exchange_rate")}
//                   error={!!errors.exchange_rate}
//                   hint={errors.exchange_rate?.message}
//                 />
//               </div>
//               <div>
//                 <Label>Balance</Label>
//                 <Input
//                   type="number"
//                   // step="0.01" // للسماح بالأرقام العشرية
//                   {...register("balance")}
//                   error={!!errors.balance}
//                   hint={errors.balance?.message}
//                 />
//               </div>

// <div>
//   <Label>Nationality</Label>
//   <select
//     {...register("nationality_id")}
//     className="w-full p-2 border rounded"
//     // error={!!errors.nationality_id}
//   >
//     <option value="">Select Nationality</option>
//     {countriesLoading ? (
//       <option>Loading nationalities...</option>
//     ) : (
//       countriesData?.data?.map((country) => (
//         <option key={country.id} value={country.id}>
//           {country.nationality_en}{" "}
//           {/* استخدم `nationality_ar` إذا كان التطبيق عربيًا */}
//         </option>
//       ))
//     )}
//   </select>
//   {errors.nationality_id && (
//     <p className="text-red-500 text-sm">
//       {errors.nationality_id.message}
//     </p>
//   )}
// </div>

//               <div>
//                 <Label>Passport Number</Label>
//                 <Input
//                   type="text"
//                   {...register("contact_details.passport_number")}
//                   error={!!errors.contact_details?.passport_number}
//                   hint={errors.contact_details?.passport_number?.message}
//                 />
//               </div>
//               <div>
//                 {/* Department */}
//                 <Label>Department</Label>
//                 <Input
//                   type="text"
//                   {...register("contact_details.department")}
//                   error={!!errors.contact_details?.department}
//                   hint={errors.contact_details?.department?.message}
//                 />

//                 {/* Work Phone */}
//                 <Label>Work Phone</Label>
//                 <Input
//                   type="tel"
//                   {...register("contact_details.work_phone")}
//                   error={!!errors.contact_details?.work_phone}
//                   hint={errors.contact_details?.work_phone?.message}
//                 />

//                 {/* Website URL */}
//                 <Label>Website URL</Label>
//                 <Input
//                   type="url"
//                   {...register("contact_details.website_url")}
//                   error={!!errors.contact_details?.website_url}
//                   hint={errors.contact_details?.website_url?.message}
//                 />

//                 {/* Profession */}
//                 <Label>Profession</Label>
//                 <Input
//                   type="text"
//                   {...register("contact_details.profession")}
//                   error={!!errors.contact_details?.profession}
//                   hint={errors.contact_details?.profession?.message}
//                 />

//                 {/* Designation */}
//                 <Label>Designation</Label>
//                 <Input
//                   type="text"
//                   {...register("contact_details.designation")}
//                   error={!!errors.contact_details?.designation}
//                   hint={errors.contact_details?.designation?.message}
//                 />

//                 {/* Social Media */}
//                 <Label>Social Media</Label>
//                 <Input
//                   type="text"
//                   {...register("contact_details.social_media")}
//                   error={!!errors.contact_details?.social_media}
//                   hint={errors.contact_details?.social_media?.message}
//                 />
//               </div>
//               {/* ID Issued Date */}
//               <Label>ID Issued Date</Label>
//               <Input
//                 type="date"
//                 {...register("contact_details.id_issued_date")}
//                 error={!!errors.contact_details?.id_issued_date}
//                 hint={errors.contact_details?.id_issued_date?.message}
//               />

//               {/* ID Expiry Date */}
//               <Label>ID Expiry Date</Label>
//               <Input
//                 type="date"
//                 {...register("contact_details.id_expiry_date")}
//                 error={!!errors.contact_details?.id_expiry_date}
//                 hint={errors.contact_details?.id_expiry_date?.message}
//               />

//               {/* Unified Number */}
//               <Label>Unified Number</Label>
//               <Input
//                 type="text"
//                 {...register("contact_details.unified_number")}
//                 error={!!errors.contact_details?.unified_number}
//                 hint={errors.contact_details?.unified_number?.message}
//               />

//               {/* Place of Birth */}
//               <Label>Place of Birth</Label>
//               <Input
//                 type="text"
//                 {...register("contact_details.place_of_birth")}
//                 error={!!errors.contact_details?.place_of_birth}
//                 hint={errors.contact_details?.place_of_birth?.message}
//               />

//               {/* Date of Birth */}
//               <Label>Date of Birth</Label>
//               <Input
//                 type="date"
//                 {...register("contact_details.date_of_birth")}
//                 error={!!errors.contact_details?.date_of_birth}
//                 hint={errors.contact_details?.date_of_birth?.message}
//               />

//               {/* Visit Visa Number */}
//               <Label>Visit Visa Number</Label>
//               <Input
//                 type="text"
//                 {...register("contact_details.visit_visa_number")}
//                 error={!!errors.contact_details?.visit_visa_number}
//                 hint={errors.contact_details?.visit_visa_number?.message}
//               />

//               {/* Driving License Number */}
//               <Label>Driving License Number</Label>
//               <Input
//                 type="text"
//                 {...register("contact_details.driving_license_number")}
//                 error={!!errors.contact_details?.driving_license_number}
//                 hint={errors.contact_details?.driving_license_number?.message}
//               />

//               {/* Driving License Issued By */}
//               <Label>Driving License Issued By</Label>
//               <Input
//                 type="text"
//                 {...register("contact_details.driving_license_issued_by")}
//                 error={!!errors.contact_details?.driving_license_issued_by}
//                 hint={
//                   errors.contact_details?.driving_license_issued_by?.message
//                 }
//               />

//               {/* Driving License Issued Date */}
//               <Label>Driving License Issued Date</Label>
//               <Input
//                 type="date"
//                 {...register("contact_details.driving_license_issued_date")}
//                 error={!!errors.contact_details?.driving_license_issued_date}
//                 hint={
//                   errors.contact_details?.driving_license_issued_date?.message
//                 }
//               />
//               {/* Home Address */}
//               <Label>Home Address</Label>
//               <Input
//                 type="text"
//                 {...register("contact_details.home_address")}
//                 error={!!errors.contact_details?.home_address}
//                 hint={errors.contact_details?.home_address?.message}
//               />

//               {/* Work Address */}
//               <Label>Work Address</Label>
//               <Input
//                 type="text"
//                 {...register("contact_details.work_address")}
//                 error={!!errors.contact_details?.work_address}
//                 hint={errors.contact_details?.work_address?.message}
//               />

//               {/* P.O. Box */}
//               <Label>P.O. Box</Label>
//               <Input
//                 type="text"
//                 {...register("contact_details.p_o_box")}
//                 error={!!errors.contact_details?.p_o_box}
//                 hint={errors.contact_details?.p_o_box?.message}
//               />

//               {/* Billing Address Attention */}
//               <Label>Billing Address Attention</Label>
//               <Input
//                 type="text"
//                 {...register("contact_details.billing_address_attention")}
//                 error={!!errors.contact_details?.billing_address_attention}
//                 hint={
//                   errors.contact_details?.billing_address_attention?.message
//                 }
//               />

//               {/* Billing Address Country */}
//               <Label>Billing Address Country</Label>
//               <Input
//                 type="text"
//                 {...register("contact_details.billing_address_country_id")}
//                 error={!!errors.contact_details?.billing_address_country_id}
//                 hint={
//                   errors.contact_details?.billing_address_country_id?.message
//                 }
//               />

//               {/* Billing Address Street 1 */}
//               <Label>Billing Address Street 1</Label>
//               <Input
//                 type="text"
//                 {...register("contact_details.billing_address_street_1")}
//                 error={!!errors.contact_details?.billing_address_street_1}
//                 hint={errors.contact_details?.billing_address_street_1?.message}
//               />

//               {/* Billing Address Street 2 */}
//               <Label>Billing Address Street 2</Label>
//               <Input
//                 type="text"
//                 {...register("contact_details.billing_address_street_2")}
//                 error={!!errors.contact_details?.billing_address_street_2}
//                 hint={errors.contact_details?.billing_address_street_2?.message}
//               />

//               {/* Billing Address Country/State */}
//               <Label>Billing Address Country/State</Label>
//               <Input
//                 type="text"
//                 {...register(
//                   "contact_details.billing_address_country_state_id"
//                 )}
//                 error={
//                   !!errors.contact_details?.billing_address_country_state_id
//                 }
//                 hint={
//                   errors.contact_details?.billing_address_country_state_id
//                     ?.message
//                 }
//               />

//               {/* Billing Address Zip Code */}
//               <Label>Billing Address Zip Code</Label>
//               <Input
//                 type="text"
//                 {...register("contact_details.billing_address_zip_code")}
//                 error={!!errors.contact_details?.billing_address_zip_code}
//                 hint={errors.contact_details?.billing_address_zip_code?.message}
//               />

//               {/* Billing Address Phone */}
//               <Label>Billing Address Phone</Label>
//               <Input
//                 type="tel"
//                 {...register("contact_details.billing_address_phone")}
//                 error={!!errors.contact_details?.billing_address_phone}
//                 hint={errors.contact_details?.billing_address_phone?.message}
//               />

//               {/* Billing Address Fax Number */}
//               <Label>Billing Address Fax Number</Label>
//               <Input
//                 type="text"
//                 {...register("contact_details.billing_address_fax_number")}
//                 error={!!errors.contact_details?.billing_address_fax_number}
//                 hint={
//                   errors.contact_details?.billing_address_fax_number?.message
//                 }
//               />

//               {/* Shipping Address Attention */}
//               <Label>Shipping Address Attention</Label>
//               <Input
//                 type="text"
//                 {...register("contact_details.shipping_address_attention")}
//                 error={!!errors.contact_details?.shipping_address_attention}
//                 hint={
//                   errors.contact_details?.shipping_address_attention?.message
//                 }
//               />

//               {/* Shipping Address Country */}
//               <Label>Shipping Address Country</Label>
//               <Input
//                 type="text"
//                 {...register("contact_details.shipping_address_country_id")}
//                 error={!!errors.contact_details?.shipping_address_country_id}
//                 hint={
//                   errors.contact_details?.shipping_address_country_id?.message
//                 }
//               />
//               {/* Shipping Address Street 1 */}
//               <Label>Shipping Address Street 1</Label>
//               <Input
//                 type="text"
//                 {...register("contact_details.shipping_address_street_1")}
//                 error={!!errors.contact_details?.shipping_address_street_1}
//                 hint={
//                   errors.contact_details?.shipping_address_street_1?.message
//                 }
//               />

//               {/* Shipping Address Street 2 */}
//               <Label>Shipping Address Street 2</Label>
//               <Input
//                 type="text"
//                 {...register("contact_details.shipping_address_street_2")}
//                 error={!!errors.contact_details?.shipping_address_street_2}
//                 hint={
//                   errors.contact_details?.shipping_address_street_2?.message
//                 }
//               />

//               {/* Shipping Address City */}
//               <Label>Shipping Address City</Label>
//               <Input
//                 type="text"
//                 {...register("contact_details.shipping_address_city")}
//                 error={!!errors.contact_details?.shipping_address_city}
//                 hint={errors.contact_details?.shipping_address_city?.message}
//               />

//               {/* Shipping Address Country/State */}
//               <Label>Shipping Address Country/State</Label>
//               <Input
//                 type="text"
//                 {...register(
//                   "contact_details.shipping_address_country_state_id"
//                 )}
//                 error={
//                   !!errors.contact_details?.shipping_address_country_state_id
//                 }
//                 hint={
//                   errors.contact_details?.shipping_address_country_state_id
//                     ?.message
//                 }
//               />

//               {/* Shipping Address Zip Code */}
//               <Label>Shipping Address Zip Code</Label>
//               <Input
//                 type="text"
//                 {...register("contact_details.shipping_address_zip_code")}
//                 error={!!errors.contact_details?.shipping_address_zip_code}
//                 hint={
//                   errors.contact_details?.shipping_address_zip_code?.message
//                 }
//               />

//               {/* Shipping Address Fax Number */}
//               <Label>Shipping Address Fax Number</Label>
//               <Input
//                 type="text"
//                 {...register("contact_details.shipping_address_fax_number")}
//                 error={!!errors.contact_details?.shipping_address_fax_number}
//                 hint={
//                   errors.contact_details?.shipping_address_fax_number?.message
//                 }
//               />

//               {/* Salutation (Arabic) */}
//               <Label>Salutation (Arabic)</Label>
//               <Input
//                 type="text"
//                 {...register("contact_persons.0.salutation_ar")}
//                 error={!!errors.contact_persons?.[0]?.salutation_ar}
//                 hint={errors.contact_persons?.[0]?.salutation_ar?.message}
//               />

//               {/* Salutation (English) */}
//               <Label>Salutation (English)</Label>
//               <Input
//                 type="text"
//                 {...register("contact_persons.0.salutation_en")}
//                 error={!!errors.contact_persons?.[0]?.salutation_en}
//                 hint={errors.contact_persons?.[0]?.salutation_en?.message}
//               />

//               {/* Full Name (Arabic) */}
//               <Label>Full Name (Arabic)</Label>
//               <Input
//                 type="text"
//                 {...register("contact_persons.0.full_name_ar")}
//                 error={!!errors.contact_persons?.[0]?.full_name_ar}
//                 hint={errors.contact_persons?.[0]?.full_name_ar?.message}
//               />

//               {/* Full Name (English) */}
//               <Label>Full Name (English)</Label>
//               <Input
//                 type="text"
//                 {...register("contact_persons.0.full_name_en")}
//                 error={!!errors.contact_persons?.[0]?.full_name_en}
//                 hint={errors.contact_persons?.[0]?.full_name_en?.message}
//               />

//               {/* First Name (Arabic) */}
//               <Label>First Name (Arabic)</Label>
//               <Input
//                 type="text"
//                   {...register("contact_persons.0.first_name_ar")}
//                 error={!!errors.contact_persons?.[0]?.first_name_ar}
//                 hint={errors.contact_persons?.[0]?.first_name_ar?.message}
//               />

//               {/* First Name (English) */}
//               <Label>First Name (English)</Label>
//               <Input
//                 type="text"
//                   {...register("contact_persons.0.first_name_en")}

//                 error={!!errors.contact_persons?.[0]?.first_name_en}
//                 hint={errors.contact_persons?.[0]?.first_name_en?.message}
//               />

//               {/* Last Name (Arabic) */}
//               <Label>Last Name (Arabic)</Label>
//               <Input
//                 type="text"
//                 {...register("contact_persons.0.last_name_ar")}
//                 error={!!errors.contact_persons?.[0]?.last_name_ar}
//                 hint={errors.contact_persons?.[0]?.last_name_ar?.message}
//               />

//               {/* Last Name (English) */}
//               <Label>Last Name (English)</Label>
//               <Input
//                 type="text"
//                 {...register("contact_persons.0.last_name_en")}
//                 error={!!errors.contact_persons?.[0]?.last_name_en}
//                 hint={errors.contact_persons?.[0]?.last_name_en?.message}
//               />

//               {/* Email */}
//               <Label>Email</Label>
//               <Input
//                 type="email"
//                 {...register("contact_persons.0.email")}
//                 error={!!errors.contact_persons?.[0]?.email}
//                 hint={errors.contact_persons?.[0]?.email?.message}
//               />

//               {/* Mobile */}
//               <Label>Mobile</Label>
//               <Input
//                 type="tel"
//                 {...register("contact_persons.0.mobile")}
//                 error={!!errors.contact_persons?.[0]?.mobile}
//                 hint={errors.contact_persons?.[0]?.mobile?.message}
//               />

//               {/* Department */}
//               <Label>Department</Label>
//               <Input
//                 type="text"
//                 {...register("contact_persons.0.department")}
//                 error={!!errors.contact_persons?.[0]?.department}
//                 hint={errors.contact_persons?.[0]?.department?.message}
//               />

//               {/* Designation */}
//               <Label>Designation</Label>
//               <Input
//                 type="text"
//                 {...register("contact_persons.0.designation")}
//                 error={!!errors.contact_persons?.[0]?.designation}
//                 hint={errors.contact_persons?.[0]?.designation?.message}
//               />

//               {/* Social Media */}
//               <Label>Social Media</Label>
//               <Input
//                 type="text"
//                 {...register("contact_persons.0.social_media")}
//                 error={!!errors.contact_persons?.[0]?.social_media}
//                 hint={errors.contact_persons?.[0]?.social_media?.message}
//               />

//               {/* ************************* */}
//               <div>
//                 <Label>Full Name (En)</Label>
//                 <Input
//                   {...register("full_name_en")}
//                   error={!!errors.full_name_en}
//                   hint={errors.full_name_en?.message}
//                 />

//                 <Label>Full Name (En)</Label>
//                 <Input
//                   {...register("full_name_ar")}
//                   error={!!errors.full_name_ar}
//                   hint={errors.full_name_ar?.message}
//                 />

//                 <Label>Last Name (Ar)</Label>
//                 <Input
//                   {...register("last_name_ar")}
//                   error={!!errors.last_name_ar}
//                   hint={errors.last_name_ar?.message}
//                 />
//                 <Label>Last Name (En)</Label>
//                 <Input
//                   {...register("last_name_en")}
//                   error={!!errors.last_name_en}
//                   hint={errors.last_name_en?.message}
//                 />

//                 <Label>Email</Label>
//                 <Input
//                   type="email"
//                   {...register("email")}
//                   error={!!errors.email}
//                   hint={errors.email?.message}
//                 />

//                 <Label>Mobile</Label>
//                 <Input
//                   type="text"
//                   {...register("mobile")}
//                   error={!!errors.mobile}
//                   hint={errors.mobile?.message}
//                 />

//                 <Label>Balance</Label>
//                 <Input
//                   type="number"
//                   {...register("balance")}
//                   error={!!errors.balance}
//                   hint={errors.balance?.message}
//                 />

//                 <Label>Payment Term</Label>
//                 <Input
//                   {...register("payment_term_id")}
//                   error={!!errors.payment_term_id}
//                   hint={errors.payment_term_id?.message}
//                 />

//                 <Label>Currency</Label>
//                 <Input
//                   {...register("currency_id")}
//                   error={!!errors.currency_id}
//                   hint={errors.currency_id?.message}
//                 />

//                 <Label>Exchange Rate</Label>
//                 <Input
//                   type="number"
//                   {...register("exchange_rate")}
//                   error={!!errors.exchange_rate}
//                   hint={errors.exchange_rate?.message}
//                 />
//               </div>

//               {/* Right Side */}
//               <div>
//                 <Label>Full Name (Ar)</Label>
//                 <Input
//                   {...register("full_name_ar")}
//                   error={!!errors.full_name_ar}
//                   hint={errors.full_name_ar?.message}
//                 />

//                 <Label>Nationality</Label>
//                 <Input
//                   {...register("nationality_id")}
//                   error={!!errors.nationality_id}
//                   hint={errors.nationality_id?.message}
//                 />

//                 <Label>Contact Type</Label>
//                 <Input
//                   {...register("contact_type")}
//                   error={!!errors.contact_type}
//                   hint={errors.contact_type?.message}
//                 />

//                 <Label>Type</Label>
//                 <Input
//                   {...register("type")}
//                   error={!!errors.type}
//                   hint={errors.type?.message}
//                 />

//                 <Label>Portal Access</Label>
//                 <Input
//                   {...register("portal_access")}
//                   error={!!errors.portal_access}
//                   hint={errors.portal_access?.message}
//                 />

//                 <Label>Portal Language</Label>
//                 <Input
//                   {...register("portal_language")}
//                   error={!!errors.portal_language}
//                   hint={errors.portal_language?.message}
//                 />
//               </div>
//             </div>

//             {/* Contact Details */}
//             <div className="mt-4">
//               <Label>Contact Details</Label>
//               <div>
//                 <Label>Passport Number</Label>
//                 <Input
//                   {...register("contact_details.passport_number")}
//                   error={!!errors.contact_details?.passport_number}
//                   hint={errors.contact_details?.passport_number?.message}
//                 />

//                 <Label>Work Phone</Label>
//                 <Input
//                   {...register("contact_details.work_phone")}
//                   error={!!errors.contact_details?.work_phone}
//                   hint={errors.contact_details?.work_phone?.message}
//                 />

//                 <Label>Website URL</Label>
//                 <Input
//                   {...register("contact_details.website_url")}
//                   error={!!errors.contact_details?.website_url}
//                   hint={errors.contact_details?.website_url?.message}
//                 />

//                 <Label>Department</Label>
//                 <Input
//                   {...register("contact_details.department")}
//                   error={!!errors.contact_details?.department}
//                   hint={errors.contact_details?.department?.message}
//                 />

//                 <Label>Profession</Label>
//                 <Input
//                   {...register("contact_details.profession")}
//                   error={!!errors.contact_details?.profession}
//                   hint={errors.contact_details?.profession?.message}
//                 />

//                 <Label>Designation</Label>
//                 <Input
//                   {...register("contact_details.designation")}
//                   error={!!errors.contact_details?.designation}
//                   hint={errors.contact_details?.designation?.message}
//                 />

//                 <Label>Social Media</Label>
//                 <Input
//                   {...register("contact_details.social_media")}
//                   error={!!errors.contact_details?.social_media}
//                   hint={errors.contact_details?.social_media?.message}
//                 />

//                 <Label>ID Issued Date</Label>
//                 <Input
//                   type="date"
//                   {...register("contact_details.id_issued_date")}
//                   error={!!errors.contact_details?.id_issued_date}
//                   hint={errors.contact_details?.id_issued_date?.message}
//                 />

//                 <Label>ID Expiry Date</Label>
//                 <Input
//                   type="date"
//                   {...register("contact_details.id_expiry_date")}
//                   error={!!errors.contact_details?.id_expiry_date}
//                   hint={errors.contact_details?.id_expiry_date?.message}
//                 />

//                 <Label>Unified Number</Label>
//                 <Input
//                   {...register("contact_details.unified_number")}
//                   error={!!errors.contact_details?.unified_number}
//                   hint={errors.contact_details?.unified_number?.message}
//                 />

//                 <Label>Date of Birth</Label>
//                 <Input
//                   type="date"
//                   {...register("contact_details.date_of_birth")}
//                   error={!!errors.contact_details?.date_of_birth}
//                   hint={errors.contact_details?.date_of_birth?.message}
//                 />

//                 <Label>Place of Birth</Label>
//                 <Input
//                   {...register("contact_details.place_of_birth")}
//                   error={!!errors.contact_details?.place_of_birth}
//                   hint={errors.contact_details?.place_of_birth?.message}
//                 />

//                 <Label>Visit Visa Number</Label>
//                 <Input
//                   {...register("contact_details.visit_visa_number")}
//                   error={!!errors.contact_details?.visit_visa_number}
//                   hint={errors.contact_details?.visit_visa_number?.message}
//                 />

//                 <Label>Driving License Number</Label>
//                 <Input
//                   {...register("contact_details.driving_license_number")}
//                   error={!!errors.contact_details?.driving_license_number}
//                   hint={errors.contact_details?.driving_license_number?.message}
//                 />

//                 <Label>Driving License Issued By</Label>
//                 <Input
//                   {...register("contact_details.driving_license_issued_by")}
//                   error={!!errors.contact_details?.driving_license_issued_by}
//                   hint={
//                     errors.contact_details?.driving_license_issued_by?.message
//                   }
//                 />

//                 <Label>Driving License Issued Date</Label>
//                 <Input
//                   type="date"
//                   {...register("contact_details.driving_license_issued_date")}
//                   error={!!errors.contact_details?.driving_license_issued_date}
//                   hint={
//                     errors.contact_details?.driving_license_issued_date?.message
//                   }
//                 />

//                 <Label>Driving License Expiry Date</Label>
//                 <Input
//                   type="date"
//                   {...register("contact_details.driving_license_expiry_date")}
//                   error={!!errors.contact_details?.driving_license_expiry_date}
//                   hint={
//                     errors.contact_details?.driving_license_expiry_date?.message
//                   }
//                 />
//               </div>
//             </div>

//             {/* Shipping and Billing Addresses */}
//             <div className="mt-4">
//               <Label>Billing Address</Label>
//               <div>
//                 <Label>Attention</Label>
//                 <Input
//                   {...register("contact_details.billing_address_attention")}
//                   error={!!errors.contact_details?.billing_address_attention}
//                   hint={
//                     errors.contact_details?.billing_address_attention?.message
//                   }
//                 />

//                 <Label>Street 1</Label>
//                 <Input
//                   {...register("contact_details.billing_address_street_1")}
//                   error={!!errors.contact_details?.billing_address_street_1}
//                   hint={
//                     errors.contact_details?.billing_address_street_1?.message
//                   }
//                 />

//                 <Label>Street 2</Label>
//                 <Input
//                   {...register("contact_details.billing_address_street_2")}
//                   error={!!errors.contact_details?.billing_address_street_2}
//                   hint={
//                     errors.contact_details?.billing_address_street_2?.message
//                   }
//                 />

//                 <Label>City</Label>
//                 <Input
//                   {...register("contact_details.billing_address_city")}
//                   error={!!errors.contact_details?.billing_address_city}
//                   hint={errors.contact_details?.billing_address_city?.message}
//                 />

//                 <Label>Country State</Label>
//                 <Input
//                   {...register(
//                     "contact_details.billing_address_country_state_id"
//                   )}
//                   error={
//                     !!errors.contact_details?.billing_address_country_state_id
//                   }
//                   hint={
//                     errors.contact_details?.billing_address_country_state_id
//                       ?.message
//                   }
//                 />

//                 <Label>Zip Code</Label>
//                 <Input
//                   {...register("contact_details.billing_address_zip_code")}
//                   error={!!errors.contact_details?.billing_address_zip_code}
//                   hint={
//                     errors.contact_details?.billing_address_zip_code?.message
//                   }
//                 />

//                 <Label>Phone</Label>
//                 <Input
//                   {...register("contact_details.billing_address_phone")}
//                   error={!!errors.contact_details?.billing_address_phone}
//                   hint={errors.contact_details?.billing_address_phone?.message}
//                 />
//               </div>
//             </div>

//             <div className="mt-4">
//               <Label>Shipping Address</Label>
//               <div>
//                 <Label>Attention</Label>
//                 <Input
//                   {...register("contact_details.shipping_address_attention")}
//                   error={!!errors.contact_details?.shipping_address_attention}
//                   hint={
//                     errors.contact_details?.shipping_address_attention?.message
//                   }
//                 />

//                 <Label>Street 1</Label>
//                 <Input
//                   {...register("contact_details.shipping_address_street_1")}
//                   error={!!errors.contact_details?.shipping_address_street_1}
//                   hint={
//                     errors.contact_details?.shipping_address_street_1?.message
//                   }
//                 />

//                 <Label>Street 2</Label>
//                 <Input
//                   {...register("contact_details.shipping_address_street_2")}
//                   error={!!errors.contact_details?.shipping_address_street_2}
//                   hint={
//                     errors.contact_details?.shipping_address_street_2?.message
//                   }
//                 />

//                 <Label>City</Label>
//                 <Input
//                   {...register("contact_details.shipping_address_city")}
//                   error={!!errors.contact_details?.shipping_address_city}
//                   hint={errors.contact_details?.shipping_address_city?.message}
//                 />

//                 <Label>Country State</Label>
//                 <Input
//                   {...register(
//                     "contact_details.shipping_address_country_state_id"
//                   )}
//                   error={
//                     !!errors.contact_details?.shipping_address_country_state_id
//                   }
//                   hint={
//                     errors.contact_details?.shipping_address_country_state_id
//                       ?.message
//                   }
//                 />

//                 <Label>Zip Code</Label>
//                 <Input
//                   {...register("contact_details.shipping_address_zip_code")}
//                   error={!!errors.contact_details?.shipping_address_zip_code}
//                   hint={
//                     errors.contact_details?.shipping_address_zip_code?.message
//                   }
//                 />
//               </div>
//             </div>

//             {/* Submit Button */}
//             <div className="flex justify-end mt-6">
//               <button
//                 type="submit"
//                 className="px-6 py-3 text-sm font-medium text-white transition rounded-lg shadow bg-blue-600 hover:bg-blue-700 flex items-center gap-2"
//                 disabled={
//                   isSubmitting ||
//                   addCustomer.isPending ||
//                   updateCustomer.isPending
//                 }
//               >
//                 {isUpdate ? "Update" : "Create"}
//               </button>
//             </div>
//           </form>
//         )}
//       </ComponentCard>
//     </>
//   );
// }
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
import type { IBranch } from "@/types/settings/branches";
import type { IPaymentTerm } from "@/types/settings/payment_term";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { IoAdd } from "react-icons/io5";
import { useParams } from "react-router-dom";
import ComponentCard from "../../../components/common/ComponentCard";
import PageBreadcrumb from "../../../components/common/PageBreadCrumb";
import Input from "../../../components/form/input/InputField";
import Label from "../../../components/form/Label";
import { useMeStore } from "../../../store/useMeStore";
import Radio from "@/components/form/input/Radio";
import { IContact } from "@/types/sales/contact";

const TABS = [
  { id: 1, name: "Other Details" },
  { id: 2, name: "Contact Details" },
  { id: 3, name: "Contact Person" },
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
    const payload: IContact = {
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
          <div className="w-6 h-6 flex items-center justify-center bg-gray-200 rounded-full">
            <IoAdd className="w-5 h-5" />
          </div>
        }
      />
      <ComponentCard title={isUpdate ? "Update Customer" : "Create Customer"}>
        {isUpdate && isLoading ? (
          <p>Loading customer data...</p>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            {/* Basic Information Section */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <h2 className="text-xl font-semibold text-gray-800 mb-6">
                Basic Information
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Contact Type */}
                <div className="space-y-2">
                  <Label>Customer Type</Label>
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
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Full Name (Ar)</Label>
                    <Input
                      {...register("full_name_ar")}
                      error={!!errors.full_name_ar}
                      hint={errors.full_name_ar?.message}
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
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>First Name (Ar)</Label>
                    <Input
                      {...register("first_name_ar")}
                      error={!!errors.first_name_ar}
                      hint={errors.first_name_ar?.message}
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
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Last Name (Ar)</Label>
                    <Input
                      {...register("last_name_ar")}
                      error={!!errors.last_name_ar}
                      hint={errors.last_name_ar?.message}
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
                  />
                </div>
              </div>
            </div>

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

              {/* Other Details Tab */}
              {activeTab === 1 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>Nationality</Label>
                      <select
                        {...register("nationality_id")}
                        className="w-full p-2 border rounded"
                      >
                        <option value="" disabled>
                          Select Nationality
                        </option>
                        {countriesData?.data?.map((country) => (
                          <option key={country.id} value={country.id}>
                            {country.nationality_en}{" "}
                            {/* استخدم `nationality_ar` إذا كان التطبيق عربيًا */}
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
                        className="w-full p-2.5 border rounded-md focus:ring-2 focus:ring-blue-500"
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
                        className="w-full p-2.5 border rounded-md"
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
                        className="w-full p-2.5 border rounded-md"
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
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>Portal Access</Label>
                      <select
                        {...register("portal_access")}
                        className="w-full p-2.5 border rounded-md"
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
                        className="w-full p-2.5 border rounded-md"
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
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Work Phone</Label>
                      <Input
                        {...register("contact_details.work_phone")}
                        error={!!errors.contact_details?.work_phone}
                        hint={errors.contact_details?.work_phone?.message}
                        type="tel"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Website Url</Label>
                      <Input
                        {...register("contact_details.website_url")}
                        error={!!errors.contact_details?.website_url}
                        hint={errors.contact_details?.website_url?.message}
                        type="url"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Department</Label>
                      <Input
                        {...register("contact_details.department")}
                        error={!!errors.contact_details?.department}
                        hint={errors.contact_details?.department?.message}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Profession</Label>
                      <Input
                        {...register("contact_details.profession")}
                        error={!!errors.contact_details?.profession}
                        hint={errors.contact_details?.profession?.message}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Designation</Label>
                      <Input
                        {...register("contact_details.designation")}
                        error={!!errors.contact_details?.designation}
                        hint={errors.contact_details?.designation?.message}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Social Media</Label>
                      <Input
                        {...register("contact_details.social_media")}
                        error={!!errors.contact_details?.social_media}
                        hint={errors.contact_details?.social_media?.message}
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
                      <Label>Visit Visa Number</Label>
                      <Input
                        {...register("contact_details.visit_visa_number")}
                        error={!!errors.contact_details?.visit_visa_number}
                        hint={
                          errors.contact_details?.visit_visa_number?.message
                        }
                        type="number"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Driving License number</Label>
                      <Input
                        {...register("contact_details.driving_license_number")}
                        error={!!errors.contact_details?.driving_license_number}
                        hint={
                          errors.contact_details?.driving_license_number
                            ?.message
                        }
                        type="number"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Driving license issued by</Label>
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
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Driving license issued date</Label>
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
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Driving license expiry date</Label>
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
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Home Address</Label>
                      <Input
                        {...register("contact_details.home_address")}
                        error={!!errors.contact_details?.home_address}
                        hint={errors.contact_details?.home_address?.message}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Work Address</Label>
                      <Input
                        {...register("contact_details.work_address")}
                        error={!!errors.contact_details?.work_address}
                        hint={errors.contact_details?.work_address?.message}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>P O box</Label>
                      <Input
                        {...register("contact_details.p_o_box")}
                        error={!!errors.contact_details?.p_o_box}
                        hint={errors.contact_details?.p_o_box?.message}
                      />
                    </div>
                  </div>
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
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Billing Address Country</Label>
                        <select
                          {...register(
                            "contact_details.billing_address_country_id"
                          )}
                          className="w-full p-2.5 border rounded-md focus:ring-2 focus:ring-blue-500"
                          // disabled={countriesLoading}
                        >
                          <option value="" disabled>
                            Select Country
                          </option>

                          {countriesData?.data?.map((country) => (
                            <option key={country.id} value={country.id}>
                              {country.name_en}{" "}
                              {/* أو nationality_ar حسب اللغة */}
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
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>State</Label>
                          <select
                            {...register(
                              "contact_details.shipping_address_country_state_id"
                            )}
                            className="w-full p-2.5 border rounded-md focus:ring-2 focus:ring-blue-500"
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
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>shipping Address Country</Label>
                        <select
                          {...register(
                            "contact_details.shipping_address_country_id"
                          )}
                          className="w-full p-2.5 border rounded-md focus:ring-2 focus:ring-blue-500"
                          // disabled={countriesLoading}
                        >
                          <option value="" disabled>
                            Select Country
                          </option>

                          {countriesData?.data?.map((country) => (
                            <option key={country.id} value={country.id}>
                              {country.name_en}{" "}
                              {/* أو nationality_ar حسب اللغة */}
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
                          />
                        </div>
                        <div className="space-y-2 ">
                          <Label>State</Label>
                          <select
                            {...register(
                              "contact_details.billing_address_country_state_id"
                            )}
                            className="w-full p-2.5 border rounded-md focus:ring-2 focus:ring-blue-500"
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
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Contact Person Tab */}
              {activeTab === 3 && (
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
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Email</Label>
                      <Input
                        type="email"
                        {...register("contact_persons.0.email")}
                        error={!!errors.contact_persons?.[0]?.email}
                        hint={errors.contact_persons?.[0]?.email?.message}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Phone</Label>
                      <Input
                        type="tel"
                        {...register("contact_persons.0.mobile")}
                        error={!!errors.contact_persons?.[0]?.mobile}
                        hint={errors.contact_persons?.[0]?.mobile?.message}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Designation</Label>
                      <Input
                        {...register("contact_persons.0.designation")}
                        error={!!errors.contact_persons?.[0]?.designation}
                        hint={errors.contact_persons?.[0]?.designation?.message}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Department</Label>
                      <Input
                        {...register("contact_persons.0.department")}
                        error={!!errors.contact_persons?.[0]?.department}
                        hint={errors.contact_persons?.[0]?.department?.message}
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
                      />
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
