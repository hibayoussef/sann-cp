import { paymentTermSchema } from "@/components/lib/validations/paymentTerm";
import { DataTableColumnHeader } from "@/components/ui/table-data/data-table-column-header";
import { DataTableRowActions } from "@/components/ui/table-data/data-table-row-actions";
import type { IPaymentTerm } from "@/types/settings/payment_term";
import { ColumnDef } from "@tanstack/react-table";

export const paymentTermColumns = (permissions: {
  update: boolean;
  delete: boolean;
}): ColumnDef<IPaymentTerm>[] => [
  {
    id: "id",
    accessorKey: "id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="ID" />
    ),
    cell: ({ row }) => <div className="w-[60px]">{row.getValue("id")}</div>,
  },
  {
    id: "term_name_en",
    accessorKey: "term_name_en",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Term Name (EN)" />
    ),
    cell: ({ row }) => (
      <div className="font-medium">{row.getValue("term_name_en") ?? ""}</div>
    ),
  },
  {
    id: "term_name_ar",
    accessorKey: "term_name_ar",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Term Name (AR)" />
    ),
    cell: ({ row }) => (
      <div>{row.getValue("term_name_ar") ?? ""}</div>
    ),
  },
  {
    id: "number_of_days",
    accessorKey: "number_of_days",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Days" />
    ),
    cell: ({ row }) => <div>{row.getValue("number_of_days")}</div>,
  },
  {
    id: "organization_name_en",
    accessorKey: "organization_name_en",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Organization (EN)" />
    ),
    cell: ({ row }) => (
      <div className="text-sm text-gray-700">{row.getValue("organization_name_en") ?? "—"}</div>
    ),
  },
  {
    id: "Actions",
    cell: ({ row }) => (
      <DataTableRowActions
        row={row}
        schema={paymentTermSchema}
        editItem={`/settings/payment_terms/update/${row.original.id}`}
        onDelete={(id) => console.log(`Deleting payment term ID: ${id}`)}
        permissions={permissions}
      />
    ),
  },
];