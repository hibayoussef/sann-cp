import { type Table } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";

interface DataTablePaginationProps<TData> {
  table: Table<TData>;
  pageSizeOptions?: number[];
}

export function DataTablePagination<TData>({
  table,
  pageSizeOptions = [10, 25, 50, 75, 100, 500],
}: DataTablePaginationProps<TData>) {
  return (
    <div className="relative flex flex-col space-y-2 md:space-y-0 md:flex-row items-center justify-between px-2">
      <div className="flex-1 text-sm text-muted-foreground dark:text-gray-400">
        {table.getFilteredSelectedRowModel().rows.length} of{" "}
        {table.getFilteredRowModel().rows.length} row(s) selected.
      </div>

      <div className="absolute left-1/2 transform -translate-x-1/2">
        <div className="flex space-y-15 md:space-y-0 items-center justify-center space-x-2">
          <Button
            variant="outline"
            className="hidden h-8 w-8 p-0 lg:flex"
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
          >
            <span className="sr-only dark:text-gray-400">Go to first page</span>
            <ChevronsLeft className="h-4 w-4 dark:text-gray-400" />
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <span className="sr-only dark:text-gray-400">
              Go to previous page
            </span>
            <ChevronLeft className="h-4 w-4 dark:text-gray-400" />
          </Button>
          <div className="flex space-x-1 dark:text-gray-400">
            {Array.from({ length: table.getPageCount() }, (_, index) => (
              <button
                key={index}
                onClick={() => table.setPageIndex(index)}
                className={`h-8 w-8 flex items-center justify-center dark:text-gray-400 rounded-md text-sm font-medium 
                  ${
                    table.getState().pagination.pageIndex === index
                      ? "bg-blue-500 text-white dark:text-gray-400"
                      : "hover:bg-gray-200"
                  }`}
              >
                {index + 1}
              </button>
            ))}
          </div>

          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <span className="sr-only dark:text-gray-400">Go to next page</span>
            <ChevronRight className="h-4 w-4 dark:text-gray-400" />
          </Button>
          <Button
            variant="outline"
            className="hidden h-8 w-8 p-0 lg:flex"
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
          >
            <span className="sr-only dark:text-gray-400">Go to last page</span>
            <ChevronsRight className="h-4 w-4 dark:text-gray-400" />
          </Button>
        </div>
      </div>

      <div className="flex flex-col space-y-11 md:space-y-0 md:flex-row justify-center items-center space-x-6 lg:space-x-8">
        <div className="flex items-center space-x-2 dark:text-gray-400">
          <p className="text-sm font-medium dark:text-gray-400">
            Rows per page
          </p>
          <Select
            value={`${table.getState().pagination.pageSize}`}
            onValueChange={(value) => {
              table.setPageSize(Number(value));
            }}
          >
            <SelectTrigger className="h-8 w-[70px]">
              <SelectValue placeholder={table.getState().pagination.pageSize} />
            </SelectTrigger>
            <SelectContent
              side="top"
              className="dark:bg-gray-800 dark:text-gray-400"
            >
              {pageSizeOptions.map((pageSize) => (
                <SelectItem key={pageSize} value={`${pageSize}`}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="hidden sm:flex w-[100px] items-center justify-center text-sm font-medium dark:text-gray-400">
          Page {table.getState().pagination.pageIndex + 1} of{" "}
          {table.getPageCount()}
        </div>
      </div>
    </div>
  );
}
