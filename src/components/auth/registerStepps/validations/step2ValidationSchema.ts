import * as Yup from "yup";

const step2Validation = Yup.object({
  time_zone_id: Yup.string().required("Time Zone is required"),
  postal_code: Yup.string().required("Postal Code is required"),
  street1: Yup.string().nullable(),
  street2: Yup.string().nullable(),
  city: Yup.string().nullable(),
});

export default step2Validation;
