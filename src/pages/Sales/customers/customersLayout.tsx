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
import * as XLSX from "xlsx";
import * as Papa from "papaparse";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
export default function CustomersLayout() {
  const { data } = useFetchContacts(ContactType.CUSTOMER);
  const customers = data || [];
  const navigate = useNavigate();
  const { id } = useParams();
  const [selectedCustomerId, setSelectedCustomerId] = useState<number | null>(
    +id! || null
  );
  // تعريف المتغيرات المطلوبة للتصدير
  const excludedExportColumns = ["actions"]; // أضف الأعمدة التي تريد استثناءها
  const tableName = "Customers"; // اسم الملف الذي سيتم تصديره

  const getCustomerExportData = () => {
    return customers.map((customer) => ({
      "Full Name (EN)": customer.full_name_en || "",

      Email: customer.email || "",

      Mobile: customer.mobile || "",
      Branch: customer.branch_id || "",
    }));
  };

  const handleExportCSV = () => {
    try {
      const exportData = getCustomerExportData();
      const csv = Papa.unparse(exportData);
      const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = `${tableName}_${new Date()
        .toISOString()
        .slice(0, 10)}.csv`;
      link.click();
    } catch (error) {
      console.error("Error exporting CSV:", error);
    }
  };

  const handleExportExcel = () => {
    try {
      const exportData = getCustomerExportData();
      const ws = XLSX.utils.json_to_sheet(exportData);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Customers");
      XLSX.writeFile(
        wb,
        `${tableName}_${new Date().toISOString().slice(0, 10)}.xlsx`
      );
    } catch (error) {
      console.error("Error exporting Excel:", error);
    }
  };

  const handleExportPDF = () => {
    try {
      const doc = new jsPDF();
      const exportData = getCustomerExportData();

      const headers = Object.keys(exportData[0]);
      const data = exportData.map((item) => Object.values(item));

      doc.text(`${tableName} `, 14, 16);

      autoTable(doc, {
        head: [headers],
        body: data,
        startY: 20,
        styles: {
          fontSize: 9,
          cellPadding: 3,
          overflow: "linebreak",
        },
        headStyles: {
          fillColor: [70, 95, 255],
          textColor: 255,
          fontStyle: "bold",
        },
        alternateRowStyles: {
          fillColor: [245, 245, 245],
        },
        margin: { top: 20 },
      });

      doc.save(`${tableName}_${new Date().toISOString().slice(0, 10)}.pdf`);
    } catch (error) {
      console.error("Error exporting PDF:", error);
    }
  };

  const handlePrint = () => {
    try {
      const exportData = getCustomerExportData();
      const headers = Object.keys(exportData[0]);
      const data = exportData.map((item) => Object.values(item));

      const printContent = `
        <html>
          <head>
            <title>Print ${tableName}</title>
            <style>
              @page { size: auto; margin: 10mm; }
              body { font-family: Arial, sans-serif; margin: 20px; }
              h1 { color: #333; text-align: center; margin-bottom: 20px; }
              table { width: 100%; border-collapse: collapse; margin-top: 20px; font-size: 12px; }
              th { 
                background-color: #465FFF !important; 
                color: white !important; 
                text-align: left; 
                padding: 8px; 
                border: 1px solid #ddd; 
                font-weight: bold;
              }
              td { padding: 6px; border: 1px solid #ddd; }
              tr:nth-child(even) { background-color: #f9f9f9; }
              @media print {
                body { margin: 0; padding: 0; }
                .no-print { display: none !important; }
                th { 
                  -webkit-print-color-adjust: exact !important;
                  print-color-adjust: exact !important;
                }
              }
            </style>
          </head>
          <body>
            <h1>${tableName}</h1>
            <table>
              <thead>
                <tr>
                  ${headers.map((header) => `<th>${header}</th>`).join("")}
                </tr>
              </thead>
              <tbody>
                ${data
                  .map(
                    (row) => `
                  <tr>
                    ${row.map((cell) => `<td>${cell}</td>`).join("")}
                  </tr>
                `
                  )
                  .join("")}
              </tbody>
            </table>
            <div class="no-print" style="margin-top: 20px; text-align: center; font-size: 11px; color: #777;">
              Printed on ${new Date().toLocaleString()}
            </div>
          </body>
        </html>
      `;

      const printWindow = window.open("", "_blank");
      if (printWindow) {
        printWindow.document.write(printContent);
        printWindow.document.close();
        printWindow.focus();

        setTimeout(() => {
          printWindow.print();
        }, 500);
      }
    } catch (error) {
      console.error("Error printing:", error);
    }
  };
  return (
    <div className="bg-gray-50 min-h-screen dark:bg-gray-900  dark:text-gray-500 ">
      <PageBreadcrumb
        baseTitle="Dashboard"
        pageTitle="Customers"
        icon={<Home className="w-5 h-5" />}
      />
      <div className="mt-1 bg-white rounded-xl shadow-sm border  dark:text-gray-500 border-gray-200 overflow-hidden">
        <div className="flex flex-col md:flex-row h-[calc(100vh-120px)]">
          {/* Sidebar */}
          <div className="hidden md:flex w-60 border-r dark:bg-gray-900  dark:text-gray-500 border-gray-100 flex-col">
            <div className="p-4 border-b dark:bg-gray-900  dark:text-gray-500 border-gray-100 bg-gray-50 flex justify-between items-center">
              <h3 className="font-medium  dark:text-gray-500 text-gray-800 text-[15px]">
                Customers
              </h3>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  className="h-8 bg-[#465FFF] hover:bg-[#465FFF]/90 text-white  "
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
                  <DropdownMenuContent className="w-[200px] dark:bg-gray-900  dark:text-gray-500">
                    <DropdownMenuLabel>Export Options</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={handleExportCSV}
                      className="dark:hover:bg-gray-800 "
                    >
                      Export as CSV
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={handleExportExcel}
                      className="dark:hover:bg-gray-800"
                    >
                      Export as Excel
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={handleExportPDF}
                      className="dark:hover:bg-gray-800"
                    >
                      Export as PDF
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={handlePrint}
                      className="dark:hover:bg-gray-800"
                    >
                      Print
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto ">
              {customers?.map((customer: any) => (
                <div
                  key={customer.id}
                  onClick={() => {
                    setSelectedCustomerId(customer.id);
                    navigate(`/customers/${customer.id}`);
                  }}
                  className={`p-3 border-b border-gray-100   dark:bg-gray-900  dark:text-gray-500 cursor-pointer transition-colors ${
                    selectedCustomerId === customer.id
                      ? "bg-blue-50 border-l-4 border-l-blue-500 dark:bg-gray-600    "
                      : "hover:bg-gray-50 dark:bg-gray-600"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        customer.contact_type === "business"
                          ? "bg-purple-100 text-purple-600"
                          : "bg-blue-100 text-blue-600"
                      }`}
                    >
                      <User className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 text-[14px] dark:text-gray-500  dark:bg-gray-900 ">
                        {customer.full_name_en || customer.organization_name_en}
                      </h4>
                      <p className="text-xs text-gray-500 mt-1">
                        {customer.contact_type === "business"
                          ? "Business"
                          : "Individual"}{" "}
                        • {customer.balance} AED
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
                <h3 className="text-xl font-medium text-gray-900">
                  No customer selected
                </h3>
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
