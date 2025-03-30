import Input from "@/components/form/input/InputField";
import Label from "@/components/form/Label";
import { CustomerType } from "@/components/lib/validations/customer";
import { CountriesData, Currency, CurrencyResponse } from "@/types/common";
import { IBranch } from "@/types/settings/branches";
import { IPaymentTerm } from "@/types/settings/payment_term";
import { Wallet } from "lucide-react";
import { useFormContext } from "react-hook-form";
import { IoSwapHorizontal } from "react-icons/io5";

const selectStyles = `
  w-full text-sm rounded-lg border border-gray-300 shadow-sm 
  focus:border-blue-500 focus:ring-1 focus:ring-blue-500 
  transition-colors duration-200 ease-in-out p-1.5
  text-gray-500
`;

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
    formState: { errors },
  } = useFormContext<CustomerType>();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label>Nationality</Label>
          <select {...register("nationality_id")} className={selectStyles}>
            <option value="" disabled>
              Select Nationality
            </option>
            {countriesData?.data?.map((country) => (
              <option key={country.id} value={country.id}>
                {country.nationality_en}{" "}
              </option>
            ))}
          </select>
          {errors.nationality_id && (
            <p className="text-red-500 text-sm">
              {errors.nationality_id.message}
            </p>
          )}
        </div>
        <div className="space-y-2">
          <Label>Branch</Label>
          <select {...register("branch_id")} className={selectStyles}>
            <option value="" disabled>
              Select Branch
            </option>
            {branches?.map((branch: IBranch) => (
              <option key={branch.id} value={branch.id}>
                {branch.branch_name_en}
              </option>
            ))}
          </select>
          {errors.branch_id && (
            <p className="text-sm text-red-500">{errors.branch_id?.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label>Payment Terms</Label>
          <select {...register("payment_term_id")} className={selectStyles}>
            <option value="" disabled>
              Select Payment Term
            </option>
            {paymentsTerm?.map((term: IPaymentTerm) => (
              <option key={term.id} value={term.id}>
                {term.term_name_en}
              </option>
            ))}
          </select>
          {errors.payment_term_id && (
            <p className="text-sm text-red-500">
              {errors.payment_term_id.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label>Currency</Label>
          <select {...register("currency_id")} className={selectStyles}>
            <option value="" disabled>
              Select Currency
            </option>
            {currencies?.data.map((currency: Currency) => (
              <option key={currency.id} value={currency.id}>
                {currency.currency_name} ({currency.currency_symbol})
              </option>
            ))}
          </select>
          {errors.currency_id && (
            <p className="text-red-500 text-sm">{errors.currency_id.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <div className="space-y-2">
            <Label>Exchange Rate</Label>
            <Input
              type="number"
              {...register("exchange_rate")}
              error={!!errors.exchange_rate}
              hint={errors.exchange_rate?.message}
              placeholder="1.00"
              icon={<IoSwapHorizontal className="w-4 h-4" />}
            />
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label>Portal Access</Label>
          <select {...register("portal_access")} className={selectStyles}>
            <option value="" disabled>
              Select Access
            </option>
            <option value="1">Enabled</option>
            <option value="0">Disabled</option>
          </select>
        </div>

        <div className="space-y-2">
          <Label>Portal Language</Label>
          <select {...register("portal_language")} className={selectStyles}>
            <option value="" disabled>
              Select Language
            </option>
            <option value="en">English</option>
            <option value="ar">Arabic</option>
          </select>
        </div>

        <div className="space-y-2">
          <Label>Balance</Label>
          <Input
            type="number"
            step={0.01}
            {...register("balance")}
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
