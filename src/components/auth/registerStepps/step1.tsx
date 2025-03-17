import { useFormikContext } from "formik";
import { useState } from "react";
import { useFetchCountries, useFetchIndustry } from "../../../hooks/useCommon";
import { useCommonStore } from "../../../store/useCommonStore";
import { CountryState } from "../../../types/common";
import Input from "../../form/input/InputField";
import Label from "../../form/Label";

export default function Step1() {
  const { data: industries } = useFetchIndustry();
  const { data: countries } = useFetchCountries();
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [countryStates, setCountryStates] = useState<CountryState[]>([]);
  const { setZipCode, setTimeZone, setCurrency } = useCommonStore();
  const { errors, touched, handleChange, handleBlur, values, setFieldValue } =
    useFormikContext<{
      organization_name_en: string;
      industry_id: string;
      country_id: string;
      country_state_id: string;
      language: string;
    }>();

  const handleCountryChange = (event) => {
    const countryId = event.target.value;
    setFieldValue("country_id", countryId);
    setSelectedCountry(countryId);

    const selectedCountryData = countries?.data.find(
      (country) => country.id === parseInt(countryId)
    );
    setCountryStates(
      selectedCountryData ? selectedCountryData.country_states : []
    );
    if (selectedCountryData) {
      setCurrency(selectedCountryData.currency);
      setFieldValue("currency_id", selectedCountryData.currency);
    }
  };

  const handleStateChange = (event) => {
    const stateId = event.target.value;
    setFieldValue("country_state_id", stateId);
    const selectedState = countryStates.find(
      (state) => state.id === parseInt(stateId)
    );
    if (selectedState) {
      setZipCode(selectedState.zip_code);
      setTimeZone(selectedState.time_zone);
      setFieldValue("postal_code", selectedState.zip_code);
      setFieldValue("time_zone_id", selectedState?.time_zone?.id);
    }
  };
  return (
    <div className="flex flex-col w-full overflow-y-auto no-scrollbar">
      <div className="flex flex-col justify-center w-full mx-auto max-w-xl">
        <div className="w-full">
          <div className="mb-5 sm:mb-8 text-center">
            <h2 className="mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90">
              Organization Details
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Enter your Organization Details!
            </p>
          </div>
          <form className="w-full">
            <div className="space-y-5 w-full">
              <div className="grid grid-cols-1 gap-5 w-full">
                <div className="w-full">
                  <Label>
                    Organization Name<span className="text-error-500">*</span>
                  </Label>
                  <Input
                    name="organization_name_en"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.organization_name_en}
                  />
                  {errors.organization_name_en &&
                    touched.organization_name_en && (
                      <p className="text-red-500 text-sm">
                        {errors.organization_name_en}
                      </p>
                    )}
                </div>
                <div className="w-full">
                  <Label>
                    Industry<span className="text-error-500">*</span>
                  </Label>
                  <select
                    name="industry_id"
                    onChange={handleChange}
                    value={values.industry_id}
                    className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  >
                    <option value="">Select an industry</option>
                    {industries?.data.map((industry) => (
                      <option key={industry.id} value={industry.id}>
                        {industry.name_en}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="w-full">
                  <Label>
                    Language<span className="text-error-500">*</span>
                  </Label>
                  <select
                    name="language"
                    onChange={handleChange}
                    value={values.language}
                    className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  >
                    <option value="">Select a Language</option>
                    <option key="1" value="en">
                      English
                    </option>
                    <option key="2" value="ar">
                      Arabic
                    </option>
                  </select>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 w-full">
                  <div className="w-full">
                    {" "}
                    <Label>
                      Organization Location
                      <span className="text-error-500">*</span>
                    </Label>
                    <select
                      name="country_id"
                      value={values.country_id}
                      onChange={handleCountryChange}
                      className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    >
                      <option value="">Select a location</option>
                      {countries?.data.map((country) => (
                        <option key={country.id} value={country.id}>
                          {country.name_en}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="w-full">
                    <Label>
                      Emirate
                      <span className="text-error-500">*</span>
                    </Label>
                    <select
                      name="country_state_id"
                      onChange={handleStateChange}
                      value={values.country_state_id}
                      className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    >
                      <option value="">
                        {selectedCountry
                          ? "Select a Emirate"
                          : "No Location selected"}
                      </option>
                      {countryStates.map((state) => (
                        <option key={state.id} value={state.id}>
                          {state.name_en}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
