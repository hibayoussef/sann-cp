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
import { useFetchContacts } from "@/hooks/sales/contacts";
import { ContactType } from "@/types/enums/contactType";
import { Home, MoreVertical, Plus, User } from "lucide-react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import CustomerDetails from "./customerDetails";

export default function CustomersLayout() {
  const { data } = useFetchContacts(ContactType.CUSTOMER);
  const customers = data || [];
  const navigate = useNavigate();
  const { id } = useParams();
  const [selectedCustomerId, setSelectedCustomerId] = useState<number | null>(
    +id! || null
  );
  const handleExportCSV = () => {
    console.log("Exporting to CSV...");
  };

  const handleExportExcel = () => {
    console.log("Exporting to Excel...");
  };

  return (
    <div className="bg-gray-50 min-h-screen">
        <PageBreadcrumb
          baseTitle="Dashboard"
          pageTitle="Customers"
          icon={<Home className="w-5 h-5" />}
        />
        <div className="mt-1 bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="flex flex-col md:flex-row h-[calc(100vh-120px)]">

            {/* Sidebar */}
            <div className="hidden md:flex w-60 border-r border-gray-100 flex-col">

              <div className="p-4 border-b border-gray-100 bg-gray-50 flex justify-between items-center">
                <h3 className="font-medium text-gray-800 text-[15px]">Customers</h3>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    className="h-8 bg-[#465FFF] hover:bg-[#465FFF]/90 text-white"
                    onClick={() => navigate("/customers/create")}
                  >
                    <Plus className="h-4 w-4 mr-1" />
                    New
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
                    <DropdownMenuContent className="w-[200px]">
                      <DropdownMenuLabel>Export Options</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={handleExportCSV}>
                        Export as CSV
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={handleExportExcel}>
                        Export as Excel
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto">
                {customers?.map((customer: any) => (
                  <div 
                    key={customer.id}
                    onClick={() => {
                      setSelectedCustomerId(customer.id);
                      navigate(`/customers/${customer.id}`);
                    }}
                    className={`p-3 border-b border-gray-100 cursor-pointer transition-colors ${
                      selectedCustomerId === customer.id 
                        ? 'bg-blue-50 border-l-4 border-l-blue-500' 
                        : 'hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        customer.contact_type === 'business' 
                          ? 'bg-purple-100 text-purple-600' 
                          : 'bg-blue-100 text-blue-600'
                      }`}>
                        <User className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900 text-[14px]">
                          {customer.full_name_en || customer.organization_name_en}
                        </h4>
                        <p className="text-xs text-gray-500 mt-1">
                          {customer.contact_type === 'business' ? 'Business' : 'Individual'} • {customer.balance} AED
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 overflow-auto px-4 py-6">

              {selectedCustomerId ? (
                <CustomerDetails customerId={selectedCustomerId} />
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-center p-8">
                  <div className="bg-gray-100 p-6 rounded-full mb-4">
                    <User className="w-10 h-10 text-gray-400" />
                  </div>
                  <h3 className="text-xl font-medium text-gray-900">No customer selected</h3>
                  <p className="text-gray-500 mt-2 max-w-md">
                    Select a customer from the list to view detailed information
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
    </div>
  );
}