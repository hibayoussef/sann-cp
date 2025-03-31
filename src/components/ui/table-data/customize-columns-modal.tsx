import {
  closestCenter,
  DndContext,
  KeyboardSensor,
  PointerSensor,
  UniqueIdentifier,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useState } from "react";

import { Table } from "@tanstack/react-table";
import { Settings2 } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Button } from "../button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../dialog";
import { Input } from "../input";
import { SortableItem } from "./sortable-item";

interface BaseItem {
  id: UniqueIdentifier;
  visible: boolean;
}

interface CustomizeColumnsModalProps<T extends BaseItem> {
  setColumns: (columns: T[]) => void;
  table: Table<any>;
}

export function CustomizeColumnsModal<T extends BaseItem>({
  setColumns,
  table,
}: CustomizeColumnsModalProps<T>) {
  const { t } = useTranslation();
  const [search, setSearch] = useState("");

  const filteredColumns = table
    .getAllColumns()
    .filter((col) =>
      col.id?.toString().toLowerCase().includes(search.toLowerCase())
    );

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  function handleDragEnd(event: any) {
    const { active, over } = event;

    if (active.id !== over.id) {
      // @ts-ignore
      setColumns((prevColumns) => {
        const oldIndex = prevColumns.findIndex(
          (col: any) => col.id === active.id
        );
        const newIndex = prevColumns.findIndex(
          (col: any) => col.id === over.id
        );
        return arrayMove(prevColumns, oldIndex, newIndex);
      });
    }
  }

  return (
    <Dialog>
      <DialogTrigger>
        <Button size="icon" variant="ghost" className="text-blue-700">
          <Settings2 />
        </Button>
      </DialogTrigger>
      <DialogContent className="dark:bg-gray-800  dark:text-gray-100">
        <DialogHeader>
          <DialogTitle className="dark:text-gray-100 flex flex-row items-center gap-2">
            <Settings2 />
            <h2 className="dark:text-gray-100">{t("Customize Columns")}</h2>
          </DialogTitle>
        </DialogHeader>
        <Input
          placeholder={t("Search")}
          className="my-2 dark:text-gray-100"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={filteredColumns}
            strategy={verticalListSortingStrategy}
          >
            {filteredColumns.map((col) => (
              <SortableItem key={col.id} id={col.id!}>
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    onChange={(event) =>
                      col.toggleVisibility(event.target.checked)
                    }
                    checked={col.getIsVisible()}
                    id={col.id.toString()}
                  />
                  <label htmlFor={col.id.toString()} className=" dark:text-gray-100">
                    {" "}
                    {col?.id
                      .replace(/_/g, " ")
                      .replace(/\b\w/g, (char) => char.toUpperCase())}
                  </label>
                </div>
              </SortableItem>
            ))}
          </SortableContext>
        </DndContext>
      </DialogContent>
    </Dialog>
  );
}
