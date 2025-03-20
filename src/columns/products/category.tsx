import { categorySchema } from "@/components/lib/validations/category";
import { DataTableColumnHeader } from "@/components/ui/table-data/data-table-column-header";
import { DataTableRowActions } from "@/components/ui/table-data/data-table-row-actions";
import type { ICategory } from "@/types/products/categories";
import { ColumnDef } from "@tanstack/react-table";
import { t } from "i18next";

export const categoryColumns = (permissions: { update: boolean; delete: boolean }): ColumnDef<ICategory>[] => [
  {
    id: "id",
    accessorKey: "id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={t("items:id")} />
    ),
    cell: ({ row }) => <div className="w-[80px]">{row.getValue("id")}</div>,
  },
  {
    id: "category_name_en",
    accessorKey: "category_name_en",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={t("items:name")} />
    ),
    cell: ({ row }) => <div className="font-lg">{row.getValue("category_name_en")}</div>,
  },
  {
    id: "actions",
    cell: ({ row }) => (
      <DataTableRowActions
        row={row}
        schema={categorySchema}
        viewDetails={`/categories/${row.original.id}`}
        editItem={`/categories/update/${row.original.id}`}
        onDelete={(id) => console.log(`Deleting category ID: ${id}`)}
        permissions={permissions}
      />
    ),
  },
];
