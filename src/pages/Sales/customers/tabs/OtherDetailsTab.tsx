import Input from "@/components/form/input/InputField";
import Label from "@/components/form/Label";
import {
  customerSchema,
  CustomerType,
} from "@/components/lib/validations/customer";
import { CustomSelect } from "@/components/ui/select/customSelect";
import { CountriesData, CurrencyResponse } from "@/types/common";
import { IBranch } from "@/types/settings/branches";
import { IPaymentTerm } from "@/types/settings/payment_term";
import {
  CreditCard,
  Flag,
  Languages,
  Lock,
  Wallet
} from "lucide-react";
import { useEffect, useState } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import { IoDocumentText, IoGitBranch, IoSwapHorizontal } from "react-icons/io5";

const isFieldRequired = (fieldName: keyof CustomerType): boolean => {
  const schemaShape = customerSchema.shape;
  const fieldSchema = schemaShape[fieldName];

  if (fieldSchema._def.typeName === "ZodOptional") {
    return false;
  }

  return true;
};

export const OtherDetailsTab = ({
  countriesData,
  branches,
  paymentsTerm,
  currencies,
}: {
  countriesData: CountriesData | undefined;
  branches: IBranch[] | undefined;
  paymentsTerm: IPaymentTerm[] | undefined;
  currencies: CurrencyResponse | undefined;
}) => {
   const {
    register,
    setValue,
    formState: { errors },
    control,
    trigger,
    getValues,
  } = useFormContext<CustomerType>();

  const selectedNationalityId = useWatch({
    control,
    name: "nationality_id",
  });

  const [nationalityOptions, setNationalityOptions] = useState<
    Array<{ value: string; label: string }>
  >([]);
  const [branchOptions, setBranchOptions] = useState<
    Array<{ value: string; label: string }>
  >([]);
  const [paymentTermOptions, setPaymentTermOptions] = useState<
    Array<{ value: string; label: string }>
  >([]);
  const [currencyOptions, setCurrencyOptions] = useState<
    Array<{ value: string; label: string }>
  >([]);
  const [portalAccessOptions] = useState<
    Array<{ value: "0" | "1"; label: string }>
  >([
    { value: "1", label: "Enabled" },
    { value: "0", label: "Disabled" },
  ]);
  const [portalLanguageOptions] = useState<
    Array<{ value: "en" | "ar"; label: string }>
  >([
    { value: "en", label: "English" },
    { value: "ar", label: "Arabic" },
  ]);

  const handleSelectChange = async (name: keyof CustomerType, value: any) => {
    setValue(name, value, { shouldValidate: true });
    await trigger(name);
  };


  useEffect(() => {
    if (countriesData?.data) {
      const options = countriesData.data.map((country) => ({
        value: country.id.toString(),
        label: country.nationality_en,
      }));

      setNationalityOptions(options);

      // Set UAE as default nationality if not already set
      if (!getValues("nationality_id")) {
        const uaeCountry = countriesData.data.find(
          (country) => country.nationality_en === "Emirati"
        );

        if (uaeCountry) {
          setValue("nationality_id", uaeCountry.id.toString(), {
            shouldValidate: true,
          });

          // Set default currency for UAE
          if (uaeCountry.currency) {
            setValue("currency_id", uaeCountry.currency.toString(), {
              shouldValidate: true,
            });
          }
        }
      }
    }

    if (branches) {
      const options = branches.map((branch) => ({
        value: branch.id.toString(),
        label: branch.branch_name_en,
      }));

      setBranchOptions(options);

      // Set first branch as default if not already set
      if (!getValues("branch_id") && branches.length > 0) {
        setValue("branch_id", branches[0].id.toString(), {
          shouldValidate: true,
        });
      }
    }

    if (paymentsTerm) {
      setPaymentTermOptions(
        paymentsTerm.map((term) => ({
          value: term.id.toString(),
          label: term.term_name_en,
        }))
      );
    }

    if (currencies?.data) {
      setCurrencyOptions(
        currencies.data.map((currency) => ({
          value: currency.id.toString(),
          label: `${currency.currency_name} (${currency.currency_symbol})`,
        }))
      );
    }
  }, [countriesData, branches, paymentsTerm, currencies, setValue, getValues]);

  useEffect(() => {
    if (!selectedNationalityId || !countriesData?.data) return;

    const selectedCountry = countriesData.data.find(
      (country) => country.id === parseInt(selectedNationalityId)
    );

    if (selectedCountry && selectedCountry.currency) {
      const currencyId = selectedCountry.currency.toString();
      setValue("currency_id", currencyId, { shouldValidate: true });

      // Find the currency option to display
      const currencyOption = currencyOptions.find(
        (option) => option.value === currencyId
      );

      if (currencyOption) {
        setValue("currency_id", currencyOption.value, { shouldValidate: true });
      }

      trigger("currency_id");
    }
  }, [
    selectedNationalityId,
    countriesData,
    setValue,
    trigger,
    currencyOptions,
  ]);
  console.log("eeeee:", errors);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 dark:bg-gray-900">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label>Nationality</Label>
          <CustomSelect
            name="nationality_id"
            options={nationalityOptions}
            placeholder="Select Nationality"
            searchPlaceholder="Search nationalities..."
            error={errors?.nationality_id?.message}
            onChange={(value) => handleSelectChange("nationality_id", value)}
            isRequired={isFieldRequired("nationality_id")}
            icon={<Flag className="w-4 h-4" />}
          />
        </div>

        <div className="space-y-2">
          <Label>Branch</Label>
          <CustomSelect
            name="branch_id"
            options={branchOptions}
            placeholder="Select Branch"
            searchPlaceholder="Search branches..."
            error={errors.branch_id?.message}
            onChange={(value) => handleSelectChange("branch_id", value)}
            isRequired={isFieldRequired("branch_id")}
            icon={<IoGitBranch className="w-4 h-4" />}
          />
        </div>

        <div className="space-y-2">
          <Label>Payment Terms</Label>
          <CustomSelect
            name="payment_term_id"
            options={paymentTermOptions}
            placeholder="Select Payment Term"
            searchPlaceholder="Search payment terms..."
            error={errors.payment_term_id?.message}
            onChange={(value) => handleSelectChange("payment_term_id", value)}
            isRequired={isFieldRequired("payment_term_id")}
            icon={<IoDocumentText  className="w-4 h-4" />}
          />
        </div>

        <div className="space-y-2">
          <Label>Currency</Label>
          <CustomSelect
            name="currency_id"
            options={currencyOptions}
            placeholder="Select Currency"
            searchPlaceholder="Search currencies..."
            error={errors.currency_id?.message}
            onChange={(value) => handleSelectChange("currency_id", value)}
            isRequired={isFieldRequired("currency_id")}
            icon={<CreditCard className="w-4 h-4" />}
          />
        </div>

        <div className="space-y-2">
          <Label>Exchange Rate</Label>
          <Input
            type="number"
            step={0.01}
            {...register("exchange_rate", {
              required: isFieldRequired("exchange_rate")
                ? "The exchange rate field is required."
                : false,
            })}
            error={!!errors.exchange_rate}
            hint={errors.exchange_rate?.message}
            placeholder="1.00"
            icon={<IoSwapHorizontal className="w-4 h-4" />}
          />
        </div>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label>Portal Access</Label>
          <CustomSelect<"0" | "1">
            name="portal_access"
            options={portalAccessOptions}
            placeholder="Select Access"
            error={errors.portal_access?.message}
            onChange={(value) =>
              handleSelectChange("portal_access", value as "0" | "1")
            }
            isRequired={isFieldRequired("portal_access")}
            icon={<Lock className="w-4 h-4" />}
          />
        </div>

        <div className="space-y-2">
          <Label>Portal Language</Label>
          <CustomSelect
            name="portal_language"
            options={portalLanguageOptions}
            placeholder="Select Language"
            error={errors.portal_language?.message}
            onChange={(value) => handleSelectChange("portal_language", value)}
            isRequired={isFieldRequired("portal_language")}
            icon={<Languages className="w-4 h-4" />}
          />
        </div>

        <div className="space-y-2">
          <Label>Balance</Label>
          <Input
            type="number"
            step={0.01}
            {...register("balance", {
              required: isFieldRequired("balance")
                ? "The balance field is required."
                : false,
            })}
            error={!!errors.balance}
            hint={errors.balance?.message}
            placeholder="Enter balance amount"
            icon={<Wallet className="w-4 h-4" />}
          />
        </div>
      </div>
    </div>
  );
};
