import { Form, Formik } from "formik";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useRegister } from "../../hooks/useLogin";
import Loader from "../ui/loader/loader";
import Step1 from "./registerStepps/step1";
import Step2 from "./registerStepps/step2";
import Step3 from "./registerStepps/step3";
import Step4 from "./registerStepps/step4";
import Step5 from "./registerStepps/step5";
import step1Validation from "./registerStepps/validations/step1ValidationSchema";
import step2Validation from "./registerStepps/validations/step2ValidationSchema";
import step4Validation from "./registerStepps/validations/step4ValidationSchema";
import step5Validation from "./registerStepps/validations/step5ValidationSchema";
import { motion } from "framer-motion";
import step3Validation from "./registerStepps/validations/step3ValidationSchema";

export default function SignUpForm() {
  const [step, setStep] = useState(1);
  const totalSteps = 5;
  const [showPopup, setShowPopup] = useState(false);

  const [formValues, setFormValues] = useState({
    mobile: "",
    email: "",
    organization_name_en: "",
    currency_id: "",
    organization_name_ar: "",
    country_state_id: "",
    country_id: "",
    password: "",
    time_zone_id: "",
    registered_for_vat: 0,
    postal_code: "",
    city: "",
    street1: "",
    street2: "",
    vat_registered_on: "",
    tax_registration_number_label: "",
    tax_registration_number: "",
    plan_type: "",
    plan_price_id: "",
    plan_id: "",
  });

  const validationSchema = [
    step1Validation,
    step2Validation,
    step3Validation,
    step4Validation,
    step5Validation,
  ];

  const { mutate, isPending } = useRegister();

  const nextStep = async (validateForm, values) => {
    const errors = await validateForm();
    if (Object.keys(errors).length === 0 && step < totalSteps) {
      setFormValues(values);
      setStep(step + 1);
    }
  };

  const prevStep = (event) => {
    event.preventDefault();
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = async (values, actions) => {
    if (step < totalSteps) {
      setFormValues(values);
      setStep(step + 1);
    } else {
      mutate(values, {
        onSuccess: () => {
          setShowPopup(true);
        },
      });
    }
    actions.setSubmitting(false);
  };

  const navigate = useNavigate(); 

  return (
    <div className="flex flex-col flex-1 w-full overflow-y-auto no-scrollbar">
      <div className="flex flex-col justify-center align-center flex-1 w-full max-w-xxl mx-auto">
        <div className="mb-5 sm:mb-8 text-center mt-6">
          <div className="flex justify-center items-center space-x-4">
            {[...Array(totalSteps)].map((_, index) => (
              <div
                key={index}
                className={`h-2 w-13 rounded-full ${
                  step > index ? "bg-[#575db1]" : "bg-gray-300"
                }`}
              ></div>
            ))}
          </div>
        </div>
        <div>
          <Formik
            initialValues={formValues}
            validationSchema={validationSchema[step - 1]}
            onSubmit={handleSubmit}
            enableReinitialize
          >
            {({ isSubmitting, validateForm, values }) => (
              <Form className="flex flex-col flex-1 w-full overflow-y-auto no-scrollbar">
                <div className="space-y-5 w-full">
                  <motion.div
                    key={step}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.5 }}
                    className="space-y-5 w-full"
                  >
                    <div className="w-full">
                      {step === 1 && <Step1 />}
                      {step === 2 && <Step2 />}
                      {step === 3 && <Step3 />}
                      {step === 4 && <Step4 />}
                      {step === 5 && <Step5 />}
                    </div>
                  </motion.div>
                  {/* ✅ Navigation Buttons */}
                  <div className="flex space-x-4 max-w-xl mx-auto">
                    <button
                      onClick={prevStep}
                      disabled={step === 1}
                      className="flex items-center justify-center w-full px-4 py-3 text-sm disabled:opacity-50 font-medium text-white transition rounded-lg bg-gray-500 shadow-theme-xs hover:bg-gray-600"
                    >
                      Back
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        if (step < totalSteps) {
                          nextStep(validateForm, values);
                        } else {
                          handleSubmit(values, { setSubmitting: () => {} });
                        }
                      }}
                      disabled={isSubmitting}
                      className="flex items-center justify-center w-full px-4 py-3 text-sm font-medium disabled:opacity-50 text-white transition rounded-lg  shadow-theme-xs bg-[#575db1] hover:bg-[#474ca1]"
                    >
                      {isPending ? <Loader /> : "Next"}
                    </button>
                  </div>
                </div>
              </Form>
            )}
          </Formik>

          {showPopup && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
              <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full text-center">
                <h2 className="text-lg font-semibold text-gray-800">
                  Verify Your Email
                </h2>
                <p className="text-gray-600 mt-2">
                  Please check your email inbox and click the verification link
                  to activate your account.
                </p>
                <button
                  onClick={() => {
                    navigate("/signin"), 
                    setShowPopup(false);
                  }}
                  className="mt-4 px-4 py-2 bg-[#575db1] hover:bg-[#474ca1] text-white rounded-lg transition"
                >
                  OK, Got it!
                </button>
              </div>
            </div>
          )}

          {/* ✅ Already Have an Account Section */}
          {step === 1 && (
            <div className="mt-5 max-w-xl mx-auto">
              <p className="text-sm font-normal text-center text-gray-700 dark:text-gray-400 sm:text-start">
                Already have an account?
                <Link
                  to="/signin"
                  className="text-brand-500 hover:text-brand-600 dark:text-brand-400"
                >
                  Sign In
                </Link>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
