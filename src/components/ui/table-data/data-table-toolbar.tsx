import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { Table } from "@tanstack/react-table";
import { Plus, X } from "lucide-react";
import { useNavigate } from "react-router";
import { DataTableViewOptions } from "./data-table-view-options";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  tableName?: string;
  createPath: string;
  permissions?: {
    create: boolean;
    update: boolean;
    delete: boolean;
  };
}

export function DataTableToolbar<TData>({
  table,
  createPath,
  permissions,
  tableName,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-between flex-wrap space-y-2 md:space-y-0 md:flex-nowrap ">
      <div className="flex flex-1 items-center space-x-2  dark:text-gray-400">
        <Input
          placeholder="Filter tasks..."
          value={
            (table.getColumn("brand_name_en")?.getFilterValue() as string) ?? ""
          }
          onChange={(event) =>
            table.getColumn("brand_name_en")?.setFilterValue(event.target.value)
          }
          className="h-8 w-[200px] lg:w-[250px]"
        />
        {/* {table.getColumn("status") && (
          <DataTableFacetedFilter
            column={table.getColumn("status")}
            title="Status"
            options={status_options}
          />
        )}
        {table.getColumn("priority") && (
          <DataTableFacetedFilter
            column={table.getColumn("priority")}
            title="Priority"
            options={priority_options}
          />
        )} */}
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <X className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>

      <DataTableViewOptions table={table} tableName={tableName} />
      <div>
        {permissions?.create && (
          <Button
            variant="outline"
            className="h-8 px-2 ml-4 lg:px-3 bg-[#465FFF] text-white  dark:text-gray-100"
            onClick={() => navigate(createPath)}
          >
            <Plus /> Create
          </Button>
        )}
      </div>
    </div>
  );
}
