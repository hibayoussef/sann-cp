import { subCategoryColumns } from "@/columns/products/subCategory";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DataTable } from "@/components/ui/table-data/table-data";
import { useEnablePortalAccess, useFetchContact } from "@/hooks/sales/contacts";
import { usePermissions } from "@/hooks/usePermissions";
import {
  Copy,
  Edit,
  Facebook,
  Globe,
  IdCard,
  Instagram,
  Loader2,
  Lock,
  Mail,
  MapPin,
  MoreVertical,
  Phone,
  Plus,
  Share2,
  Trash2,
  Twitter,
  User,
  UserX
} from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router";

// Improved value display utilities
const displayValue = (value: any, fallback: string = "-") => {
  if (value === undefined || value === null || value === "") {
    return <span className="text-gray-400 italic">{fallback}</span>;
  }
  return value;
};

const displayAddress = (address: {
  street1?: string;
  street2?: string;
  city?: string;
  zip?: string;
  phone?: string;
}) => {
  const parts = [
    address.street1,
    address.street2,
    address.city,
    address.zip
  ].filter(part => part);

  if (parts.length === 0) {
    return displayValue(null);
  }

  return (
    <div className="space-y-1">
      <p>{parts.join(", ")}</p>
      {address.phone && (
        <p className="text-xs text-gray-500">
          Phone: {displayValue(address.phone)}
        </p>
      )}
    </div>
  );
};

const EmptyState = ({ message = "No data available" }: { message?: string }) => (
  <div className="py-2 text-center">
    <p className="text-sm text-gray-400 italic">{message}</p>
  </div>
);

