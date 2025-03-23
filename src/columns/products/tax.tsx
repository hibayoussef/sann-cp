import { DataTableColumnHeader } from "@/components/ui/table-data/data-table-column-header";
import { DataTableRowActions } from "@/components/ui/table-data/data-table-row-actions";
import { ColumnDef } from "@tanstack/react-table";
import { ITax } from "@/types/products/tax";
import { taxSchema } from "@/components/lib/validations/tax";

export const taxColumns = (permissions: {
  update: boolean;
  delete: boolean;
}): ColumnDef<ITax>[] => [
  {
    accessorKey: "id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="ID" />
    ),
    cell: ({ row }) => <div className="w-[80px]">{row.getValue("id")}</div>,
  },
  {
    accessorKey: "tax_name_en",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Tax Name" />
    ),
    cell: ({ row }) => (
      <div className="font-medium">{row.getValue("tax_name_en")}</div>
    ),
  },
  {
    accessorKey: "amount",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Amount" />
    ),
    cell: ({ row }) => (
      <div className="max-w-[500px] truncate">
        {row.getValue("amount")}
      </div>
    ),
  },
  {
    id: "Actions",
    // accessorKey: "Actions",
    cell: ({ row }) => (
      <DataTableRowActions
        row={row}
        schema={taxSchema}
        editItem={`/taxes/update/${row.original.id}`}
        onDelete={(id) => console.log(`Deleting Tax ID: ${id}`)}
        permissions={permissions}
      />
    ),
  },
];
