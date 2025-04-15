import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { type Table } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Settings2, FileText, Printer } from "lucide-react";
import * as XLSX from "xlsx";
import * as Papa from "papaparse";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

interface DataTableViewOptionsProps<TData> {
  table: Table<TData>;
  tableName?: string;
}

export function DataTableViewOptions<TData>({
  table,
  tableName,
}: DataTableViewOptionsProps<TData>) {
  const excludedExportColumns = ["Actions"];

 const handleExportCSV = () => {
  // الحصول على العناوين الحقيقية
  const headers = table
    .getVisibleLeafColumns()
    .filter((column) => !excludedExportColumns.includes(column.id))
    .map((column) => {
      const columnDef = column.columnDef as any;
      if (columnDef.header && typeof columnDef.header === 'string') {
        return columnDef.header;
      }
      if (columnDef.headerName) {
        return columnDef.headerName;
      }
      return column.id
        .replace(/_/g, " ")
        .replace(/\b\w/g, (char) => char.toUpperCase());
    });

  // الحصول على البيانات مع العناوين الصحيحة
  const rows = table.getRowModel().rows.map((row) => {
    const rowData: any = {};
    row.getVisibleCells()
      .filter((cell) => !excludedExportColumns.includes(cell.column.id))
      .forEach((cell) => {
        const columnDef = cell.column.columnDef as any;
        const headerName = columnDef.headerName || 
                         (columnDef.header && typeof columnDef.header === 'string' ? columnDef.header : 
                          cell.column.id.replace(/_/g, " ").replace(/\b\w/g, (char) => char.toUpperCase()));
        rowData[headerName] = cell.getValue();
      });
    return rowData;
  });

  const csv = Papa.unparse(rows);
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = `${tableName}.csv`;
  link.click();
};

const handleExportExcel = () => {
  // نفس منطق CSV لكن بتنسيق Excel
  const headers = table
    .getVisibleLeafColumns()
    .filter((column) => !excludedExportColumns.includes(column.id))
    .map((column) => {
      const columnDef = column.columnDef as any;
      if (columnDef.header && typeof columnDef.header === 'string') {
        return columnDef.header;
      }
      if (columnDef.headerName) {
        return columnDef.headerName;
      }
      return column.id
        .replace(/_/g, " ")
        .replace(/\b\w/g, (char) => char.toUpperCase());
    });

  const rows = table.getRowModel().rows.map((row) => {
    const rowData: any = {};
    row.getVisibleCells()
      .filter((cell) => !excludedExportColumns.includes(cell.column.id))
      .forEach((cell) => {
        const columnDef = cell.column.columnDef as any;
        const headerName = columnDef.headerName || 
                         (columnDef.header && typeof columnDef.header === 'string' ? columnDef.header : 
                          cell.column.id.replace(/_/g, " ").replace(/\b\w/g, (char) => char.toUpperCase()));
        rowData[headerName] = cell.getValue();
      });
    return rowData;
  });

  const ws = XLSX.utils.json_to_sheet(rows);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
  XLSX.writeFile(wb, `${tableName}.xlsx`);
};

const handleExportPDF = () => {
  const doc = new jsPDF();
  
  // الحصول على العناوين الحقيقية
  const headers = table
    .getVisibleLeafColumns()
    .filter((column) => !excludedExportColumns.includes(column.id))
    .map((column) => {
      const columnDef = column.columnDef as any;
      if (columnDef.header && typeof columnDef.header === 'string') {
        return columnDef.header;
      }
      if (columnDef.headerName) {
        return columnDef.headerName;
      }
      return column.id
        .replace(/_/g, " ")
        .replace(/\b\w/g, (char) => char.toUpperCase());
    });

  // الحصول على البيانات
  const data = table.getRowModel().rows.map((row) =>
    row
      .getVisibleCells()
      .filter((cell) => !excludedExportColumns.includes(cell.column.id))
      .map((cell) => {
        const value = cell.getValue();
        return typeof value === "string" || typeof value === "number"
          ? value
          : JSON.stringify(value);
      })
  );

  doc.text(tableName ? tableName : "Table Export", 14, 16);

  autoTable(doc, {
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
  // الحصول على العناوين الحقيقية من تعريفات الأعمدة
  const headers = table
    .getVisibleLeafColumns()
    .filter((column) => !excludedExportColumns.includes(column.id))
    .map((column) => {
      // محاولة الحصول على العنوان من خاصية columnDef.header أو column.id
      const columnDef = column.columnDef as any;
      if (columnDef.header && typeof columnDef.header === 'string') {
        return columnDef.header;
      }
      if (columnDef.headerName) {
        return columnDef.headerName;
      }
      return column.id
        .replace(/_/g, " ")
        .replace(/\b\w/g, (char) => char.toUpperCase());
    });

  const data = table.getRowModel().rows.map((row) =>
    row
      .getVisibleCells()
      .filter((cell) => !excludedExportColumns.includes(cell.column.id))
      .map((cell) => {
        const value = cell.getValue();
        return typeof value === "string" || typeof value === "number"
          ? value
          : JSON.stringify(value);
      })
  );

  const printContent = `
    <html>
      <head>
        <title>Print</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 20px; }
          h1 { color: #333; text-align: center; margin-bottom: 20px; }
          table { width: 100%; border-collapse: collapse; margin-top: 20px; }
          th { background-color: #465FFF; color: white;  text-align: left; padding: 10px; border: 1px solid #ddd; }
          td { padding: 8px; border: 1px solid #ddd; }
          @media print {
            body { margin: 0; padding: 0; }
            .no-print { display: none !important; }
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
        <h1>${tableName || "Table Print"}</h1>
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
              </tr>`
              )
              .join("")}
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
    <div className="flex space-x-4">
      <Button
        variant="outline"
        size="sm"
        className="h-8 lg:flex dark:text-gray-400"
        onClick={handlePrint}
      >
        <Printer className="ml-auto mr-2 h-4 w-4 dark:text-gray-400 dark:border-gray-400" />
        Print
      </Button>
      {/* Export options dropdown */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className=" ml-auto h-8 lg:flex dark:text-gray-400 dark:border-gray-400"
          >
            <FileText className="mr-2 h-4 w-4 " />
            Export
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          className="w-[200px] bg-white shadow-md border border-gray-200 dark:bg-gray-800"
        >
          <DropdownMenuLabel className="flex items-center text-[13px] gap-2 text-gray-600 dark:text-gray-400">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              className="text-blue-500"
            >
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            Export Options
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={handleExportCSV}
            className="flex items-center gap-2 text-[13px] hover:bg-gray- dark:text-gray-400"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              className="text-green-600"
            >
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
              <path d="M8 13v-1h8v1" />
              <path d="M8 17v-1h6v1" />
            </svg>
            Export by CSV
          </DropdownMenuItem>

          <DropdownMenuItem
            onClick={handleExportExcel}
            className="flex items-center gap-2 text-[13px] hover:bg-gray-50 dark:text-gray-400"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              className="text-purple-600"
            >
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
              <rect x="8" y="12" width="8" height="2" />
              <rect x="8" y="16" width="8" height="2" />
              <path d="M10 9h4" />
            </svg>
            Export by Excel
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={handleExportPDF}
            className="flex items-center gap-2 text-[13px] hover:bg-gray-50 dark:text-gray-400"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              className="text-red-600"
            >
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
              <path d="M8 11h1" />
              <path d="M8 15h1" />
              <path d="M12 11h3" />
              <path d="M16 15h-3" />
              <path d="M13 15v-3" />
            </svg>
            Export by PDF
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* View options dropdown */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className="ml-auto hidden h-8 lg:flex dark:text-gray-400 dark:border-gray-400"
          >
            <Settings2 className="mr-2 h-4 w-4" />
            View
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          className="w-[250px] bg-white shadow-md border border-gray-200 dark:bg-gray-800"
        >
          <DropdownMenuLabel className="dark:text-gray-400">
            Toggle columns
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          {table
            .getAllColumns()
            .filter(
              (column) =>
                typeof column.accessorFn !== "undefined" && column.getCanHide()
            )
            .map((column) => (
              <DropdownMenuCheckboxItem
                key={column.id}
                className="capitalize dark:text-gray-400"
                checked={column.getIsVisible()}
                onCheckedChange={(value) => column.toggleVisibility(!!value)}
              >
                {column.id
                  .replace(/_/g, " ")
                  .replace(/\b\w/g, (char) => char.toUpperCase())}
              </DropdownMenuCheckboxItem>
            ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
