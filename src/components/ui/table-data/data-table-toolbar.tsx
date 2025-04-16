import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { Table } from "@tanstack/react-table";
import { Plus, X } from "lucide-react";
import { useState } from "react";
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
  searchColumns?: string[]; 
}

export function DataTableToolbar<TData>({
  table,
  createPath,
  permissions,
  tableName,
  searchColumns,
}: DataTableToolbarProps<TData>) {
  const [searchValue, setSearchValue] = useState('');
  const navigate = useNavigate();

  // تحديد الأعمدة التي سيتم البحث فيها
  const availableColumns = searchColumns || 
    table.getAllLeafColumns()
      .filter(column => column.getCanFilter())
      .map(column => column.id);

  const isFiltered = table.getState().columnFilters.length > 0 || 
    table.getState().globalFilter;

  const handleSearchChange = (value: string) => {
    setSearchValue(value);
    
    if (availableColumns.length === 1) {
      // إذا كان هناك عمود واحد فقط، ابحث فيه مباشرة
      table.getColumn(availableColumns[0])?.setFilterValue(value);
    } else if (availableColumns.length > 1) {
      // إذا كان هناك عدة أعمدة، استخدم البحث العام
      table.setGlobalFilter(value);
    }
  };

  const resetFilters = () => {
    table.resetColumnFilters();
    table.resetGlobalFilter();
    setSearchValue('');
  };

  return (
    <div className="flex items-center justify-between flex-wrap space-y-2 md:space-y-0 md:flex-nowrap">
      <div className="flex flex-1 items-center space-x-2 dark:text-gray-400">
        {availableColumns.length > 0 && (
          <>
            <Input
              placeholder="Filter tasks..."
              value={searchValue}
              onChange={(event) => handleSearchChange(event.target.value)}
              className="h-8 w-[200px] lg:w-[250px]"
            />
          </>
        )}

        {isFiltered && (
          <Button
            variant="ghost"
            onClick={resetFilters}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <X className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>

      <div className="flex items-center space-x-2">
        <DataTableViewOptions table={table} tableName={tableName} />
        
        {permissions?.create && (
          <Button
            variant="outline"
            className="h-8 px-2 lg:px-3 bg-[#465FFF] text-white dark:text-gray-100"
            onClick={() => navigate(createPath)}
          >
            <Plus /> Create
          </Button>
        )}
      </div>
    </div>
  );
}