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
import { useFetchProducts } from "@/hooks/prouducts/useProducts";
import { Home, MoreVertical, Plus } from "lucide-react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import ProductDetails from "./productDetails";
import Papa from 'papaparse';
import * as XLSX from 'xlsx';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable'

export default function ProductsLayout() {
    const { data } = useFetchProducts();
 const products = data || [];
  const { id } = useParams();
  // const [selectedCustomerId, setSelectedCustomerId] = useState<number | null>(
  //   +id! || null
  // );
  const navigate = useNavigate();

  const [selectedProductId, setSelectedProductId] = useState<number | null>(
    id ? +id : null
  );

  // const excludedExportColumns = ['actions'];
  const tableName = 'products'; 

 
  // دالة التصدير إلى CSV
  const handleExportCSV = () => {
    // تحضير البيانات للتصدير
    const exportData = products.map(product => ({
      'Product Name (EN)': product.product_name_en,
      'Product Name (AR)': product.product_name_ar,
      'SKU': product.sku,
      // أضف حقول أخرى حسب الحاجة
    }));

    const csv = Papa.unparse(exportData);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `${tableName}.csv`;
    link.click();
  };


 // دالة التصدير إلى Excel
  const handleExportExcel = () => {
    // تحضير البيانات للتصدير
    const exportData = products.map(product => ({
      'Product Name (EN)': product.product_name_en,
      'Product Name (AR)': product.product_name_ar,
      'SKU': product.sku,
      // أضف حقول أخرى حسب الحاجة
    }));

    const ws = XLSX.utils.json_to_sheet(exportData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
    XLSX.writeFile(wb, `${tableName}.xlsx`);
  };

  const handleExportPDF = () => {
  const doc = new jsPDF();
  
  // تحضير العناوين والبيانات
  const headers = [
    'Product Name (EN)',
    'Product Name (AR)',
    'SKU',
    // أضف عناوين أخرى حسب الحاجة
  ];

  // تحضير البيانات
  const data = products.map(product => [
    product.product_name_en || '',
    product.product_name_ar || '',
    product.sku || '',
    // أضف حقول أخرى حسب الحاجة
  ]);

  doc.text(tableName, 14, 16);

  (doc as any).autoTable({
    head: [headers],
    body: data,
    startY: 20,
    styles: {
      fontSize: 10,
    },
    headStyles: {
      fillColor: [41, 128, 185],
      textColor: 255,
    },
    alternateRowStyles: {
      fillColor: [245, 245, 245],
    },
  });

  doc.save(`${tableName}.pdf`);
};

const handlePrint = () => {
  // تحضير العناوين
  const headers = [
    'Product Name (EN)',
    'Product Name (AR)',
    'SKU',
  ];

  // تحضير البيانات
  const data = products.map(product => [
    product.product_name_en || '',
    product.product_name_ar || '',
    product.sku || '',
  ]);

  const printContent = `
    <html>
      <head>
        <title>Print Products</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 20px; }
          h1 { color: #333; text-align: center; margin-bottom: 20px; }
          table { width: 100%; border-collapse: collapse; margin-top: 20px; }
          
          /* تنسيق العناوين للطباعة -      */
          th { 
            background-color: #465FFF; 
            color: white; 
            text-align: left; 
            padding: 10px; 
            border: 1px solid #ddd; 
            font-weight: bold;
          }
          
          td { padding: 8px; border: 1px solid #ddd; }
          tr:nth-child(even) { background-color: #f2f2f2; }
          
          @media print {
            body { margin: 0; padding: 0; }
            .no-print { display: none !important; }
            table { width: 100% !important; }
            
            /* التأكد من تطبيق الألوان عند الطباعة */
            th { 
              -webkit-print-color-adjust: exact !important;
              print-color-adjust: exact !important;
              background-color: #465FFF;
              color: #ffffff;
            }
          }
        </style>
      </head>
      <body>
        <h1>${tableName || "Products List"}</h1>
        <table>
          <thead>
            <tr>
              ${headers.map(header => `<th>${header}</th>`).join("")}
            </tr>
          </thead>
          <tbody>
            ${data.map(row => `
              <tr>
                ${row.map(cell => `<td>${cell}</td>`).join("")}
              </tr>
            `).join("")}
          </tbody>
        </table>
       
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
};
  return (
    <div className="bg-gray-50 min-h-screen dark:bg-gray-900 dark:text-gray-400">
      <PageBreadcrumb
        baseTitle="Dashboard"
        pageTitle="Products"
        icon={<Home className="w-5 h-5" />}
      />

      <div className="mt-1 bg-white rounded-xl shadow-sm border dark:bg-gray-900 dark:text-gray-400 border-gray-200 overflow-hidden">
        <div className="flex h-[calc(100vh-120px)]">
          {/* Sidebar */}
          <div className="w-60 border-r border-gray-100 flex flex-col ">
            <div className="p-4 border-b border-gray-100 bg-gray-50  dark:bg-gray-900 dark:text-gray-400 flex justify-between items-center">
              <h3 className="font-medium text-gray-800 text-[15px]   dark:text-gray-400">
                Products
              </h3>
              <div className="flex gap-2 ">
                <Button
                  size="sm"
                  className="h-8 bg-[#465FFF] hover:bg-[#465FFF]/90 text-white"
                  onClick={() => navigate("/products/create")}
                >
                  <Plus className="h-4 w-4 mr-1" />
                  New
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className="h-8 w-8 p-0 hover:bg-gray-100 dark:hover:bg-gray-600 "
                    >
                      <MoreVertical className="h-4 w-4 text-gray-600  dark:text-gray-300" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-[200px] dark:bg-gray-800 dark:text-gray-400">
                    <DropdownMenuLabel>Export Options</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleExportCSV}>
                      Export as CSV
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleExportExcel}>
                      Export as Excel
                    </DropdownMenuItem>
                     <DropdownMenuItem onClick={handleExportPDF}>
                      Export as PDF
                    </DropdownMenuItem>
                     <DropdownMenuItem onClick={handlePrint}>
                     Print
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto ">
              {products.map((product: any) => (
                <div
                  key={product.id}
                  onClick={() => {
                    setSelectedProductId(product.id);
                    navigate(`/products/${product.id}`);
                  }}
                  className={`p-3 border-b dark:hover:bg-gray-700 border-gray-100 cursor-pointer transition-colors ${
                    selectedProductId === product.id
                      ? "bg-blue-50 border-l-4 border-l-blue-500 dark:bg-gray-700"
                      : "hover:bg-gray-50"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center bg-blue-100 text-blue-600">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 text-[14px] dark:text-gray-400">
                        {product.product_name_en || product.product_name_ar}
                      </h4>
                      <p className="text-xs text-gray-500 mt-1 dark:text-gray-300">
                        SKU: {product.sku}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 overflow-auto dark:bg-gray-900 dark:text-gray-400">
            {selectedProductId ? (
              <ProductDetails productId={selectedProductId} />
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-center p-8">
                <div className="bg-gray-100 p-6 rounded-full mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-10 h-10 text-gray-400"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-medium text-gray-900 ">
                  No product selected
                </h3>
                <p className="text-gray-500 mt-2 max-w-md">
                  Select a product from the list to view detailed information
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}