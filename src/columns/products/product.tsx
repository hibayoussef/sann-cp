import { DataTableColumnHeader } from "@/components/ui/table-data/data-table-column-header";
import { DataTableRowActions } from "@/components/ui/table-data/data-table-row-actions";
import { ColumnDef } from "@tanstack/react-table";
import type { IProduct } from "@/types/products/product";
import { productSchema } from "@/components/lib/validations/product";

export const productColumns = (permissions: {
  update: boolean;
  delete: boolean;
}): ColumnDef<IProduct>[] => [
  {
    id: "id",
    accessorKey: "id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="ID" />
    ),
    cell: ({ row }) => <div className="w-[80px]">{row.getValue("id")}</div>,
  },
  {
    id: "product_name_en",
    accessorKey: "product_name_en",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Product Name" />
    ),
    cell: ({ row }) => (
      <div className="font-medium">{row.getValue("product_name_en")}</div>
    ),
  },
  {
    id: "sku",
    accessorKey: "sku",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="SKU" />
    ),
    cell: ({ row }) => <div>{row.getValue("sku")}</div>,
  },
  // {
  //   id: "sale_price",
  //   accessorKey: "sale_price",
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title="Sale Price" />
  //   ),
  //   cell: ({ row }) => <div>{row.getValue("sale_price")}</div>,
  // },
  {
    id: "Actions",
    cell: ({ row }) => (
      <DataTableRowActions
        row={row}
        schema={productSchema}
        editItem={`/products/update/${row.original.id}`}
        onDelete={(id) => console.log(`Deleting product ID: ${id}`)}
        permissions={permissions}
      />
    ),
  },
];
