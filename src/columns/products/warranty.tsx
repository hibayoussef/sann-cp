
import { DataTableColumnHeader } from "@/components/ui/table-data/data-table-column-header";
import { DataTableRowActions } from "@/components/ui/table-data/data-table-row-actions";
import { ColumnDef } from "@tanstack/react-table";
import { IWarranty } from "@/types/products/warranty";
import { warrantySchema } from "@/components/lib/validations/warranty";

export const warrantyColumns = (permissions: {
  update: boolean;
  delete: boolean;
}): ColumnDef<IWarranty>[] => [
  {
    id: "id",
    accessorKey: "id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="ID" />
    ),
    cell: ({ row }) => <div className="w-[80px]">{row.getValue("id")}</div>,
  },
 
  {
    accessorKey: "warranty_name_en",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Warranty Name" />
    ),
    cell: ({ row }) => (
      <div className="font-medium">{row.getValue("warranty_name_en")}</div>
    ),
  },
  {
    accessorKey: "duration",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Duration" />
    ),
    cell: ({ row }) => (
      <div className="max-w-[500px] truncate">
        {row.getValue("duration")}
      </div>
    ),
    },
  {
    accessorKey: "duration_type",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Duration Type" />
    ),
    cell: ({ row }) => (
      <div className="max-w-[500px] truncate">
        {row.getValue("duration_type")}
      </div>
    ),
  },
  {
    id: "Actions",
    // accessorKey: "Actions",
    cell: ({ row }) => (
      <DataTableRowActions
        row={row}
        schema={warrantySchema}
        editItem={`/warranties/update/${row.original.id}`}
        onDelete={(id) => console.log(`Deleting Warranty ID: ${id}`)}
        permissions={permissions}
      />
    ),
  },
];
