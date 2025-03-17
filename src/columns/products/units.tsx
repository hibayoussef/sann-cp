import { DataTableColumnHeader } from "@/components/ui/table-data/data-table-column-header";
import { DataTableRowActions } from "@/components/ui/table-data/data-table-row-actions";
import { ColumnDef } from "@tanstack/react-table";
import { unitSchema } from "@/components/lib/validations/unit";
import type { IUnit } from "@/types/products/unit";

export const unitColumns: ColumnDef<IUnit>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="ID" />
    ),
    cell: ({ row }) => <div className="w-[80px]">{row.getValue("id")}</div>,
  },
  {
    accessorKey: "unit_name_en",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Unit Name" />
    ),
    cell: ({ row }) => (
      <div className="font-medium">{row.getValue("unit_name_en")}</div>
    ),
  },
  {
    accessorKey: "short_name_en",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Short Name" />
    ),
    cell: ({ row }) => (
      <div className="font-medium">{row.getValue("short_name_en")}</div>
    ),
  },
  {
    accessorKey: "multiplier",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Multiplier" />
    ),
    cell: ({ row }) => (
      <div className="font-medium">{row.getValue("multiplier")}</div>
    ),
  },
  {
    accessorKey: "sub_units",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Subunits" />
    ),
    cell: ({ row }) => {
      const subUnits = row.getValue("sub_units") as Array<any>;

      return subUnits.length > 0 ? (
        <ul className="list-disc ml-4">
          {subUnits.map((sub, index) => (
            <li key={index} className="text-sm">
              {sub.unit_name_en} ({sub.short_name_en}) - Multiplier:{" "}
              {sub.multiplier}
            </li>
          ))}
        </ul>
      ) : (
        <span className="text-gray-400 text-sm">No Subunits</span>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => (
      <DataTableRowActions
        row={row}
        schema={unitSchema}
        editItem={`/units/update/${row.original.id}`}
      />
    ),
  },
];
