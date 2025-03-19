import { UniqueIdentifier } from "@dnd-kit/core";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical } from "lucide-react";

interface SortableItemProps {
  id: UniqueIdentifier;
  children: React.ReactNode;
}

export function SortableItem({ id, children }: SortableItemProps) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      className="flex items-center gap-2 p-2 border rounded-md"
    >
      <span {...listeners} className="cursor-grab">
        <GripVertical size={16} />
      </span>
      {children}
    </div>
  );
}
