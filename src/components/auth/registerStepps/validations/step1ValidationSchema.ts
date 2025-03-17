import * as Yup from "yup";

const step1Validation = Yup.object({
  organization_name_en: Yup.string().required(
    "Organization Name (English) is required"
  ),
  language: Yup.string().required("Language is required"),
  industry_id: Yup.string().required("Industry is required"),
  country_state_id: Yup.string().required("Country State is required"),
  country_id: Yup.string().required("Country is required"),
});

export default step1Validation;
