import { unitSchema } from "@/components/lib/validations/unit";
import { DataTableColumnHeader } from "@/components/ui/table-data/data-table-column-header";
import { DataTableRowActions } from "@/components/ui/table-data/data-table-row-actions";
import type { ISubUnit } from "@/types/products/unit";
import { ColumnDef } from "@tanstack/react-table";
import { t } from "i18next";

export const subUnitColumns = (permissions?: {
  update: boolean;
  delete: boolean;
}): ColumnDef<ISubUnit>[] => [
  {
    id: "id",
    accessorKey: "id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={t("items:id")} />
    ),
    cell: ({ row }) => <div className="w-[80px]">{row.getValue("id")}</div>,
  },
  {
    id: "unit_name_en",
    accessorKey: "unit_name_en",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={t("items:name")} />
    ),
    cell: ({ row }) => (
      <div className="font-lg">{row.getValue("unit_name_en")}</div>
    ),
  },
  {
    id: "short_name_en",
    accessorKey: "short_name_en",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={t("items:short_name")} />
    ),
    cell: ({ row }) => (
      <div className="font-lg">{row.getValue("short_name_en")}</div>
    ),
  },
  {
    id: "multiplier",
    accessorKey: "multiplier",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={t("items:multiplier")} />
    ),
    cell: ({ row }) => (
      <div className="font-lg">{row.getValue("multiplier")}</div>
    ),
  },
  {
    id: "allow_decimal",
    accessorKey: "allow_decimal",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="allow decimal" />
    ),
    cell: ({ row }) => (
      <div className="font-lg">{row.getValue("allow_decimal") ? t("items:yes") : t("items:no")}</div>
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => (
      <DataTableRowActions
        row={row}
        schema={unitSchema}
        // viewDetails={`/sub-units/${row.original.id}`}
        editItem={`/sub-units/update/${row.original.id}`}
        onDelete={(id) => console.log(`Deleting sub-unit ID: ${id}`)}
        permissions={permissions}
      />
    ),
  },
];