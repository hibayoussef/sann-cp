import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import * as React from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { ICategory } from "@/types/products/categories";
import { useNavigate } from "react-router";
import { CustomizeColumnsModal } from "./customize-columns-modal";
import { DataTablePagination } from "./data-table-pagination";
import { DataTableToolbar } from "./data-table-toolbar";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  createPath: string;
  hasDetails?: boolean;
  detailsLink?: string;
  permissions?: {
    create: boolean;
    update: boolean;
    delete: boolean;
  };
}

export function DataTable<TData, TValue>({
  columns,
  data,
  createPath,
  hasDetails,
  detailsLink,
  permissions,
}: DataTableProps<TData, TValue>) {
  const [tableColumns, setTableColumns] = React.useState<any>(columns);

  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});

  const [rowSelection, setRowSelection] = React.useState({});
  const table = useReactTable({
    data,
    columns: tableColumns,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
    },
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  });

  const navigate = useNavigate();

  return (
    <div className="space-y-4">
      <DataTableToolbar
        table={table}
        createPath={createPath}
        permissions={permissions}
      />
      <div className="rounded-md border  border-gray-100 shadow-md bg-white dark:border-gray-700 dark:bg-gray-900">
        <Table id="table-container">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                <TableHead colSpan={1} className="w-fit px-0 absolute top-1 ">
                  <CustomizeColumnsModal
                    setColumns={setTableColumns}
                    table={table}
                  />
                </TableHead>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => {
                return (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                    onClick={() => {
                      const id = (row.original as ICategory)?.id;
                      if (hasDetails && id) {
                        navigate(`${detailsLink}/${id}`);
                      }
                    }}
                    className="cursor-pointer hover:bg-gray-50 active:bg-gray-100 transition-colors"
                  >
                    <TableHead
                      colSpan={1}
                      className="w-fit px-0 absolute top-1"
                    >
                      {/* <CustomizeColumnsModal
                        setColumns={setTableColumns}
                        table={table}
                      /> */}
                    </TableHead>
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <DataTablePagination table={table} />
    </div>
  );
}
