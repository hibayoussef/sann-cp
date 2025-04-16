
import { mapsettingSchema } from "@/components/lib/validations/mapSetting";
import { DataTableColumnHeader } from "@/components/ui/table-data/data-table-column-header";
import { DataTableRowActions } from "@/components/ui/table-data/data-table-row-actions";
import { IMapSetting } from "@/types/settings/map_setting";



import { ColumnDef } from "@tanstack/react-table";

export const mapSettingsColumns = (permissions: {
  update: boolean;
  delete: boolean;
}): ColumnDef<IMapSetting>[] => [
  {
    id: "id",
    accessorKey: "id",
    header: ({ column }) => <DataTableColumnHeader column={column} title="ID" />,
    cell: ({ row }) => <div className="w-[80px]">{row.getValue("id")}</div>,
  },
 
  {
    id: "branch_name_en",
    accessorKey: "branch_name_en",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Branch Name" />
    ),
    cell: ({ row }) => (
      <div className="font-medium">{row.getValue("branch_name_en")}</div>
    ),
  },
  {
    id: "customer_account_name_en",
    accessorKey: "customer_account_name_en",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Customer Account Name" />
    ),
    cell: ({ row }) => (
      <div>{row.getValue("customer_account_name_en")}</div>
    ),
  },
  {
    id: "vendor_account_name_en",
    accessorKey: "vendor_account_name_en",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Vendor Account Name" />
    ),
    cell: ({ row }) => (
      <div>{row.getValue("vendor_account_name_en")}</div>
    ),
  },
  {
    id: "employee_account_name_en",
    accessorKey: "employee_account_name_en",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Employee Account Name" />
    ),
    cell: ({ row }) => (
      <div>{row.getValue("employee_account_name_en")}</div>
    ),
  },
  // {
  //   id: "sale_account_name_en",
  //   accessorKey: "sale_account_name_en",
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title="Sale Account Name (EN)" />
  //   ),
  //   cell: ({ row }) => (
  //     <div>{row.getValue("sale_account_name_en")}</div>
  //   ),
  // },
  // {
  //   id: "sale_return_account_name_en",
  //   accessorKey: "sale_return_account_name_en",
  //   header: ({ column }) => (
  //     <DataTableColumnHeader
  //       column={column}
  //       title="Sale Return Account Name (EN)"
  //     />
  //   ),
  //   cell: ({ row }) => (
  //     <div>{row.getValue("sale_return_account_name_en")}</div>
  //   ),
  // },
  // {
  //   id: "purchase_account_name_en",
  //   accessorKey: "purchase_account_name_en",
  //   header: ({ column }) => (
  //     <DataTableColumnHeader
  //       column={column}
  //       title="Purchase Account Name (EN)"
  //     />
  //   ),
  //   cell: ({ row }) => (
  //     <div>{row.getValue("purchase_account_name_en")}</div>
  //   ),
  // },
  // {
  //   id: "purchase_return_account_name_en",
  //   accessorKey: "purchase_return_account_name_en",
  //   header: ({ column }) => (
  //     <DataTableColumnHeader
  //       column={column}
  //       title="Purchase Return Account Name (EN)"
  //     />
  //   ),
  //   cell: ({ row }) => (
  //     <div>{row.getValue("purchase_return_account_name_en")}</div>
  //   ),
  // },
  // {
  //   id: "jobcard_account_name_en",
  //   accessorKey: "jobcard_account_name_en",
  //   header: ({ column }) => (
  //     <DataTableColumnHeader
  //       column={column}
  //       title="Jobcard Account Name (EN)"
  //     />
  //   ),
  //   cell: ({ row }) => (
  //     <div>{row.getValue("jobcard_account_name_en")}</div>
  //   ),
  // },
  {
    id: "Actions",
    cell: ({ row }) => (
      <DataTableRowActions
        row={row}
        schema={mapsettingSchema}
        editItem={`/map-settings/update/${row.original.id}`}
        onDelete={(id) => console.log(`Deleting map settings ID: ${id}`)}
        permissions={permissions}
      />
    ),
  },
];