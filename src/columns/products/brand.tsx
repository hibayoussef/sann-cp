import { DataTableColumnHeader } from "@/components/ui/table-data/data-table-column-header";
import { DataTableRowActions } from "@/components/ui/table-data/data-table-row-actions";
import { ColumnDef } from "@tanstack/react-table";
import { brandSchema } from "@/components/lib/validations/brand";
import type { IBrand } from "@/types/products/brand";

export const brandColumns: ColumnDef<IBrand>[] = [
  {
    id: "Id",
    accessorKey: "id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="ID" />
    ),
    cell: ({ row }) => <div className="w-[80px]">{row.getValue("id")}</div>,
  },
  {
    id: "Brand Name",
    accessorKey: "brand_name_en",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Brand Name" />
    ),
    cell: ({ row }) => (
      <div className="font-medium">{row.getValue("brand_name_en")}</div>
    ),
  },
  {
    id: "Description",
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
    id: "Actions",
    accessorKey: "Actions",
    cell: ({ row }) => (
      <DataTableRowActions
        row={row}
        schema={brandSchema}
        editItem={`/brands/update/${row.original.id}`}
      />
    ),
  },
];
