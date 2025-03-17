import * as Yup from "yup";

const step4Validation = Yup.object({
  vat_registered_on: Yup.string().nullable(),
  tax_registration_number: Yup.string().nullable(),
  tax_registration_number_label: Yup.string().nullable(),
  registered_for_vat: Yup.string().required("VAT Registration is required"),
  currency_id: Yup.string().required("Currency is required"),
});

export default step4Validation;
