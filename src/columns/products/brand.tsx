import { brandSchema } from "@/components/lib/validations/brand";
import { DataTableColumnHeader } from "@/components/ui/table-data/data-table-column-header";
import { DataTableRowActions } from "@/components/ui/table-data/data-table-row-actions";
import type { IBrand } from "@/types/products/brand";
import { ColumnDef } from "@tanstack/react-table";

export const brandColumns = (permissions: {
  update: boolean;
  delete: boolean;
}): ColumnDef<IBrand>[] => [
{
    id: "id",
    accessorKey: "id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="ID" />
    ),
    cell: ({ row }) => <div className="w-[80px]">{row.getValue("id")}</div>,
  },
  {
    id: "brand_name_en",
    accessorKey: "brand_name_en",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Brand Name" />
    ),
    cell: ({ row }) => (
      <div className="font-medium">{row.getValue("brand_name_en")}</div>
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
    id: "Actions",
    // accessorKey: "Actions",
    cell: ({ row }) => (
      <DataTableRowActions
        row={row}
        schema={brandSchema}
        editItem={`/brands/update/${row.original.id}`}
        onDelete={(id) => console.log(`Deleting category ID: ${id}`)}
        permissions={permissions}
      />
    ),
  },
];
