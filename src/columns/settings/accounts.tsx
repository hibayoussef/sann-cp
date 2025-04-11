import { accountSchema } from "@/components/lib/validations/account";
import { DataTableColumnHeader } from "@/components/ui/table-data/data-table-column-header";
import { DataTableRowActions } from "@/components/ui/table-data/data-table-row-actions";
import type { IAccount } from "@/types/settings/accounts";
import { ColumnDef } from "@tanstack/react-table";

export const accountColumns = (permissions: {
  update: boolean;
  delete: boolean;
}): ColumnDef<IAccount>[] => [
  {
    id: "account_name_en",
    accessorKey: "account_name_en",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Account Name" />
    ),
    cell: ({ row }) => (
      <div className="font-medium">{row.getValue("account_name_en")}</div>
    ),
  },
  {
    id: "account_code",
    accessorKey: "account_code",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Account Code" />
    ),
    cell: ({ row }) => <div>{row.getValue("account_code")}</div>,
  },
  {
    id: "account_type_en",
    accessorKey: "account_type_en",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Account Type" />
    ),
    cell: ({ row }) => <div>{row.getValue("account_type_en")}</div>,
  },
  {
    id: "Actions",
    cell: ({ row }) => (
      <DataTableRowActions
        row={row}
        schema={accountSchema}
        editItem={`/accounts/update/${row.original.id}`}
        onDelete={(id) => console.log(`Deleting account ID: ${id}`)}
        permissions={permissions}
      />
    ),
  },
];
