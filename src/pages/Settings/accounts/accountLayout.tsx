import ComponentCardDetails from "@/components/common/ComponentCardDetails";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useFetchAccounts } from "@/hooks/settings/useAccounts";
import { Home, MoreVertical, Plus } from "lucide-react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import AccountDetails from "./accountDetails";

export default function AccountLayout() {
  const { data } = useFetchAccounts();
  const accounts: any = data || [];
  const navigate = useNavigate();
  const { id } = useParams();
  const [selectedAccountId, setSelectedAccountId] = useState<number | null>(
    +id! || null
  );

  // Export handlers
  const handleExportCSV = () => {
    console.log("Exporting to CSV...");
    // Add CSV export logic here
  };

  const handleExportExcel = () => {
    console.log("Exporting to Excel...");
    // Add Excel export logic here
  };

  return (
    <>
      <PageBreadcrumb
        baseTitle="Dashboard"
        pageTitle="Chart of accounts"
        icon={<Home className="w-5 h-5" />}
      />
      <ComponentCardDetails title="Accounts Management" className="h-full">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 h-[calc(100vh-120px)]">
          <div className="hidden md:flex md:col-span-1 overflow-y-auto border-r border-gray-100 flex-col">
            <div className="flex justify-between items-center py-3 border-b border-gray-100">
              <h3 className="text-sm px-4 font-semibold">All</h3>
              <div className="flex items-center  gap-2">
                <Button
                  variant="outline"
                  className="h-8 px-2 bg-[#465FFF] text-white hover:bg-[#465FFF]/90"
                  onClick={() => navigate("/accounts/create")}
                >
                  <Plus className="h-4 w-4 mr-1" />
                  <span className="text-xs">New</span>
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className="h-8 w-8 p-0 hover:bg-gray-100"
                    >
                      <MoreVertical className="h-4 w-4 text-gray-600" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="end"
                    className="w-[200px] bg-white shadow-md border border-gray-200"
                  >
                    <DropdownMenuLabel>Export Options</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleExportCSV}>
                      Export by CSV
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleExportExcel}>
                      Export by Excel
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            <div className="md:col-span-4 py-5 px-4 overflow-y-auto">
              {accounts?.map((account: any) => (
                <div key={account.id} className="relative">
                  <div
                    onClick={() => {
                      setSelectedAccountId(account.id);
                      navigate(`/accounts/${account.id}`);
                    }}
                    className={`px-7 py-2 cursor-pointer text-[13px] transition-colors
                        ${
                          selectedAccountId === account.id
                            ? "bg-blue-100 text-blue-600 font-medium"
                            : "hover:bg-gray-50"
                        }`}
                  >
                    {account.account_name_en}
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 h-px bg-gray-200 shadow-md" />
                </div>
              ))}
            </div>
          </div>

          <div className="col-span-1 md:col-span-4 py-5 px-4 overflow-y-auto">
            {selectedAccountId ? (
              <AccountDetails accountId={selectedAccountId} />
            ) : (
              <AccountDetails accountId={Number(selectedAccountId)} />
            )}
          </div>
        </div>
      </ComponentCardDetails>
    </>
  );
}
