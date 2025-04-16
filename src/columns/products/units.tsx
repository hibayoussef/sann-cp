import { unitSchema } from "@/components/lib/validations/unit";
import { DataTableColumnHeader } from "@/components/ui/table-data/data-table-column-header";
import { DataTableRowActions } from "@/components/ui/table-data/data-table-row-actions";
import type { IUnit } from "@/types/products/unit";
import { ColumnDef } from "@tanstack/react-table";
import { t } from "i18next";

export const unitColumns = (permissions?: {
  update: boolean;
  delete: boolean;
}): ColumnDef<IUnit>[] => [
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
  // {
  //   id: "sub_units",
  //   accessorKey: "sub_units",
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title={t("items:sub_units")} />
  //   ),
  //   cell: ({ row }) => {
  //     const subUnits = row.getValue("sub_units") as Array<any>;
  //     return subUnits?.length > 0 ? (
  //       <ul className="list-disc ml-4">
  //         {subUnits.map((sub, index) => (
  //           <li key={index} className="text-sm">
  //             {sub?.unit_name_en} ({sub?.short_name_en}) - {t("items:multiplier")}: {sub?.multiplier}
  //           </li>
  //         ))}
  //       </ul>
  //     ) : (
  //       <span className="text-gray-400 text-sm">{t("items:no_sub_units")}</span>
  //     );
  //   },
  // },
  {
    id: "actions",
    cell: ({ row }) => (
      <DataTableRowActions
        row={row}
        schema={unitSchema}
        // viewDetails={`/units/${row.original.id}`}
        editItem={`/units/update/${row.original.id}`}
        onDelete={(id) => console.log(`Deleting unit ID: ${id}`)}
        permissions={permissions}
      />
    ),
  },
];