import { categorySchema } from "@/components/lib/validations/category";
import { DataTableColumnHeader } from "@/components/ui/table-data/data-table-column-header";
import { DataTableRowActions } from "@/components/ui/table-data/data-table-row-actions";
import type { ICategory } from "@/types/products/categories";
import { ColumnDef } from "@tanstack/react-table";

export const categoryColumns: ColumnDef<ICategory>[] = [
  {
    id: "id",
    accessorKey: "id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="ID" />
    ),
    cell: ({ row }) => <div className="w-[80px]">{row.getValue("id")}</div>,
    enableSorting: true,
    enableHiding: false,
  },
  {
    id: "category_name_en",
    accessorKey: "category_name_en",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    cell: ({ row }) => (
      <div className="font-lg">{row.getValue("category_name_en")}</div>
    ),
  },
  {
    id: "description_en",
    accessorKey: "description_en",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Description" />
    ),
    cell: ({ row }) => (
      <div className="max-w-[500px] truncate">
        {row.getValue("description_en")}
      </div>
    ),
  },
  {
    id: "code",
    accessorKey: "code",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Code" />
    ),
    cell: ({ row }) => (
      <div className="max-w-[500px] truncate">{row.getValue("code")}</div>
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => (
      <DataTableRowActions
        row={row}
        schema={categorySchema}
        viewDetails={`/categories/${row.original.id}`}
        editItem={`/categories/update/${row.original.id}`}
      />
    ),
  },
];
