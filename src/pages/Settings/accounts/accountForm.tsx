import TextArea from "@/components/form/input/TextArea";
import {
  accountSchema,
  AccountType,
} from "@/components/lib/validations/account";
import Loader from "@/components/ui/loader/loader";
import { CustomSelect } from "@/components/ui/select/customSelect";
import {
  useAddAccount,
  useFetchAccount,
  useFetchAccounts,
  useFetchAccountTypes,
  useUpdateAccount,
} from "@/hooks/settings/useAccounts";
import { useFetchBranches } from "@/hooks/settings/useBranches";
import { useFetchCurrencies } from "@/hooks/useCommon";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Banknote,
  BookOpen,
  Codesandbox,
  CreditCard,
  GitBranch,
  Hash,
  Tag,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { IoAdd } from "react-icons/io5";
import { useParams } from "react-router-dom";
import ComponentCard from "../../../components/common/ComponentCard";
import PageBreadcrumb from "../../../components/common/PageBreadCrumb";
import Input from "../../../components/form/input/InputField";
import Label from "../../../components/form/Label";
import { useMeStore } from "../../../store/useMeStore";
import { FileType } from "@/types/enums/attatchementType";
import DropzoneComponent from "@/components/form/form-elements/DropZone";

interface OptionType {
  value: string;
  label: string;
  prefix_code?: string;
  isParent?: boolean;
  children?: OptionType[];
}

