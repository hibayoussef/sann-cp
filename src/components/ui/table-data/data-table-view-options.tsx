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

interface DataTableViewOptionsProps<TData> {
  table: Table<TData>;
}

export function DataTableViewOptions<TData>({
  table,
}: DataTableViewOptionsProps<TData>) {
  const handleExportCSV = () => {
    const rows = table
      .getRowModel()
      .rows.map((row) => row.getVisibleCells().map((cell) => cell.getValue()));
    const csv = Papa.unparse(rows);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "table_export.csv";
    link.click();
  };

  const handleExportExcel = () => {
    const rows = table.getRowModel().rows.map((row) => {
      const rowData: any = {};
      row.getVisibleCells().forEach((cell) => {
        rowData[cell?.column?.id] = cell.getValue();
      });
      return rowData;
    });
    const ws = XLSX.utils.json_to_sheet(rows);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
    XLSX.writeFile(wb, "table_export.xlsx");
  };

  const handleExportPDF = () => {
    const doc = new jsPDF();
    const headers = table
      .getVisibleLeafColumns()
      .map((column) => column.columnDef.header?.toString() || column.id);

    const data = table.getRowModel().rows.map((row) =>
      row.getVisibleCells().map((cell) => {
        const value = cell.getValue();
        return typeof value === "string" || typeof value === "number"
          ? value
          : JSON.stringify(value);
      })
    );

    doc.text("Table Export", 14, 16);

    autoTable(doc, {
      head: [headers],
      body: data,
      startY: 20,
      styles: {
        cellPadding: 2,
        fontSize: 10,
        valign: "middle",
        halign: "left",
      },
      headStyles: {
        fillColor: [41, 128, 185],
        textColor: 255,
        fontSize: 11,
        fontStyle: "bold",
      },
      alternateRowStyles: {
        fillColor: [245, 245, 245],
      },
    });

    doc.save("table_export.pdf");
  };

  const handlePrint = () => {
    const printContent = document.getElementById("table-container")?.innerHTML;
    const newWindow = window.open("", "", "width=800,height=600");
    newWindow?.document.write(`
      <html>
        <head>
          <title>Print</title>
          <style>
            body { font-family: Arial, sans-serif; }
            table { width: 100%; border-collapse: collapse; }
            th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
          </style>
        </head>
        <body>
          <h2>Table Print</h2>
          ${printContent}
        </body>
      </html>
    `);
    newWindow?.document.close();
    newWindow?.print();
  };

  return (
    <div className="flex space-x-4">
      <Button
        variant="outline"
        size="sm"
        className="h-8 lg:flex dark:text-gray-400 "
        onClick={handlePrint}
      >
        <Printer className="ml-auto mr-2 h-4 w-4 dark:text-gray-400 dark:border-gray-400" />
        Print
      </Button>
      {/* Export options dropdown */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" className=" ml-auto h-8 lg:flex dark:text-gray-400 dark:border-gray-400">
            <FileText className="mr-2 h-4 w-4" />
            Export
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          className="w-[200px] bg-white shadow-md border border-gray-200 dark:bg-gray-800"
        >
          <DropdownMenuLabel className="flex items-center text-[13px] gap-2  text-gray-600 dark:text-gray-400">
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
          <DropdownMenuLabel className="dark:text-gray-400">Toggle columns</DropdownMenuLabel>
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
                  {column.id.replace(/_/g, " ").replace(/\b\w/g, (char) => char.toUpperCase())}
              </DropdownMenuCheckboxItem>
            ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
