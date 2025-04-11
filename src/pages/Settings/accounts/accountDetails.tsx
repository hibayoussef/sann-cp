import { recentTransactionsColumns } from "@/columns/settings/recentTransactions";
import DropzoneComponent from "@/components/form/form-elements/DropZone";
import { Badge } from "@/components/ui/badge";
import { DataTable } from "@/components/ui/table-data/table-data";
import { useFetchAccount } from "@/hooks/settings/useAccounts";
import { usePermissions } from "@/hooks/usePermissions";
import { FileType } from "@/types/enums/attatchementType";
import {
  Banknote,
  BookOpen,
  Building2,
  ChevronDown,
  ChevronUp,
  CircleDollarSign,
  Codesandbox,
  CreditCard,
  Hash,
  Paperclip,
  Tag
} from "lucide-react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import PageMeta from "../../../components/common/PageMeta";

interface AccountDetailsProps {
  accountId: number;
}

export default function AccountDetails({ accountId }: AccountDetailsProps) {
  const { data: accountData } = useFetchAccount(accountId);
  const navigate = useNavigate();
  const { hasPermission } = usePermissions();
  const { id } = useParams();
  const [showAdditionalDetails, setShowAdditionalDetails] = useState(false);
  const [showAttachments, setShowAttachments] = useState(false);

  const renderDetailItem = (
    icon: React.ReactNode,
    label: string,
    value: string | number | null | undefined,
    isBadge?: boolean
  ) => {
    if (value === null || value === undefined) return null;

    return (
      <div className="flex items-start gap-4 py-3">
        <div className="p-2 rounded-full bg-gray-100 text-gray-600">{icon}</div>
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-500">{label}</p>
          {isBadge ? (
            <Badge variant="outline" className="mt-1">
              {value}
            </Badge>
          ) : (
            <p className="text-sm font-medium text-gray-900 dark:text-white">
              {value}
            </p>
          )}
        </div>
      </div>
    );
  };

  return (
    <>
      <PageMeta
        title="Accounts Management | Dashboard"
        description="Manage your account Accounts in the system."
      />
      <div className="space-y-6">
        {/* Header Section */}
        <div className="flex items-center justify-between gap-4">
          <div>
            <h4 className="text-xl font-bold text-gray-950 dark:text-white/90">
              {accountData?.account_name_en}
            </h4>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowAttachments(!showAttachments)}
              className="flex items-center gap-1 rounded-full border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200"
            >
              <Paperclip className="w-4 h-4" />
              <span>Attachments</span>
            </button>
            <button
              onClick={() => navigate(`/accounts/update/${id}`)}
              className="flex items-center gap-2 rounded-full border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200"
            >
              Edit
            </button>
          </div>
        </div>

        {/* Attachments Dropzone */}
        {showAttachments && (
          <DropzoneComponent
            id={accountData?.id || 0}
            initialImage={
              // accountData?.attachments?.file_path
              //   ? accountData.attachments.file_path
              // :
              ""
            }
            type={FileType.ACCOUNT}
            onUpload={(fileData) => {
              console.log("Uploaded file data:", fileData);
            }}
          />
        )}

        {/* Status and Basic Info */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 bg-blue-50 px-3 py-1.5 rounded-full">
            <span
              className={`w-2 h-2 rounded-full ${
                accountData?.is_active ? "bg-green-500" : "bg-red-500"
              }`}
            ></span>
            <span className="text-sm font-medium text-gray-700">
              {accountData?.is_active ? "Active" : "Inactive"}
            </span>
          </div>

          <div className="flex items-center gap-2 bg-purple-50 px-3 py-1.5 rounded-full">
            <CircleDollarSign className="w-4 h-4 text-purple-600" />
            <span className="text-sm font-medium text-gray-700">
              Balance: {accountData?.balance || "0.00"}
            </span>
          </div>

          {accountData?.organization_name_en && (
            <div className="flex items-center gap-2 bg-amber-50 px-3 py-1.5 rounded-full">
              <Building2 className="w-4 h-4 text-amber-600" />
              <span className="text-sm font-medium text-gray-700">
                {accountData?.organization_name_en}
              </span>
            </div>
          )}
        </div>

        <div className="w-full h-px bg-gray-200 dark:bg-gray-600 my-4"></div>

        {/* Description Section */}
        {accountData?.description_en && (
          <div className="bg-gray-50 p-4 rounded-lg">
            <h5 className="text-sm font-semibold text-gray-700 mb-2">
              Description (English)
            </h5>
            <p className="text-sm text-gray-600">
              {accountData?.description_en}
            </p>
          </div>
        )}

        {/* Recent Transactions */}
        <div className="mt-6">
          <h4 className="mb-4 text-md font-semibold text-gray-800 dark:text-white/90">
            Recent Transactions
          </h4>

          <DataTable
            tableName="Chart of account"
            columns={recentTransactionsColumns({
              update: hasPermission("update", "sub_categories"),
              delete: hasPermission("delete", "sub_categories"),
            })}
            data={[]}
            createPath=""
            permissions={{
              create: hasPermission("create", "sub_categories"),
              update: hasPermission("update", "sub_categories"),
              delete: hasPermission("delete", "sub_categories"),
            }}
          />

          {/* Show More Details Section */}
          <div className="mt-6">
            <button
              onClick={() => setShowAdditionalDetails(!showAdditionalDetails)}
              className="flex items-center text-blue-600 hover:text-blue-800 text-sm font-medium"
            >
              {showAdditionalDetails ? (
                <>
                  <ChevronUp className="w-4 h-4 mr-1" />
                  Hide additional details
                </>
              ) : (
                <>
                  <ChevronDown className="w-4 h-4 mr-1" />
                  Show more details
                </>
              )}
            </button>
            {showAdditionalDetails && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                {/* Account Details Card */}
                <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-xs dark:bg-gray-800 dark:border-gray-700">
                  <h5 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3 flex items-center gap-2">
                    <Codesandbox className="w-4 h-4 text-blue-500" />
                    Account Details
                  </h5>
                  <div className="space-y-3">
                    {renderDetailItem(
                      <Codesandbox className="w-4 h-4 text-gray-400" />,
                      "Account Type",
                      accountData?.account_type_en,
                      true
                    )}
                    {renderDetailItem(
                      <Hash className="w-4 h-4 text-gray-400" />,
                      "Account Code",
                      accountData?.account_code
                    )}
                    {renderDetailItem(
                      <Tag className="w-4 h-4 text-gray-400" />,
                      "Primary Type",
                      accountData?.account_primary_type_en,
                      true
                    )}
                    {accountData?.account_number &&
                      renderDetailItem(
                        accountData?.account_type_en?.includes("Bank") ? (
                          <Banknote className="w-4 h-4 text-gray-400" />
                        ) : (
                          <CreditCard className="w-4 h-4 text-gray-400" />
                        ),
                        "Account Number",
                        accountData?.account_number
                      )}
                  </div>
                </div>

                {/* Additional Information Card */}
                <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-xs dark:bg-gray-800 dark:border-gray-700">
                  <h5 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3 flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-blue-500" />
                    Additional Information
                  </h5>
                  <div className="space-y-3">
                    {accountData?.currency_name &&
                      renderDetailItem(
                        <BookOpen className="w-4 h-4 text-gray-400" />,
                        "Currency",
                        `${accountData?.currency_name} (${accountData?.currency_code}, ${accountData?.currency_symbol})`
                      )}
                    {renderDetailItem(
                      <BookOpen className="w-4 h-4 text-gray-400" />,
                      "Organization",
                      accountData?.account_name_en
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