export default function AccountForm() {
  const { id } = useParams();
  const isUpdate = Boolean(id);
  const addAccount = useAddAccount();
  const updateAccount = useUpdateAccount();
  const organizationId = useMeStore((state) => state.organizationId);

  // States
  const [selectedAccountType, setSelectedAccountType] = useState<string>("");
  const [isSubAccount, setIsSubAccount] = useState(false);
  const [isWatchlist, setIsWatchlist] = useState(false);

  // Form setup
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<AccountType>({
    resolver: zodResolver(accountSchema),
    defaultValues: {
      account_name_en: "",
      account_name_ar: "",
      account_code: "",
      account_type_id: 0,
      description_en: "",
      description_ar: "",
      account_number: "",
      currency_id: null,
      branches: [],
      balance: 0,
      parent_account_id: undefined,
    },
  });
  // Data fetching
  const { data: accountData, isLoading }: any = useFetchAccount(Number(id), {
    enabled: isUpdate,
  });
  const { data: accountTypes } = useFetchAccountTypes();
  const { data: branches } = useFetchBranches();
  const remainingBranches = branches?.filter(
    (branch) => !watch("branches")?.includes(branch.id)
  );
  const canAddBranch = remainingBranches && remainingBranches?.length > 0;
  const { data: currencies } = useFetchCurrencies();
  const { data: accounts } = useFetchAccounts();

  // Derived values
  const isBankAccount = selectedAccountType === "Bank";
  const isCreditCard = selectedAccountType === "Credit Card";
  useEffect(() => {
    if (accountData) {
      const fields: (keyof AccountType)[] = [
        "account_name_en",
        "account_name_ar",
        "account_code",
        "account_type_id",
        "description_en",
        "description_ar",
        "account_number",
        "currency_id",
        "balance",
        "parent_account_id",
      ];

      fields.forEach((field) => {
        setValue(field, accountData[field] ?? (field === "balance" ? 0 : ""));
      });

      if (accountData.branches) {
        setValue(
          "branches",
          accountData.branches.map((branch: any) => branch.id)
        );
      }

      setIsSubAccount(!!accountData.parent_account_id);
      setIsWatchlist(accountData.is_watchlist ?? false);

      if (accountData.account_type_id && accountTypes) {
        const typeName = findAccountTypeName(
          accountData.account_type_id,
          accountTypes
        );
        if (typeName) setSelectedAccountType(typeName);
      }
    }
  }, [accountData, accountTypes, setValue]);

  // Helper functions
  const findAccountTypeName = (
    typeId: number,
    typesData: any
  ): string | null => {
    for (const category of Object.values(typesData)) {
      const item = (category as any).items.find(
        (item: any) => item.id === typeId
      );
      if (item) return item.type_en;
    }
    return null;
  };

  const formatOptions = {
    accountTypes: (data: any): OptionType[] => {
      if (!data) return [];
      return Object.entries(data).map(([key, category]: [string, any]) => ({
        value: key,
        label: category.primary_type_en,
        isParent: true,
        children: category.items.map((item: any) => ({
          value: item.id.toString(),
          label: item.type_en,
          // prefix_code: item.prefix_code.toString(),
          isParent: false,
        })),
      }));
    },
    branches: (data: any): OptionType[] => {
      if (!data) return [];
      return data.map((branch: any) => ({
        value: branch.id.toString(),
        label: branch.branch_name_en,
      }));
    },
    currencies: (data: any): OptionType[] => {
      if (!data) return [];
      return data.map((currency: any) => ({
        value: currency.id.toString(),
        label: `${currency.currency_name} (${currency.currency_symbol})`,
      }));
    },
    accounts: (data: any): OptionType[] => {
      if (!data) return [];
      return data.map((account: any) => ({
        value: account.id.toString(),
        label: `${account.account_code} - ${account.account_name_en}`,
      }));
    },
  };

  // Handlers
  const handleAccountTypeChange = (value: string) => {
    const typeId = Number(value);
    if (!isNaN(typeId)) {
      setValue("account_type_id", typeId);
      const typeName = findAccountTypeName(typeId, accountTypes);
      if (typeName) setSelectedAccountType(typeName);
    }
  };
  const handleAddBranch = () => {
    setValue("branches", [...(watch("branches") || []), 0]);
  };
  const handleRemoveBranch = (index: number) => {
    const updatedBranches = [...(watch("branches") || [])];
    updatedBranches.splice(index, 1);
    setValue("branches", updatedBranches);
  };

  const handleBranchChange = (value: string, index: number) => {
    const branchId = Number(value);
    if (!isNaN(branchId)) {
      const updatedBranches = [...(watch("branches") || [])];
      updatedBranches[index] = branchId;
      setValue("branches", updatedBranches);
    }
  };

  // Form submission
  const onSubmit = async (formData: AccountType) => {
    const payload: any = {
      organization_id: organizationId,
      ...formData,
      is_watchlist: isWatchlist,
      ...(isSubAccount && { parent_account_id: watch("parent_account_id") }),
    };

    try {
      if (isUpdate && id) {
        await updateAccount.mutateAsync({
          id: Number(id),
          data: { ...payload, _method: "PUT" },
        });
      } else {
        await addAccount.mutateAsync(payload);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  if (isUpdate && isLoading) {
    return <Loader />;
  }

  return (
    <>
      <PageBreadcrumb
        baseLink="/accounts"
        baseTitle="Accounts"
        pageTitle={isUpdate ? "Update Account" : "Create Account"}
        icon={
          <div className="w-6 h-6 flex items-center justify-center bg-gray-200 rounded-full">
            <IoAdd className="w-5 h-5" />
          </div>
        }
      />
      <div className="mb-3">
        <DropzoneComponent
          id={accountData?.id}
          initialImage={
            accountData?.attachments?.file_path
              ? accountData?.attachments?.file_path
              : ""
          }
          type={FileType.ACCOUNT}
          onUpload={(fileData) => {
            console.log("Uploaded file data:", fileData);
          }}
        />
      </div>
      <ComponentCard title={isUpdate ? "Update Account" : "Create Account"}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-8">
            {/* Basic Account Information */}
            <div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <Label htmlFor="account_type_id" className="mb-2 block">
                    Account Type
                  </Label>
                  <CustomSelect
                    name="account_type_id"
                    options={formatOptions.accountTypes(accountTypes)}
                    placeholder="Select Account Type"
                    error={errors.account_type_id?.message}
                    onChange={handleAccountTypeChange}
                    isRequired={true}
                    icon={<Codesandbox className="w-4 h-4 text-gray-500" />}
                    value={watch("account_type_id")?.toString()}
                  />
                </div>

                <div>
                  <Label htmlFor="account_code" className="mb-2 block">
                    Account Code
                  </Label>
                  <Input
                    type="text"
                    id="account_code"
                    placeholder="Enter account code"
                    {...register("account_code")}
                    error={!!errors.account_code}
                    hint={errors.account_code?.message}
                    icon={<Hash className="w-4 h-4 text-gray-500" />}
                  />
                </div>

                <div>
                  <Label htmlFor="balance" className="mb-2 block">
                    Initial Balance
                  </Label>
                  <Input
                    type="number"
                    id="balance"
                    placeholder="Enter initial balance"
                    {...register("balance", {
                      valueAsNumber: true,
                      setValueAs: (v) => (v === "" ? 0 : Number(v)),
                    })}
                    error={!!errors.balance}
                    hint={errors.balance?.message}
                    icon={<Banknote className="w-4 h-4 text-gray-500" />}
                    value={watch("balance")?.toString() || "0"}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <div>
                  <Label htmlFor="account_name_ar" className="mb-2 block">
                    Account Name (Arabic)
                  </Label>
                  <Input
                    type="text"
                    id="account_name_ar"
                    placeholder="Enter account name in Arabic"
                    {...register("account_name_ar")}
                    error={!!errors.account_name_ar}
                    hint={errors.account_name_ar?.message}
                    icon={<Tag className="w-4 h-4 text-gray-500" />}
                  />
                </div>

                <div>
                  <Label htmlFor="account_name_en" className="mb-2 block">
                    Account Name (English)
                  </Label>
                  <Input
                    type="text"
                    id="account_name_en"
                    placeholder="Enter account name in English"
                    {...register("account_name_en")}
                    error={!!errors.account_name_en}
                    hint={errors.account_name_en?.message}
                    icon={<Tag className="w-4 h-4 text-gray-500" />}
                  />
                </div>

                <div>
                  <Label htmlFor="description_en" className="mb-2 block">
                    Description (English)
                  </Label>
                  <TextArea
                    rows={3}
                    {...register("description_en")}
                    placeholder="Enter description in English"
                    error={!!errors.description_en}
                    hint={errors.description_en?.message}
                  />
                </div>

                <div>
                  <Label htmlFor="description_ar" className="mb-2 block">
                    Description (Arabic)
                  </Label>
                  <TextArea
                    rows={3}
                    {...register("description_ar")}
                    placeholder="Enter description in Arabic"
                    error={!!errors.description_ar}
                    hint={errors.description_ar?.message}
                  />
                </div>
              </div>
            </div>

            {/* Bank/Credit Card Specific Fields */}
            {(isBankAccount || isCreditCard) && (
              <div className="flex flex-col md:flex-row gap-4">
                <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 flex-1">
                  <div className="flex items-center gap-3 mb-6">
                    {isBankAccount ? (
                      <Banknote className="w-5 h-5 text-blue-500" />
                    ) : (
                      <CreditCard className="w-5 h-5 text-blue-500" />
                    )}
                    <h3 className="text-sm font-medium text-gray-800">
                      {isBankAccount ? "Bank Account" : "Credit Card"} Details
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="account_number" className="mb-2 block">
                        {isBankAccount ? "Account Number" : "Card Number"}
                      </Label>
                      <Input
                        type="text"
                        id="account_number"
                        placeholder={`Enter ${
                          isBankAccount ? "account" : "card"
                        } number`}
                        {...register("account_number")}
                        error={!!errors.account_number}
                        hint={errors.account_number?.message}
                        icon={<Hash className="w-4 h-4 text-gray-500" />}
                      />
                    </div>

                    <div>
                      <Label htmlFor="currency_id" className="mb-2 block">
                        Currency
                      </Label>
                      <CustomSelect
                        name="currency_id"
                        options={formatOptions.currencies(currencies?.data)}
                        placeholder="Select Currency"
                        error={errors.currency_id?.message}
                        onChange={(value) => {
                          const currencyId = Number(value);
                          if (!isNaN(currencyId)) {
                            setValue("currency_id", currencyId);
                          }
                        }}
                        icon={<Hash className="w-4 h-4 text-gray-500" />}
                        value={watch("currency_id")?.toString()}
                      />
                    </div>
                    {isBankAccount && (
                      <div className="md:col-span-2">
                        <Label className="mb-2 block">Branches</Label>
                        <div className="space-y-3">
                          {(watch("branches") || []).map((branchId, index) => {
                            return (
                              <div
                                key={index}
                                className="flex items-center gap-3"
                              >
                                <div className="flex-1">
                                  <CustomSelect
                                    name={`branches.${index}`}
                                    options={formatOptions.branches(branches)}
                                    placeholder="Select Branch"
                                    error={errors.branches?.[index]?.message}
                                    onChange={(value) =>
                                      handleBranchChange(value, index)
                                    }
                                    icon={
                                      <GitBranch className="w-4 h-4 text-gray-500" />
                                    }
                                    value={branchId?.toString()}
                                  />
                                </div>
                                <button
                                  type="button"
                                  onClick={() => handleRemoveBranch(index)}
                                  className="p-2 text-red-500 hover:text-red-600 rounded-full hover:bg-red-50"
                                >
                                  <X className="w-4 h-4" />
                                </button>
                              </div>
                            );
                          })}

                          <div className="relative inline-block group">
                            <button
                              type="button"
                              onClick={handleAddBranch}
                              disabled={!canAddBranch}
                              className={`text-blue-600 hover:text-blue-700 flex items-center gap-2 text-sm font-medium mt-2 ${
                                !canAddBranch
                                  ? "opacity-50 cursor-not-allowed"
                                  : ""
                              }`}
                            >
                              <IoAdd className="w-4 h-4" />
                              Add Branch
                            </button>

                            {!canAddBranch && (
                              <div className="absolute hidden group-hover:block bg-gray-800 text-white text-xs rounded py-1 px-2 bottom-full mb-2 whitespace-nowrap">
                                No other branches available to select
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 flex-1">
                  <div className="flex items-center gap-3 mb-6">
                    <GitBranch className="w-5 h-5 text-blue-500" />
                    <h3 className="text-sm font-medium text-gray-800">
                      Additional Options
                    </h3>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between gap-6 p-3 bg-white rounded-lg border border-gray-200">
                      <div className="flex-1">
                        <Label
                          htmlFor="isSubAccount"
                          className="block font-medium text-gray-700"
                        >
                          Sub Account
                        </Label>
                        <p className="text-sm text-gray-500">
                          Link to a parent account
                        </p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          id="isSubAccount"
                          checked={isSubAccount}
                          onChange={(e) => setIsSubAccount(e.target.checked)}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>

                    {isSubAccount && (
                      <div className="flex items-center gap-1 p-3 bg-white rounded-lg border border-gray-200">
                        <Label
                          htmlFor="parent_account_id"
                          className="min-w-[100px] font-medium text-gray-700 text-sm"
                        >
                          Parent Account
                        </Label>
                        <div className="flex-1">
                          <CustomSelect
                            name="parent_account_id"
                            options={formatOptions.accounts(accounts)}
                            placeholder="Select Parent Account"
                            error={errors.parent_account_id?.message}
                            onChange={(value) => {
                              const parentId = Number(value);
                              if (!isNaN(parentId)) {
                                setValue("parent_account_id", parentId);
                              }
                            }}
                            icon={
                              <BookOpen className="w-4 h-4 text-gray-500" />
                            }
                            value={watch("parent_account_id")?.toString()}
                          />
                        </div>
                      </div>
                    )}

                    <div className="flex items-center justify-between gap-6 p-3 bg-white rounded-lg border border-gray-200">
                      <div className="flex-1">
                        <Label
                          htmlFor="isWatchlist"
                          className="block font-medium text-gray-700"
                        >
                          Add to Watchlist
                        </Label>
                        <p className="text-sm text-gray-500">
                          Show on dashboard
                        </p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          id="isWatchlist"
                          checked={isWatchlist}
                          onChange={(e) => setIsWatchlist(e.target.checked)}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Additional Options for non-bank/credit card */}
            {!isBankAccount && !isCreditCard && (
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                <div className="flex items-center gap-3 mb-6">
                  <GitBranch className="w-5 h-5 text-blue-500" />
                  <h3 className="text-md font-medium text-gray-800">
                    Additional Options
                  </h3>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between gap-6 p-3 bg-white rounded-lg border border-gray-200">
                    <div className="flex-1">
                      <Label
                        htmlFor="isSubAccount"
                        className="block font-medium text-gray-700"
                      >
                        Sub Account
                      </Label>
                      <p className="text-sm text-gray-500">
                        Link to a parent account
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        id="isSubAccount"
                        checked={isSubAccount}
                        onChange={(e) => setIsSubAccount(e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>

                  {isSubAccount && (
                    <div className="flex items-center gap-6 p-3 bg-white rounded-lg border border-gray-200">
                      <Label
                        htmlFor="parent_account_id"
                        className="min-w-[150px] block font-medium text-gray-700"
                      >
                        Parent Account
                      </Label>
                      <div className="flex-1">
                        <CustomSelect
                          name="parent_account_id"
                          options={formatOptions.accounts(accounts)}
                          placeholder="Select Parent Account"
                          error={errors.parent_account_id?.message}
                          onChange={(value) => {
                            const parentId = Number(value);
                            if (!isNaN(parentId)) {
                              setValue("parent_account_id", parentId);
                            }
                          }}
                          icon={<BookOpen className="w-4 h-4 text-gray-500" />}
                          value={watch("parent_account_id")?.toString()}
                        />
                      </div>
                    </div>
                  )}

                  <div className="flex items-center justify-between gap-6 p-3 bg-white rounded-lg border border-gray-200">
                    <div className="flex-1">
                      <Label
                        htmlFor="isWatchlist"
                        className="block font-medium text-gray-700"
                      >
                        Add to Watchlist
                      </Label>
                      <p className="text-sm text-gray-500">Show on dashboard</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        id="isWatchlist"
                        checked={isWatchlist}
                        onChange={(e) => setIsWatchlist(e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="flex justify-end mt-8">
            <button
              type="submit"
              className="px-8 py-3 text-sm font-medium disabled:opacity-50 text-white transition rounded-lg shadow-sm bg-blue-600 hover:bg-blue-700 flex items-center gap-2"
              disabled={
                isSubmitting || addAccount.isPending || updateAccount.isPending
              }
            >
              {(addAccount.isPending || updateAccount.isPending) && (
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              )}
              {isUpdate ? "Update Account" : "Create Account"}
            </button>
          </div>
        </form>
      </ComponentCard>
    </>
  );
}
