import { useMemo, useRef, useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import * as XLSX from "xlsx";
import { AllCommunityModule, ColDef, ModuleRegistry } from "ag-grid-community";
import { ExportIcon } from "../../../icons";
import { FaPlus } from "react-icons/fa";

ModuleRegistry.registerModules([AllCommunityModule]);

interface TableProps<T> {
  rowData: T[];
  columnDefs: ColDef<T>[];
}

const ActionCellRenderer = (props: any) => {
  const handleUpdate = () => {
    console.log("Update row with ID:", props.data.id);
    // تنفيذ منطق التحديث هنا
  };

  const handleDelete = () => {
    console.log("Delete row with ID:", props.data.id);
    // تنفيذ منطق الحذف هنا
  };

  const handleDetails = () => {
    console.log("Details for row with ID:", props.data.id);
    // تنفيذ منطق التفاصيل هنا
  };

  return (
    <div>
      <button onClick={handleUpdate}>Update</button>
      <button onClick={handleDelete}>Delete</button>
      <button onClick={handleDetails}>Details</button>
    </div>
  );
};

const Table = <T,>({ rowData, columnDefs }: TableProps<T>) => {
  const gridRef = useRef<AgGridReact<T>>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [visibleColumns, setVisibleColumns] = useState(
    columnDefs.map((col) => col.field as string)
  );

  const defaultColDef: ColDef = {
    flex: 1,
    minWidth: 100,
    resizable: true,
    sortable: true,
    filter: true,
  };

  const exportToExcel = () => {
    const rowData: any[] = [];
    gridRef.current?.api.forEachNode((node) => {
      const filteredData = Object.fromEntries(
        Object.entries(node?.data || {}).filter(([key]) =>
          visibleColumns.includes(key)
        )
      );
      rowData.push(filteredData);
    });

    const worksheet = XLSX.utils.json_to_sheet(rowData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    XLSX.writeFile(workbook, "table_data.xlsx");
  };

  const printTable = () => {
    if (!gridRef.current) return;

    const headerRow = visibleColumns
      .map(
        (col) =>
          `<th>${
            columnDefs.find((c) => c.field === col)?.headerName || col
          }</th>`
      )
      .join("");

    const bodyRows = rowData
      .map((row: any) => {
        const rowDataHtml = visibleColumns
          .map((col) => `<td>${row[col] ?? ""}</td>`)
          .join("");
        return `<tr>${rowDataHtml}</tr>`;
      })
      .join("");

    const printWindow = window.open("", "", "width=800,height=600");
    if (printWindow) {
      printWindow.document.write(`
        <html>
        <head>
          <title>Print Table</title>
          <style>
            table { width: 100%; border-collapse: collapse; }
            th, td { border: 1px solid black; padding: 8px; text-align: left; }
          </style>
        </head>
        <body>
          <table>
            <thead><tr>${headerRow}</tr></thead>
            <tbody>${bodyRows}</tbody>
          </table>
          <script>
            window.onload = function() {
              window.print();
              window.close();
            };
          </script>
        </body>
        </html>
      `);
      printWindow.document.close();
    }
  };

  const toggleColumnVisibility = (field: string) => {
    setVisibleColumns((prev) =>
      prev.includes(field)
        ? prev.filter((col) => col !== field)
        : [...prev, field]
    );
  };

  const filteredColumnDefs = useMemo(
    () =>
      columnDefs.filter((col) => visibleColumns.includes(col.field as string)),
    [columnDefs, visibleColumns]
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };

    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuOpen]);

  return (
    <div className="w-full p-4">
      <div className="flex gap-2 justify-end mb-2 relative">
        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setMenuOpen((prev) => !prev)}
            className="px-4 py-2 bg-gray-500 text-white rounded flex items-center gap-2 cursor-pointer transition duration-300 hover:bg-gray-600"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-5 h-5"
            >
              <path
                fillRule="evenodd"
                d="M4 6h16M4 12h16m-7 6h7"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Manage Columns
          </button>

          {menuOpen && (
            <div className="absolute left-0 mt-2 bg-white border rounded shadow-md p-2 w-48 z-10">
              {columnDefs.map((col) => (
                <label
                  key={col.field}
                  className="flex items-center gap-2 px-2 py-1 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={visibleColumns.includes(col.field as string)}
                    onChange={() => toggleColumnVisibility(col.field as string)}
                  />
                  {col.headerName}
                </label>
              ))}
            </div>
          )}
        </div>
        <button
          onClick={exportToExcel}
          className="p-1.5 bg-[#474ca1] text-white rounded-md flex items-center justify-center gap-2 cursor-pointer transition duration-300 hover:bg-[#474ca1]"
          title="Export to Excel"
        >
          <ExportIcon className="w-7 h-7" />
          Export
        </button>

        <button
          onClick={printTable}
          className="p-1.5 bg-[#474ca1] text-white rounded-md flex items-center justify-center gap-2  cursor-pointer transition duration-300 hover:bg-[#474ca1]"
          title="طباعة الجدول"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            fill="#ffff"
            height="20px"
            width="20px"
            version="1.1"
            id="Layer_1"
            viewBox="0 0 64 64"
            enable-background="new 0 0 64 64"
            xmlSpace="preserve"
            stroke="#ffff"
            stroke-width="2.944"
          >
            <g id="SVGRepo_bgCarrier" stroke-width="0" />

            <g
              id="SVGRepo_tracerCarrier"
              stroke-linecap="round"
              stroke-linejoin="round"
            />

            <g id="SVGRepo_iconCarrier">
              {" "}
              <g id="Printer">
                {" "}
                <path d="M57.7881012,14.03125H52.5v-8.0625c0-2.2091999-1.7909012-4-4-4h-33c-2.2091999,0-4,1.7908001-4,4v8.0625H6.2119002 C2.7871001,14.03125,0,16.8183498,0,20.2431507V46.513649c0,3.4248009,2.7871001,6.2119026,6.2119002,6.2119026h2.3798995 c0.5527,0,1-0.4472008,1-1c0-0.5527-0.4473-1-1-1H6.2119002C3.8896,50.7255516,2,48.8359489,2,46.513649V20.2431507 c0-2.3223,1.8896-4.2119007,4.2119002-4.2119007h51.5762024C60.1102982,16.03125,62,17.9208508,62,20.2431507V46.513649 c0,2.3223-1.8897018,4.2119026-4.2118988,4.2119026H56c-0.5527992,0-1,0.4473-1,1c0,0.5527992,0.4472008,1,1,1h1.7881012 C61.2128983,52.7255516,64,49.9384499,64,46.513649V20.2431507C64,16.8183498,61.2128983,14.03125,57.7881012,14.03125z M13.5,5.96875c0-1.1027999,0.8971996-2,2-2h33c1.1027985,0,2,0.8972001,2,2v8h-37V5.96875z" />{" "}
                <path d="M44,45.0322495H20c-0.5517998,0-0.9990005,0.4472008-0.9990005,0.9990005S19.4482002,47.0302505,20,47.0302505h24 c0.5517006,0,0.9990005-0.4472008,0.9990005-0.9990005S44.5517006,45.0322495,44,45.0322495z" />{" "}
                <path d="M44,52.0322495H20c-0.5517998,0-0.9990005,0.4472008-0.9990005,0.9990005S19.4482002,54.0302505,20,54.0302505h24 c0.5517006,0,0.9990005-0.4472008,0.9990005-0.9990005S44.5517006,52.0322495,44,52.0322495z" />{" "}
                <circle cx="7.9590998" cy="21.8405495" r="2" />{" "}
                <circle cx="14.2856998" cy="21.8405495" r="2" />{" "}
                <circle cx="20.6121998" cy="21.8405495" r="2" />{" "}
                <path d="M11,62.03125h42v-26H11V62.03125z M13.4036999,38.4349518h37.1925964v21.1925964H13.4036999V38.4349518z" />{" "}
              </g>{" "}
            </g>
          </svg>
          Print
        </button>
      </div>

      <div className="flex gap-2 justify-start mb-2 relative">
        <button
          // onClick={onCreate}
          className="px-4 py-2  text-white text-sm font-medium rounded-lg hover:bg-[#575db1] flex items-center gap-2"
        >
          <FaPlus className="text-white" /> Create
        </button>
      </div>
      {/* Table */}
      <div className="ag-theme-alpine w-full h-[500px]">
        <AgGridReact<T>
          ref={gridRef}
          rowData={rowData}
          columnDefs={filteredColumnDefs}
          defaultColDef={defaultColDef}
          // frameworkComponents={{ actionCellRenderer: ActionCellRenderer }}
          pagination={true}
          paginationPageSize={10}
          domLayout="autoHeight"
        />
      </div>
    </div>
  );
};

export default Table;
