import { subCategorySchema } from "@/components/lib/validations/subCategory";
import { DataTableColumnHeader } from "@/components/ui/table-data/data-table-column-header";
import { DataTableRowActions } from "@/components/ui/table-data/data-table-row-actions";
import type { ISubCategory } from "@/types/products/subCategory";
import { ColumnDef } from "@tanstack/react-table";

  export const subCategoryColumns = (permissions: {
    update: boolean;
    delete: boolean;
  }): ColumnDef<ISubCategory>[] => [
  {
    id: "id",
    accessorKey: "id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="ID" />
    ),
    cell: ({ row }) => <div className="w-[80px]">{row.getValue("id")}</div>,
    enableSorting: true,
    enableHiding: false,
  },
  {
    id: "sub_category_name_en",
    accessorKey: "sub_category_name_en",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    cell: ({ row }) => (
      <div className="font-medium">{row.getValue("sub_category_name_en")}</div>
    ),
  },
  {
    id: "description_en",
    accessorKey: "description_en",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Description" />
    ),
    cell: ({ row }) => (
      <div className="max-w-[500px] truncate">
        {row.getValue("description_en")}
      </div>
    ),
  },
  {
    id: "Actions",
    cell: ({ row }) => (
      <DataTableRowActions
        row={row}
        schema={subCategorySchema}
        editItem={`/sub-categories/update/${row.original.id}`}
        onDelete={(id) => console.log(`Deleting category ID: ${id}`)}
        permissions={permissions}
      />
    ),
  },
];
