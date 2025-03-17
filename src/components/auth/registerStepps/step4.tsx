import { useFetchCurrencyById } from "../../../hooks/useCommon";
import { useCommonStore } from "../../../store/useCommonStore";
import Input from "../../form/input/InputField";
import Label from "../../form/Label";
import { useFormikContext } from "formik";

export default function Step4() {
  const { currency } = useCommonStore();
  const { data: currencyData } = useFetchCurrencyById(currency);

  const { errors, touched, handleChange, handleBlur, values, setFieldValue } =
    useFormikContext<{
      vat_registered_on: string;
      tax_registration_number: number;
      tax_registration_number_label: number;
      registered_for_vat: boolean;
      currency_id: number;
    }>();

  return (
    <div className="flex flex-col w-full overflow-y-auto no-scrollbar">
      <div className="flex flex-col justify-center w-full mx-auto max-w-xl">
        <div className="w-full">
          <div className="mb-5 sm:mb-8 text-center">
            <h2 className="mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90">
              Tax & VAT Information
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Enter your Tax & VAT Information!
            </p>
          </div>
          <form className="w-full">
            <div className="w-full mb-4">
              <Label>
                Currency
                <span className="text-error-500">*</span>
              </Label>
              <Input
                type="text"
                // name="curreny_id"
                placeholder="Enter Currency"
                value={
                  currencyData?.currency_code +
                  " - " +
                  currencyData?.currency_name
                }
                onChange={handleChange}
                onBlur={handleBlur}
                className="w-full"
                readOnly
              />
              {errors.currency_id && touched.currency_id && (
                <p className="text-red-500 text-sm">{errors.currency_id}</p>
              )}
            </div>
            <div className="space-y-5 w-full">
              <div className="flex items-center justify-between mr-4">
                <Label>
                  Is This business registered for VAT
                  <span className="text-error-500">*</span>
                </Label>
                <label className="inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={values.registered_for_vat}
                    onChange={(e) =>
                      setFieldValue("registered_for_vat", e.target.checked)
                    }
                    onBlur={handleBlur}
                    className="sr-only peer"
                  />

                  <div
                    className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4
                   peer-focus:ring-blue-300 dark:peer-focus:ring-[#575db1] rounded-full peer
                    dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full
                     peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px]
                      after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all
                       dark:border-gray-600 peer-checked:bg-[#575db1] dark:peer-checked:bg-[#575db1]"
                  ></div>
                </label>
              </div>

              <>
                <div className="w-full flex space-x-2">
                  <div className="w-full">
                    <Label>Tax Registration Number Label</Label>
                    <Input
                      type="text"
                      id="tax_registration_number_label"
                      name="tax_registration_number_label"
                      placeholder="Enter Tax Registration Number Label"
                      className="w-full"
                      value={values.tax_registration_number_label}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      disabled={!values.registered_for_vat}
                    />
                  </div>
                  <div className="w-full">
                    <Label>Tax Registration Number (TRN)</Label>
                    <Input
                      type="text"
                      id="tax_registration_number"
                      name="tax_registration_number"
                      placeholder="Enter Tax Registration Number"
                      className="w-full"
                      value={values.tax_registration_number}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      disabled={!values.registered_for_vat}
                    />
                  </div>
                </div>
                <div className="w-full flex space-x-2">
                  <div className="w-full">
                    <Label>VAT Registered On</Label>
                    <Input
                      type="date"
                      id="vat_registered_on"
                      name="vat_registered_on"
                      className="w-full"
                      value={values.vat_registered_on}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      disabled={!values.registered_for_vat}
                    />
                  </div>
                </div>
              </>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
