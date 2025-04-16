// import { useSearchParams } from "react-router";
// import { ContactForm } from "./contactForm";
// import { useAddContact, useFetchContact } from "@/hooks/sales/contacts";
// import { useParams } from "react-router";
// import type { CustomerType } from "@/types/enums/contactType";

// export function CloneContact() {
//   const { id } = useParams();
//   const [searchParams] = useSearchParams();
//   const type = searchParams.get('type') as 'customer' | 'vendor';
//   const { data: contact } = useFetchContact(Number(id));
//   const addContact = useAddContact();

//   const handleSubmit = async (data: CustomerType) => {
//     await addContact.mutateAsync({
//       ...data,
//       type
//     });
//   };

//   return (
//     <ContactForm
//       type={type}
//       defaultValues={contact}
//       onSubmit={handleSubmit}
//       isSubmitting={addContact.isPending}
//     />
//   );
// }


