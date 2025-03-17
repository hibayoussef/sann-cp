import * as Yup from "yup";

const step5Validation = Yup.object({
  plan_id: Yup.string().nullable(),
  plan_price_id: Yup.string().nullable(),
  plan_type: Yup.string().nullable(),
});

export default step5Validation;
