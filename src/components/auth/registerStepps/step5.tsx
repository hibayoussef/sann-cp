import { useState } from "react";
import { useFetchPlansByCurrency } from "../../../hooks/useCommon";
import { useFormikContext } from "formik";
import Loader from "../../ui/loader/loader";
import { motion } from "framer-motion";
import { useCommonStore } from "../../../store/useCommonStore";

export default function Step5() {
  const { currency } = useCommonStore(); 
  const { data: plans } = useFetchPlansByCurrency(currency); 
  const [billingCycle, setBillingCycle] = useState("Monthly");

  const { values, setFieldValue } = useFormikContext<{
    plan_id: number;
    plan_price_id: number;
    plan_type: string;
  }>();

  return (
    <div className="w-full mx-auto py-12 px-4 sm:px-12 lg:px-12">
      <div className="mb-5 sm:mb-8 text-center">
        <h2 className="mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90">
          Subscriptions & Plans
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Enter your Subscriptions & Plans!
        </p>
      </div>

      {/* Billing Toggle */}
      <div className="flex justify-center mb-12">
        <div className="bg-gray-100 p-1 rounded-full">
          <button
            onClick={(e) => {
              e.preventDefault();
              setBillingCycle("Monthly");
            }}
            className={`px-6 py-2 rounded-full ${
              billingCycle === "Monthly"
                ? "bg-[#575db1] text-white"
                : "text-gray-600"
            }`}
          >
            Monthly
          </button>
          <button
            onClick={(e) => {
              e.preventDefault();
              setBillingCycle("yearly");
            }}
            className={`px-6 py-2 rounded-full ${
              billingCycle === "yearly"
                ? "bg-[#575db1] text-white"
                : "text-gray-600"
            }`}
          >
            Annually
          </button>
        </div>
      </div>

      {!plans || !plans.data?.length ? (
        <div className="flex justify-center items-center h-40">
          <Loader />
        </div>
      ) : (
        <div className="mt-12 space-y-3 sm:mt-16 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-6 md:max-w-5xl md:mx-auto xl:grid-cols-3">
          {plans.data.map((plan, index) => {
            const price = plan.prices.find((p) => p.currency === currency);

            return (
              <motion.div
                key={plan?.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <div
                  key={plan.id}
                  className={`border border-slate-200 rounded-xl ${
                    plan.plan_name_en.toLowerCase() === "standard"
                      ? "bg-slate-800"
                      : ""
                  } shadow-sm divide-y divide-slate-200 overflow-hidden ${
                    plan.plan_name_en.toLowerCase() === "standard"
                      ? "border-2 border-state-800 shadow-lg"
                      : ""
                  }`}
                >
                  <div className="p-6">
                    <h2
                      className={`text-xl leading-6 font-bold text-slate-700 ${
                        plan.plan_name_en.toLowerCase() === "standard"
                          ? "text-white"
                          : ""
                      }`}
                    >
                      {plan.plan_name_en}
                    </h2>
                    <p
                      className={`mt-2 text-base text-slate-700 leading-tight ${
                        plan.plan_name_en.toLowerCase() === "standard"
                          ? "text-white"
                          : ""
                      }`}
                    >
                      {plan.plan_description_en}
                    </p>
                    <p className="mt-8">
                      <span
                        className={`text-3xl font-bold text-slate-900 ${
                          plan.plan_name_en.toLowerCase() === "standard"
                            ? "text-white"
                            : ""
                        } tracking-tighter`}
                      >
                        {billingCycle === "Monthly"
                          ? price?.monthly_price_en
                          : price?.yearly_price_en}
                      </span>
                      <span
                        className={`text-base font-medium text-slate-500 ${
                          plan.plan_name_en.toLowerCase() === "standard"
                            ? "text-white"
                            : ""
                        }`}
                      >
                        /{billingCycle === "Monthly" ? "Monthly" : "year"}
                      </span>
                    </p>
                  </div>
                  <div className="pt-6 pb-8 px-6">
                    <ul role="list" className="mt-4 space-y-3">
                      {plan.features.map((feature) => (
                        <li key={feature.id} className="flex space-x-3">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="flex-shrink-0 h-5 w-5 text-green-400"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            strokeWidth="2"
                            stroke="currentColor"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            aria-hidden="true"
                          >
                            <path
                              stroke="none"
                              d="M0 0h24v24H0z"
                              fill="none"
                            ></path>
                            <path d="M5 12l5 5l10 -10"></path>
                          </svg>
                          <span
                            className={`text-base text-slate-700 ${
                              plan.plan_name_en.toLowerCase() === "standard"
                                ? "text-white"
                                : ""
                            }`}
                          >
                            {feature.feature_en}
                          </span>
                        </li>
                      ))}
                    </ul>
                    <button
                      type="button"
                      onClick={() => {
                        setFieldValue("plan_id", plan.id);
                        setFieldValue("plan_price_id", price?.id);
                        setFieldValue("plan_type", billingCycle);
                      }}
                      className={`mt-8 block w-full ${
                        values.plan_id === plan.id
                          ? "bg-green-600"
                          : "bg-[#575db1]"
                      } rounded-md py-4 text-sm font-semibold text-white text-center`}
                    >
                      {values.plan_id === plan.id ? "Selected" : "Choose Plan"}
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
}
