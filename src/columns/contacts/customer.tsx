import { customerSchema } from "@/components/lib/validations/customer";
import { DataTableColumnHeader } from "@/components/ui/table-data/data-table-column-header";
import { DataTableRowActions } from "@/components/ui/table-data/data-table-row-actions";
import type { ColumnDef } from "@tanstack/react-table";
import { t } from "i18next";

export const customerColumns = (permissions?: {
  update: boolean;
  delete: boolean;
}): ColumnDef<any>[] => [
  {
    id: "id",
    accessorKey: "id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={t("items:id")} />
    ),
    cell: ({ row }) => <div className="w-[80px]">{row.getValue("id")}</div>,
  },
  {
    id: "full_name_en",
    accessorKey: "full_name_en",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="full name" />
    ),
    cell: ({ row }) => (
      <div className="font-lg">{row.getValue("full_name_en")}</div>
    ),
  },
  {
    id: "email",
    accessorKey: "email",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="email" />
    ),
    cell: ({ row }) => <div className="font-lg">{row.getValue("email")}</div>,
  },
  {
    id: "mobile",
    accessorKey: "mobile",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="mobile" />
    ),
    cell: ({ row }) => <div className="font-lg">{row.getValue("mobile")}</div>,
  },
  {
    id: "branch_name_en",
    accessorKey: "branch_name_en",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="branch name" />
    ),
    cell: ({ row }) => (
      <div className="font-lg">{row.getValue("branch_name_en")}</div>
    ),
  },
  {
    id: "Actions",
    cell: ({ row }) => (
      <DataTableRowActions
        row={row}
        schema={customerSchema}
        // viewDetails={`/contacts/${row.original.id}`}
        editItem={`/customers/update/${row.original.id}`}
        onDelete={(id) => console.log(`Deleting contact ID: ${id}`)}
        permissions={permissions}
      />
    ),
  },
];