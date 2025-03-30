import Input from "@/components/form/input/InputField";
import Label from "@/components/form/Label";
import { CountriesData } from "@/types/common";
import {
  FileText,
  Landmark,
  MapPin,
  Package,
  Phone,
  Truck,
  Wallet,
} from "lucide-react";
import { FaXRay } from "react-icons/fa";

const selectStyles = `
  w-full text-sm rounded-lg border border-gray-300 shadow-sm 
  focus:border-blue-500 focus:ring-1 focus:ring-blue-500 
  transition-colors duration-200 ease-in-out p-1.5
  text-gray-500
`;

const AddressTab = ({
  register,
  errors,
  countriesData,
  watch,
}: {
  register: Function;
  errors: any;
  countriesData: CountriesData | undefined;
  watch: Function;
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="space-y-4">
        <h3 className="text-sm font-semibold text-gray-800 flex items-center gap-2">
          <Wallet className="w-4 h-4 text-gray-600" />
          Billing Address
        </h3>
        <div className="space-y-2">
          <Label>Billing Address Attention</Label>

          <Input
            {...register("contact_details.billing_address_attention")}
            error={!!errors.contact_details?.billing_address_attention}
            hint={errors.contact_details?.billing_address_attention?.message}
            icon={<FileText className="w-4 h-4" />}
            placeholder="Please enter your shipping address attention"
          />
        </div>
        <div className="space-y-2">
          <Label>Billing Address Country</Label>
          <select
            {...register("contact_details.billing_address_country_id")}
            className={selectStyles}

            // disabled={countriesLoading}
          >
            <option value="" disabled>
              Select Country
            </option>

            {countriesData?.data?.map((country) => (
              <option key={country.id} value={country.id}>
                {country.name_en}{" "}
              </option>
            ))}
          </select>
        </div>
        <div className="space-y-2">
          <Label>Street Address 1</Label>
          <Input
            {...register("contact_details.billing_address_street_1")}
            error={!!errors.contact_details?.billing_address_street_1}
            hint={errors.contact_details?.billing_address_street_1?.message}
            icon={<MapPin className="w-4 h-4" />}
            placeholder="Please Enter Your street address 1"
          />
        </div>
        <div className="space-y-2">
          <Label>Street Address 2</Label>
          <Input
            {...register("contact_details.billing_address_street_2")}
            error={!!errors.contact_details?.billing_address_street_2}
            hint={errors.contact_details?.billing_address_street_2?.message}
            icon={<MapPin className="w-4 h-4" />}
            placeholder="Please Enter Your street address 1"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>City</Label>
            <Input
              {...register("contact_details.billing_address_city")}
              error={!!errors.contact_details?.billing_address_city}
              hint={errors.contact_details?.billing_address_city?.message}
              icon={<MapPin className="w-4 h-4" />}
              placeholder="Please Enter Your City"
            />
          </div>
          <div>
            <Label>State</Label>
            <select
              {...register("contact_details.shipping_address_country_state_id")}
              className={selectStyles}

              // disabled={countriesLoading}
            >
              <option value="" disabled>
                Select State
              </option>
              {countriesData?.data
                .find(
                  (country) =>
                    country.id.toString() ==
                    watch("contact_details.billing_address_country_id")
                )
                ?.country_states.map((state) => (
                  <option key={state.id} value={state.id}>
                    {state.name_en} {/* أو nationality_ar حسب اللغة */}
                  </option>
                ))}
            </select>
          </div>
          <div className="space-y-2">
            <Label>Postal Code</Label>
            <Input
              {...register("contact_details.billing_address_zip_code")}
              error={!!errors.contact_details?.billing_address_zip_code}
              hint={errors.contact_details?.billing_address_zip_code?.message}
              icon={<Landmark className="w-4 h-4" />}
              placeholder="Please Enter Postal Code"
            />
          </div>
          <div className="space-y-2">
            <Label>Address Phone</Label>
            <Input
              {...register("contact_details.billing_address_phone")}
              error={!!errors.contact_details?.billing_address_phone}
              hint={errors.contact_details?.billing_address_phone?.message}
              icon={<Phone className="w-4 h-4" />}
              placeholder="Please Enter Address Phone"
            />
          </div>
          <div className="space-y-2">
            <Label>Fax Number</Label>
            <Input
              {...register("contact_details.billing_address_fax_number")}
              error={!!errors.contact_details?.billing_address_fax_number}
              hint={errors.contact_details?.billing_address_fax_number?.message}
              icon={<FaXRay className="w-4 h-4" />}
              placeholder="Please Enter Fax Number"
            />
          </div>
        </div>
      </div>
      <div className="space-y-4">
        <h3 className="text-sm font-semibold text-gray-800 flex items-center gap-2">
          <Truck className="w-4 h-4 text-gray-600" />
          Shipping Address
        </h3>
        <div className="space-y-2">
          <Label>Shipping Address Attention</Label>
          <Input
            {...register("contact_details.shipping_address_attention")}
            error={!!errors.contact_details?.shipping_address_attention}
            hint={errors.contact_details?.shipping_address_attention?.message}
            icon={<Package className="w-4 h-4" />}
            placeholder="Please enter your shipping address attention"
          />
        </div>
        <div className="space-y-2">
          <Label>shipping Address Country</Label>
          <select
            {...register("contact_details.shipping_address_country_id")}
            className={selectStyles}

            // disabled={countriesLoading}
          >
            <option value="" disabled>
              Select Country
            </option>

            {countriesData?.data?.map((country) => (
              <option key={country.id} value={country.id}>
                {country.name_en}{" "}
              </option>
            ))}
          </select>
        </div>
        <div className="space-y-2">
          <Label>Street Address 1</Label>
          <Input
            {...register("contact_details.shipping_address_street_1")}
            error={!!errors.contact_details?.shipping_address_street_1}
            hint={errors.contact_details?.shipping_address_street_1?.message}
            icon={<MapPin className="w-4 h-4" />}
            placeholder="Please Enter Your street address 1"
          />
        </div>
        <div className="space-y-2">
          <Label>Street Address 2</Label>
          <Input
            {...register("contact_details.shipping_address_street_2")}
            error={!!errors.contact_details?.shipping_address_street_2}
            hint={errors.contact_details?.shipping_address_street_2?.message}
            icon={<MapPin className="w-4 h-4" />}
            placeholder="Please Enter Your street address 2"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>City</Label>
            <Input
              {...register("contact_details.shipping_address_city")}
              error={!!errors.contact_details?.shipping_address_city}
              hint={errors.contact_details?.shipping_address_city?.message}
              icon={<MapPin className="w-4 h-4" />}
              placeholder="Please Enter Your City"
            />
          </div>
          <div>
            <Label>State</Label>
            <select
              {...register("contact_details.billing_address_country_state_id")}
              className={selectStyles}

              // disabled={countriesLoading}
            >
              <option value="" disabled>
                Select State
              </option>
              {countriesData?.data
                .find(
                  (country) =>
                    country.id.toString() ==
                    watch("contact_details.shipping_address_country_id")
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
              {...register("contact_details.shipping_address_zip_code")}
              error={!!errors.contact_details?.shipping_address_zip_code}
              hint={errors.contact_details?.shipping_address_zip_code?.message}
              icon={<Landmark className="w-4 h-4" />}
              placeholder="Please Enter Postal Code"
            />
          </div>
          <div className="space-y-2">
            <Label>Fax Number</Label>
            <Input
              {...register("contact_details.shipping_address_fax_number")}
              error={!!errors.contact_details?.shipping_address_fax_number}
              hint={
                errors.contact_details?.shipping_address_fax_number?.message
              }
              icon={<FaXRay className="w-4 h-4" />}
              placeholder="Please Enter Fax Number"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddressTab;
