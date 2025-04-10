import Input from "@/components/form/input/InputField";
import Label from "@/components/form/Label";
import { CustomerType } from "@/components/lib/validations/customer";
import { CustomSelect } from "@/components/ui/select/customSelect";
import { CountriesData } from "@/types/common";
import {
  FileText,
  Flag,
  Globe,
  Home,
  Landmark,
  MapPin,
  Package,
  Phone,
  Truck,
  Wallet
} from "lucide-react";
import { useEffect, useState } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import { FaXRay } from "react-icons/fa";

export const AddressTab = ({
  countriesData,
}: {
  countriesData: CountriesData | undefined;
}) => {
  const {
    register,
    formState: { errors },
    control,
    setValue,
    trigger,
  } = useFormContext<CustomerType>();

  const billingCountryId = useWatch({
    control,
    name: "contact_details.billing_address_country_id",
  });

  const shippingCountryId = useWatch({
    control,
    name: "contact_details.shipping_address_country_id",
  });

  const [billingStateOptions, setBillingStateOptions] = useState<
    Array<{ value: string; label: string }>
  >([]);

  const [shippingStateOptions, setShippingStateOptions] = useState<
    Array<{ value: string; label: string }>
  >([]);

  const [countryOptions, setCountryOptions] = useState<
    Array<{ value: string; label: string }>
  >([]);

  useEffect(() => {
    if (countriesData?.data) {
      setCountryOptions(
        countriesData.data.map((country) => ({
          value: country.id.toString(),
          label: country.name_en,
        }))
      );
    }
  }, [countriesData]);

  useEffect(() => {
    if (billingCountryId && countriesData?.data) {
      const selectedCountry = countriesData.data.find(
        (c) => c.id.toString() === billingCountryId
      );
      if (selectedCountry) {
        setBillingStateOptions(
          selectedCountry.country_states.map((state) => ({
            value: state.id.toString(),
            label: state.name_en,
          }))
        );
      } else {
        setBillingStateOptions([]);
      }
    }
  }, [billingCountryId, countriesData]);

  useEffect(() => {
    if (shippingCountryId && countriesData?.data) {
      const selectedCountry = countriesData.data.find(
        (c) => c.id.toString() === shippingCountryId
      );
      if (selectedCountry) {
        setShippingStateOptions(
          selectedCountry.country_states.map((state) => ({
            value: state.id.toString(),
            label: state.name_en,
          }))
        );
      } else {
        setShippingStateOptions([]);
      }
    }
  }, [shippingCountryId, countriesData]);

  const handleSelectChange = async (name: string, value: any) => {
    setValue(name as any, value, { shouldValidate: true });
    await trigger(name as any);
  };
  console.log('eeeee:', errors)

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 dark:bg-gray-900">
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
          <CustomSelect
            name="contact_details.billing_address_country_id"
            options={countryOptions}
            placeholder="Select Country"
            error={errors.contact_details?.billing_address_country_id?.message}
            onChange={(value) => handleSelectChange("contact_details.billing_address_country_id", value)}
            icon={<Globe className="w-4 h-4" />}
          />
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
              icon={<Home className="w-4 h-4" />}
              placeholder="Please Enter Your City"
            />
          </div>

          <div className="space-y-2">
            <Label>State</Label>
            <CustomSelect
              name="contact_details.billing_address_country_state_id"
              options={billingStateOptions}
              placeholder="Select State"
              error={errors.contact_details?.billing_address_country_state_id?.message}
              onChange={(value) => handleSelectChange("contact_details.billing_address_country_state_id", value)}
              icon={<Flag className="w-4 h-4" />}
            />
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
          <Label>Shipping Address Country</Label>
          <CustomSelect
            name="contact_details.shipping_address_country_id"
            options={countryOptions}
            placeholder="Select Country"
            error={errors.contact_details?.shipping_address_country_id?.message}
            onChange={(value) => handleSelectChange("contact_details.shipping_address_country_id", value)}
            icon={<Globe className="w-4 h-4" />}
          />
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
              icon={<Home className="w-4 h-4" />}
              placeholder="Please Enter Your City"
            />
          </div>

          <div className="space-y-2">
            <Label>State</Label>
            <CustomSelect
              name="contact_details.shipping_address_country_state_id"
              options={shippingStateOptions}
              placeholder="Select State"
              error={errors.contact_details?.shipping_address_country_state_id?.message}
              onChange={(value) => handleSelectChange("contact_details.shipping_address_country_state_id", value)}
              icon={<Flag className="w-4 h-4" />}
            />
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
              hint={errors.contact_details?.shipping_address_fax_number?.message}
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