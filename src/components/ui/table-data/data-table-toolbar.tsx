import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { Table } from "@tanstack/react-table";
import { Plus, Search, X } from "lucide-react";
import { useNavigate } from "react-router";
import { DataTableViewOptions } from "./data-table-view-options";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
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
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <div className="relative">
          <Search className="absolute left-2 top-2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Filter categories..."
            value={
              (table.getColumn("Brand Name")?.getFilterValue() as string) || ""
            }
            onChange={(event) =>
              table.getColumn("Brand Name")?.setFilterValue(event.target.value)
            }
            className="h-8 w-[150px] pl-8 transition-all duration-500 ease-in-out 
              focus:w-[250px] lg:w-[250px] lg:focus:w-[350px]"
          />
        </div>
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

      <DataTableViewOptions table={table} />
      <div>
        {permissions?.create && (
          <Button
            variant="outline"
            className="h-8 px-2 ml-4 lg:px-3 bg-[#465FFF] text-white"
            onClick={() => navigate(createPath)}
          >
            <Plus /> Create
          </Button>
        )}
      </div>
    </div>
  );
}