export default function CustomerDetails({ customerId }: { customerId: number }) {
  const [activeTab, setActiveTab] = useState("overview");
  const { data: customerData, refetch }: any = useFetchContact(customerId);
  const [isLoadingPortal, setIsLoadingPortal] = useState(false);
  const [showCloneDialog, setShowCloneDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showInactiveDialog, setShowInactiveDialog] = useState(false);
  const navigate = useNavigate();
  const { hasPermission } = usePermissions();

  const { mutate: enablePortal } = useEnablePortalAccess();

  const handleTogglePortal = () => {
    setIsLoadingPortal(true);
    const newPortalAccess = customerData.portal_access ? 0 : 1;
    
    enablePortal(
      {
        contactId: customerData.id,
        portalAccess: newPortalAccess
      },
      {
        onSuccess: () => {
          setIsLoadingPortal(false);
          refetch();
        },
        onError: () => {
          setIsLoadingPortal(false);
        }
      }
    );
  };

  const handleClone = (type: 'customer' | 'vendor') => {
    navigate(`/contacts/clone/${customerData.id}?type=${type}`);
  };
  
  const handleDelete = () => {
    console.log('Deleting customer:', customerData.id);
    setShowDeleteDialog(false);
  };

  const handleMarkInactive = () => {
    console.log('Marking customer as inactive:', customerData.id);
    setShowInactiveDialog(false);
  };

  if (!customerData) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-3 text-sm text-gray-500">Loading Customer Data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 dark:bg-gray-900 dark:text-gray-500">
      {/* Header Section */}
      <div className="flex justify-between items-start mb-4 dark:bg-gray-900 dark:text-gray-500">
        <div>
          <h1 className="text-xl font-semibold text-gray-800 flex items-center gap-2 dark:bg-gray-900 dark:text-gray-500">
            {displayValue(customerData?.organization_name_en || customerData?.full_name_en)}
            <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-medium ${
              customerData?.contact_type === 'business' 
                ? 'bg-purple-50 text-purple-700' 
                : 'bg-blue-50 text-blue-700'
            }`}>
             {customerData?.contact_type === "business"
                ? "BUSINESS"
                : "INDIVIDUAL"}
            </span>
          </h1>
          {/* <p className="text-xs text-gray-500 mt-1">
            {displayValue(customerData?.branch_name_en)} • الرقم: {displayValue(customerData?.id)}
          </p> */}
        </div>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="border-gray-300"
            onClick={() => navigate(`/customers/update/${customerData?.id}`)}
          >
            <Edit className="w-3 h-3 mr-1.5" />
            <span className="text-xs">Edit</span>
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="border-gray-300">
                <MoreVertical className="w-3 h-3" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-40 dark:bg-gray-900 dark:text-gray-500 ">
              <DropdownMenuItem onClick={() => setShowCloneDialog(true)} className="dark:hover:bg-gray-700" >
                <Copy className="w-3 h-3 mr-2  " />
                Clone
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={() => setShowDeleteDialog(true)}
                className="text-red-600 dark:hover:bg-gray-700"
              >
                <Trash2 className="w-3 h-3 mr-2" />
                Delete
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={() => setShowInactiveDialog(true)}
                className="text-amber-600 dark:hover:bg-gray-700"
              >
                <UserX className="w-3 h-3 mr-2" />
                 Mark as inactive
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Clone Dialog */}
      <Dialog open={showCloneDialog} onOpenChange={setShowCloneDialog}>
        <DialogContent className="sm:max-w-md dark:bg-gray-900  dark:text-gray-500">
          <DialogHeader>
            <DialogTitle>Clone Contact</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-sm text-gray-600">
            Select the contact type under which you want to create the new
              cloned contact.
            </p>
            <div className="space-y-2">
              <button
                onClick={() => handleClone('customer')}
                className="w-full p-3 border border-gray-200 rounded-lg text-left hover:bg-gray-50 transition-colors flex items-center gap-3"
              >
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                  <User className="w-4 h-4 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium">Customer</p>
                  <p className="text-xs text-gray-500"> Create as a new customer</p>
                </div>
              </button>
              <button
                onClick={() => handleClone('vendor')}
                className="w-full p-3 border border-gray-200 rounded-lg text-left hover:bg-gray-50 transition-colors flex items-center gap-3"
              >
                <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center">
                  <User className="w-4 h-4 text-purple-600" />
                </div>
                <div>
                  <p className="font-medium">Vendor</p>
                  <p className="text-xs text-gray-500">
                    Create as a new vendor

                  </p>
                </div>
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent className="sm:max-w-md dark:bg-gray-900  dark:text-gray-500">
          <DialogHeader>
                 <DialogTitle>Confirm Deletion</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-sm text-gray-600">
              Are you sure you want to delete this customer? This action cannot
              be undone.
            </p>
            <div className="flex justify-end gap-2">
              <Button 
                variant="outline" 
                onClick={() => setShowDeleteDialog(false)}
              >
                Cancel
              </Button>
              <Button 
                variant="destructive"
                onClick={handleDelete}
              >
                Delete
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Mark as Inactive Dialog */}
      <Dialog open={showInactiveDialog} onOpenChange={setShowInactiveDialog}>
        <DialogContent className="sm:max-w-md dark:bg-gray-900  dark:text-gray-500">
          <DialogHeader>
             <DialogTitle>Mark as Inactive</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
           <p className="text-sm text-gray-600">
              Are you sure you want to mark this customer as inactive? They will
              no longer appear in active lists.
            </p>
            <div className="flex justify-end gap-2">
              <Button 
                variant="outline" 
                onClick={() => setShowInactiveDialog(false)}
              >
                Cancel
              </Button>
              <Button 
                variant="default"
                onClick={handleMarkInactive}
              >
                Confirm
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Tabs Navigation */}
      <div className="border-b border-gray-200  dark:border-gray-900   mb-4">
       <nav className="-mb-px flex space-x-6">
          {["Overview", "Transactions", "Documents", "Activities"].map(
            (tab) => (
            <button
                key={tab}
                className={`whitespace-nowrap py-3 px-1 border-b-2 text-xs font-medium ${
                  activeTab === tab.toLowerCase()
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
                onClick={() => setActiveTab(tab.toLowerCase())}
              >
                {tab}
              </button>
            )
          )}
        </nav>
      </div>

      {/* Main Content Grid */}
       <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        {/* Left Column - Customer Information */}
        <div className="lg:col-span-1 space-y-4 dark:bg-gray-900  dark:text-gray-500">
          {/* Profile Card */}
          <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-xs dark:bg-gray-900  dark:text-gray-500">
            <div className="flex flex-col items-center text-center mb-3">
              <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center mb-2">
                <User className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-sm font-medium text-gray-800   dark:text-gray-500">
                {displayValue(customerData?.full_name_en || customerData?.organization_name_en)}
              </h3>
              <p className="text-xs text-gray-500 capitalize">
                {displayValue(customerData?.contact_type)} • {displayValue(customerData?.branch_name_en)}
              </p>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-2 text-xs">
                <Mail className="w-3 h-3 text-gray-400" />
                {customerData?.email ? (
                  <a
                    href={`mailto:${customerData?.email}`}
                    className="text-blue-600 hover:underline truncate"
                  >
                    {customerData?.email}
                  </a>
                ) : (
                  displayValue(null)
                )}
              </div>
              <div className="flex items-center gap-2 text-xs">
                <Phone className="w-3 h-3 text-gray-400" />
                {displayValue(customerData?.mobile)}
              </div>
              <div className="flex items-center gap-2 text-xs">
                <Phone className="w-3 h-3 text-gray-400" />
                <span>Work: {displayValue(customerData?.details?.work_phone)}</span>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <Globe className="w-3 h-3 text-gray-400" />
                {customerData?.details?.website_url ? (
                  <a
                    href={customerData?.details?.website_url}
                    target="_blank"
                    className="text-blue-600 hover:underline truncate"
                  >
                    {customerData?.details?.website_url.replace(/^https?:\/\//, "")}
                  </a>
                ) : (
                  displayValue(null)
                )}
              </div>
            </div>
          </div>

          {/* Customer Portal Card */}
          <div className={`rounded-xl p-4 transition-all dark:bg-gray-900  dark:text-gray-500 duration-200 ${
            customerData?.portal_access
              ? "bg-green-50 border border-green-100"
              : "bg-blue-50 border border-blue-100"
          }`}>
            <div className="flex items-start gap-3 mb-3">
              <div className={`p-2 rounded-lg ${
                customerData?.portal_access ? "bg-green-100" : "bg-blue-100"
              }`}>
                <Lock className={`w-5 h-5 ${
                  customerData?.portal_access ? "text-green-600" : "text-blue-600"
                }`} />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-800  dark:text-gray-500">   Customer Portal</h3>
                <p className="text-xs text-gray-600 mt-1">
                  {customerData?.portal_access
                    ? "Portal is currently active"
                    : "Portal access is disabled"}
                </p>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between">
              <span className="text-xs text-gray-500">
                {customerData?.portal_access
                  ? "Customers can view their transactions"
                  : "Enable to give access"}
              </span>
              <button
                onClick={handleTogglePortal}
                disabled={isLoadingPortal}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg ${
                  customerData?.portal_access
                    ? "bg-white text-gray-800 border border-gray-200 hover:bg-gray-50"
                    : "bg-blue-600 text-white hover:bg-blue-700"
                } transition-colors`}
              >
                {isLoadingPortal ? (
                  <Loader2 className="w-3 h-3 animate-spin" />
                ) : customerData?.portal_access ? (
                  "Disable"
                ) : (
                  "Enable"
                )}
              </button>
            </div>
          </div>

          {/* Address Information */}
          <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-xs dark:bg-gray-900  dark:text-gray-500">
            <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2 flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              ADDRESS INFORMATION
            </h3>

            <div className="space-y-4">
              <div>
                <h4 className="text-[10px] font-medium text-gray-500 uppercase tracking-wider mb-1">
                  BILLING ADDRESS
                </h4>
                {displayAddress({
                  street1: customerData?.details?.billing_address_street_1,
                  street2: customerData?.details?.billing_address_street_2,
                  city: customerData?.details?.billing_address_city,
                  zip: customerData?.details?.billing_address_zip_code,
                  phone: customerData?.details?.billing_address_phone
                })}
              </div>

              <div>
                <h4 className="text-[10px] font-medium text-gray-500 uppercase tracking-wider mb-1">
                  SHIPPING ADDRESS
                </h4>
                {displayAddress({
                  street1: customerData?.details?.shipping_address_street_1,
                  street2: customerData?.details?.shipping_address_street_2,
                  city: customerData?.details?.shipping_address_city,
                  zip: customerData?.details?.shipping_address_zip_code,
                  phone: customerData?.details?.shipping_address_phone
                })}
              </div>
            </div>
          </div>

          {/* Financial Details */}
          <div className="bg-white rounded-lg border dark:bg-gray-900  dark:text-gray-500 border-gray-200 p-4 shadow-xs">
               <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">
              FINANCIAL DETAILS
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-500">Balance</span>
                <span className="text-xs font-semibold text-gray-800  dark:text-gray-500">
                  {parseFloat(customerData?.balance || 0).toLocaleString()} AED
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-500">Payment Terms </span>
                <span className="text-xs font-semibold text-gray-800   dark:text-gray-500">
                  {displayValue(customerData?.payment_term_name_en)} (
                  {displayValue(customerData?.payment_term_number_of_days)} days)
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-500">Currency</span>
                <span className="text-xs font-semibold text-gray-800 dark:text-gray-500">
                  {customerData?.currency_id === 2 ? "AED" : "Other"} (Rate:{" "}
                  {displayValue(customerData?.exchange_rate)})
                </span>
              </div>
            </div>
          </div>

          {/* Identification Details */}
          <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-xs dark:bg-gray-900  dark:text-gray-500">
            <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2 flex items-center gap-1">
              <IdCard className="w-3 h-3" />
              IDENTIFICATION
            </h3>

            <div className="space-y-4">
              <div>
               <h4 className="text-[10px] font-medium text-gray-500 uppercase tracking-wider mb-1">
                    PASSPORT
                  </h4>
                <p className="text-xs text-gray-800   dark:text-gray-400">
                  {displayValue(customerData?.details?.passport_number, "No Data")}
                </p>
                {customerData?.details?.id_expiry_date && (
                  <span className="text-[10px] text-gray-500 block mt-1 ">
                    Expires:{" "}
                    {new Date(customerData?.details?.id_expiry_date).toLocaleDateString()}
                  </span>
                )}
              </div>

              <div>
             <h4 className="text-[10px] font-medium text-gray-500 uppercase tracking-wider mb-1">
                    UNIFIED NUMBER
                  </h4>
                <p className="text-xs text-gray-800  dark:text-gray-400">
                  {displayValue(customerData?.details?.unified_number)}
                </p>
              </div>

              <div>
              <h4 className="text-[10px] font-medium text-gray-500 uppercase tracking-wider mb-1">
                    DRIVING LICENSE
                  </h4>
                <p className="text-xs text-gray-800  dark:text-gray-400">
                  {displayValue(customerData?.details?.driving_license_number)}
                </p>
                {customerData?.details?.driving_license_expiry_date && (
                  <p className="text-[10px] text-gray-500 mt-1">
                    Expires: {new Date(customerData?.details?.driving_license_expiry_date).toLocaleDateString()}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Social Media */}
          {customerData?.details?.social_media?.length > 0 ? (
            <div className="bg-white rounded-lg border  border-gray-200 p-4 shadow-xs dark:bg-gray-900  dark:text-gray-500">
               <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2 flex items-center gap-1 dark:bg-gray-900  dark:text-gray-500">
                <Share2 className="w-3 h-3" />
                SOCIAL MEDIA
              </h3>

              <div className="flex flex-wrap gap-2 dark:bg-gray-900  dark:text-gray-500">
                {customerData?.details?.social_media.map((social: any) => (
                  <a
                    key={social.platform}
                    href={social.url}
                    target="_blank"
                    className="text-xs px-2 py-1 rounded-full bg-gray-100 dark:bg-gray-700  dark:text-gray-300 hover:bg-gray-200 text-gray-800 flex items-center gap-1"
                  >
                    {social?.platform === "Facebook" && (
                      <Facebook className="w-3 h-3 dark:bg-gray-700  dark:text-gray-300" />
                    )}
                    {social?.platform === "Twitter" && (
                      <Twitter className="w-3 h-3 dark:bg-gray-700  dark:text-gray-300" />
                    )}
                    {social?.platform === "Instagram" && (
                      <Instagram className="w-3 h-3 dark:bg-gray-700  dark:text-gray-300" />
                    )}
                    {social?.platform}
                  </a>
                ))}
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-xs dark:bg-gray-900  dark:text-gray-500">
              <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2 flex items-center gap-1">
                <Share2 className="w-3 h-3" />
               SOCIAL MEDIA
              </h3>
              <p className="text-xs text-gray-500">No Value</p>
            </div>
          )}
        </div>
        {/* Right Column - Main Content */}
        <div className="lg:col-span-3 space-y-4 dark:bg-gray-900  dark:text-gray-500">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 ">
            <div className="bg-white rounded-lg border border-gray-200 p-3 shadow-xs dark:bg-gray-900  dark:text-gray-500">
              <h3 className="text-[10px] font-medium text-gray-500 uppercase tracking-wider mb-1">
                TOTAL SPEND (6M)
              </h3>
              <p className="text-lg font-semibold text-gray-900 ] dark:text-gray-500">
                {parseFloat(customerData.balance || 0).toLocaleString()}AED
              </p>
              <p className="text-[10px] text-gray-500 mt-0.5">
                +12% from last period
              </p>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-3 shadow-xs dark:bg-gray-900  dark:text-gray-500">
              <h3 className="text-[10px] font-medium text-gray-500 uppercase tracking-wider mb-1">
                OPEN INVOICES
              </h3>
              <p className="text-lg font-semibold text-gray-900   dark:text-gray-500">3</p>
              <p className="text-[10px] text-gray-500 mt-0.5">
                12,450 AED total
              </p>
            </div>

            <div className="bg-white rounded-lg border dark:bg-gray-900  dark:text-gray-500 border-gray-200 p-3 shadow-xs">
              <h3 className="text-[10px] font-medium text-gray-500 uppercase tracking-wider mb-1">
                AVG. PAYMENT DAYS
              </h3>
              <p className="text-lg font-semibold text-gray-900 dark:bg-gray-900  dark:text-gray-500">45</p>
              <p className="text-[10px] text-gray-500 mt-0.5">
                On time payment: 78%
              </p>
            </div>
          </div>

          {/* Recent Transactions */}
          <div className="bg-white rounded-lg border dark:bg-gray-900  dark:text-gray-500 border-gray-200 overflow-hidden shadow-xs">
            <div className="p-3 border-b border-gray-200">
              <h3 className="text-xs font-medium text-gray-700  dark:text-gray-500 uppercase tracking-wider">
                RECENT TRANSACTIONS
              </h3>
            </div>
            <div className="p-2">
              <DataTable
                tableName="Sub Categories"
                columns={subCategoryColumns({
                  update: hasPermission("update", "sub_categories"),
                  delete: hasPermission("delete", "sub_categories"),
                })}
                data={[]}
                createPath="/sub-categories/create"
                permissions={{
                  create: hasPermission("create", "sub_categories"),
                  update: hasPermission("update", "sub_categories"),
                  delete: hasPermission("delete", "sub_categories"),
                }}
              />
            </div>
          </div>

          {/* Contact Persons */}
          <div className="bg-white rounded-lg border dark:bg-gray-900  dark:text-gray-500 border-gray-200 overflow-hidden shadow-xs">
            <div className="p-3 border-b border-gray-200 flex justify-between items-center">
              <h3 className="text-xs font-medium text-gray-700   dark:text-gray-500 uppercase tracking-wider">
              CONTACT PERSONS ({customerData?.persons?.length || 0})
              </h3>
              <Button size="sm" variant="outline" className="h-7">
                <Plus className="w-3 h-3 mr-1" />
                <span className="text-xs">Add</span>
              </Button>
            </div>

            {customerData?.persons?.length > 0 ? (
              customerData.persons.map((person: any) => (
                <div
                  key={person?.id}
                  className="p-3 flex items-start gap-3  border-b border-gray-200 last:border-0"
                >
                  <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                    <User className="w-3.5 h-3.5 text-gray-500" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-medium text-gray-800   dark:text-gray-500">
                      {displayValue(person?.full_name_en || person?.full_name_ar)}
                    </h4>
                    <p className="text-xs text-gray-500 mt-0.5">
                      {displayValue(person.designation)} • {displayValue(person.department)}
                    </p>

                    <div className="mt-2 space-y-1.5">
                      <div className="flex items-center gap-2 text-xs">
                        <Mail className="w-3 h-3 text-gray-400 flex-shrink-0" />
                        {person.email ? (
                          <a
                            href={`mailto:${person.email}`}
                            className="text-blue-600 hover:underline truncate"
                          >
                            {person.email}
                          </a>
                        ) : (
                          displayValue(null)
                        )}
                      </div>

                      <div className="flex items-center gap-2 text-xs">
                        <Phone className="w-3 h-3 text-gray-400 flex-shrink-0" />
                        {person.mobile ? (
                          <a
                            href={`tel:${person.mobile}`}
                            className="text-blue-600 hover:underline"
                          >
                            {person.mobile}
                          </a>
                        ) : (
                          displayValue(null)
                        )}
                      </div>

                      {person.social_media?.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-1">
                          {person.social_media.map((social: any) => (
                            <a
                              key={`${person.id}-${social.platform}`}
                              href={social.url}
                              target="_blank"
                              className="text-[10px] px-1.5 py-0.5 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 flex items-center gap-0.5"
                            >
                              {social.platform}
                            </a>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-7 w-7 p-0">
                        <MoreVertical className="h-3.5 w-3.5" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="text-xs dark:bg-gray-900  dark:text-gray-500">
                      <DropdownMenuItem className="dark:hover:bg-gray-800">Edit</DropdownMenuItem>
                      <DropdownMenuItem className="dark:hover:bg-gray-800">Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              ))
            ) : (
              <EmptyState message="No contact persons available" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}