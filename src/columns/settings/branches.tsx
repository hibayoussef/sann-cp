import { branchSchema } from "@/components/lib/validations/branch";
import { DataTableColumnHeader } from "@/components/ui/table-data/data-table-column-header";
import { DataTableRowActions } from "@/components/ui/table-data/data-table-row-actions";
import type { IBranch } from "@/types/settings/branches";
import { ColumnDef } from "@tanstack/react-table";

export const branchColumns = (permissions: {
  update: boolean;
  delete: boolean;
}): ColumnDef<IBranch>[] => [
  {
    id: "id",
    accessorKey: "id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="ID" />
    ),
    cell: ({ row }) => <div className="w-[80px]">{row.getValue("id")}</div>,
  },
  {
    id: "branch_name_en",
    accessorKey: "branch_name_en",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Branch Name (EN)" />
    ),
    cell: ({ row }) => (
      <div className="font-medium">{row.getValue("branch_name_en")}</div>
    ),
  },
  {
    id: "email",
    accessorKey: "email",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Email" />
    ),
    cell: ({ row }) => (
      <div className="max-w-[300px] truncate">{row.getValue("email")}</div>
    ),
  },
  {
    id: "mobile",
    accessorKey: "mobile",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Mobile" />
    ),
    cell: ({ row }) => (
      <div>{row.getValue("mobile") ? row.getValue("mobile") : "N/A"}</div>
    ),
  },
  {
    id: "website",
    accessorKey: "website",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Website" />
    ),
    cell: ({ row }) => (
      <div>{row.getValue("website") ? row.getValue("website") : "N/A"}</div>
    ),
  },
  {
    id: "Actions",
    cell: ({ row }) => (
      <DataTableRowActions
        row={row}
        schema={branchSchema}
        editItem={`/branches/update/${row.original.id}`}
        onDelete={(id) => console.log(`Deleting branch ID: ${id}`)}
      />
    ),
  },
];
