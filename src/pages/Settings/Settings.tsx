import { Search, X } from "lucide-react";

const categories = [
  {
    title: "Organization",
    icon: "🏢",
    links: ["Profile", "Branding", "Custom Domain", "Branches", "Currencies", "Approvals", "Opening Balances", "Manage Subscription"],
  },
  {
    title: "Taxes & Compliance",
    icon: "📜",
    links: ["Taxes"],
  },
  {
    title: "Users & Roles",
    icon: "👥",
    links: ["Users", "Roles", "User Preferences"],
  },
  {
    title: "Preferences",
    icon: "⚙️",
    links: ["General", "Customers and Vendors", "Accountant", "Projects", "Timesheet", "Customer Portal", "Vendor Portal"],
  },
  {
    title: "Sales",
    icon: "🛒",
    links: ["Quotes", "Retainer Invoices", "Sales Orders", "Delivery Challans", "Invoices", "Recurring Invoices", "Payments Received", "Credit Notes", "Delivery Notes", "Packing Slips"],
  },
  {
    title: "Purchases",
    icon: "🔒",
    links: ["Expenses", "Recurring Expenses", "Bills", "Recurring Bills", "Payments Made", "Purchase Orders", "Vendor Credits"],
  },
  {
    title: "Items",
    icon: "📦",
    links: ["Items", "Inventory Adjustments"],
  },
  {
    title: "Online Payments",
    icon: "💳",
    links: ["Payment Gateways"],
  },
  {
    title: "Customisation",
    icon: "🛠️",
    links: ["Reporting Tags", "Web Tabs", "Transaction Number Series", "PDF Templates"],
  },
  {
    title: "Reminders & Notifications",
    icon: "🔔",
    links: ["Reminders", "Email Notifications"],
  },
  {
    title: "Automation",
    icon: "🤖",
    links: ["Workflow Rules", "Workflow Actions", "Workflow Logs", "Schedules"],
  },
  {
    title: "Custom Modules",
    icon: "🔧",
    links: ["Overview"],
  },
  {
    title: "Developer & Data",
    icon: "📂",
    links: ["Incoming Webhooks", "Connections", "API Usage", "Signals", "Data Backup", "Deluge Components Usage"],
  },
  {
    title: "Integrations & Marketing",
    icon: "🔗",
    links: ["SMS Integrations", "Zoho Apps", "Other Apps", "WhatsApp", "Marketplace"],
  },
];

export default function Settings() {
  return (
    <div className="p-6 bg-gray-50 min-h-screen px-6 sm:px-16 md:px-24 lg:px-32 text-xs">
      {/* Header */}
      <div className="bg-white p-4 shadow-md mb-6 flex justify-between items-center w-full fixed top-12 left-0 right-0 z-10 px-6 sm:px-16 md:px-24 lg:px-32">
        <h2 className="text-lg font-semibold">All Settings</h2>
        <div className="relative w-full max-w-md mx-auto">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input type="text" placeholder="Search your settings" className="pl-10 border rounded-md w-full p-2 text-xs" />
        </div>
        <button className="flex items-center text-gray-600 hover:text-red-500 text-xs">
          Close Settings <X className="w-4 h-4 ml-2" />
        </button>
      </div>
      
      <div className="mt-24 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
        {categories.map((category, index) => (
          <div key={index} className="bg-white shadow-md hover:shadow-lg transition rounded-lg p-3 w-56 mx-auto text-xs">
            <div className="flex items-center gap-2 text-sm font-semibold mb-2">
              <span className="text-xl">{category.icon}</span>
              {category.title}
            </div>
            <ul className="space-y-2">
              {category.links.map((link, i) => (
                <li
                  key={i}
                  className="cursor-pointer text-gray-600 hover:text-blue-600 hover:bg-blue-100 px-2 py-1 rounded-md transition text-xs"
                >
                  {link}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
