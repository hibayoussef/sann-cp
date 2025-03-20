import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
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
import { Copy, Eye, MoreHorizontal, Pencil, Trash } from "lucide-react";
import { useState, useRef } from "react";
import { useNavigate } from "react-router";
import { ZodSchema } from "zod";

interface DataTableRowActionsProps<TData> {
  row: Row<TData> | any;
  schema: ZodSchema;
  viewDetails?: string | undefined | null;
  editItem?: string | undefined;
  onDelete?: (id: number) => void;
  permissions?: {
    update: boolean;
    delete: boolean;
  };
}

export function DataTableRowActions<TData>({
  row,
  viewDetails,
  editItem,
  onDelete,
  permissions,
}: DataTableRowActionsProps<TData>) {
  const navigate = useNavigate();
  const [isDeleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const deleteItemRef = useRef<number | null>(null); 

  const handleDelete = () => {
    if (onDelete && deleteItemRef.current !== null) {
      onDelete(deleteItemRef.current);
      setDeleteConfirmOpen(false);
    }
  };

  return (
    <>
      <div
        className={cn(
          "flex items-center justify-end",
          viewDetails && "cursor-pointer hover:bg-gray-50"
        )}
        onClick={(e) => {
          if (viewDetails) {
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
              onClick={(e) => e.stopPropagation()} 
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

            <DropdownMenuItem
              onClick={(e) => {
                e.stopPropagation();
                navigator.clipboard.writeText(row.original.id);
              }}
            >
              <Copy className="mr-2 h-4 w-4" />
              Copy ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />

            {viewDetails && (
              <DropdownMenuItem
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(viewDetails);
                }}
              >
                <Eye className="mr-2 h-4 w-4" />
                View Details
              </DropdownMenuItem>
            )}

            {permissions?.update && editItem && (
              <DropdownMenuItem
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(editItem);
                }}
              >
                <Pencil className="mr-2 h-4 w-4" />
                Edit Details
              </DropdownMenuItem>
            )}

            {permissions?.delete && (
              <DropdownMenuItem
                onClick={(e) => {
                  e.stopPropagation();
                  deleteItemRef.current = row?.original?.id; 
                  setDeleteConfirmOpen(true);
                }}
              >
                <Trash className="mr-2 h-4 w-4 text-red-500" />
                <span className="text-red-500">Delete</span>
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <Dialog open={isDeleteConfirmOpen} onOpenChange={(open) => open && setDeleteConfirmOpen(false)}>
        <DialogContent className="bg-white p-6 rounded-lg shadow-lg z-[9999]">
          <h2 className="text-lg font-bold">Confirm Delete</h2>
          <p>Are you sure you want to delete this item?</p>
          <div className="flex justify-end space-x-2 mt-4">
            <Button variant="outline" onClick={() => setDeleteConfirmOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              Delete
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
