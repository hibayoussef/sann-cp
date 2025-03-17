import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { Row } from "@tanstack/react-table";
import { Copy, Eye, MoreHorizontal, Pencil } from "lucide-react";
import * as React from "react";
import { useNavigate } from "react-router";
import { ZodSchema } from "zod";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
  schema: ZodSchema;
  viewDetails?: string | undefined | null;
  editItem?: string | undefined;
}

export function DataTableRowActions<TData>({
  row,
  schema,
  viewDetails,
  editItem,
}: DataTableRowActionsProps<TData>) {
  const [dialogContent, setDialogContent] =
    React.useState<React.ReactNode | null>(null);
  const navigate = useNavigate();
  const hasViewDetails = Boolean(viewDetails);

  try {
    const data = schema.safeParse(row.original);

    return (
      <Dialog>
        <div
          className={cn(
            "flex items-center justify-end",
            hasViewDetails && "cursor-pointer hover:bg-gray-50"
          )}
          onClick={(e) => {
            if (hasViewDetails && viewDetails) {
              e.stopPropagation();
              navigate(viewDetails);
            }
          }}
        >
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="flex h-8 w-8 p-0 data-[state=open]:bg-muted hover:bg-transparent"
                onClick={(e) => {
                  e.stopPropagation();
                }}
              >
                <MoreHorizontal className="h-4 w-4" />
                <span className="sr-only">Open menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="w-[200px] bg-white shadow-md border border-gray-200 z-[9999]"
            >
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem>
                <Copy className="mr-2 h-4 w-4" />
                Copy ID
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              {viewDetails && (
                <DialogTrigger asChild onClick={() => navigate(viewDetails)}>
                  <DropdownMenuItem>
                    <Eye className="mr-2 h-4 w-4" />
                    View Details
                  </DropdownMenuItem>
                </DialogTrigger>
              )}
              {editItem && (
                <DialogTrigger asChild onClick={() => navigate(editItem)}>
                  <DropdownMenuItem>
                    <Pencil className="mr-2 h-4 w-4" />
                    Edit Details
                  </DropdownMenuItem>
                </DialogTrigger>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        {dialogContent && (
          <DialogContent className="bg-white p-6 rounded-lg shadow-lg z-[9999]">
            {dialogContent}
          </DialogContent>
        )}
      </Dialog>
    );
  } catch (error) {
    console.error("Schema validation failed:", error);
    return null;
  }
}
