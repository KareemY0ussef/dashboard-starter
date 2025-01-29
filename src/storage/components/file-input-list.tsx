import Image from "next/image";
import { ExtendedFileType } from "../types";
import { Button } from "@/components/ui/button";
import { ChevronDown, Edit, Trash } from "lucide-react";
import path from "path";
import { formatBytes } from "../utils";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { type Dispatch, type SetStateAction, useRef, useState } from "react";
import { closestCenter, DndContext, type DragEndEvent } from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  restrictToVerticalAxis,
  restrictToFirstScrollableAncestor,
} from "@dnd-kit/modifiers";
import { useTranslations } from "next-intl";
export default function FileInputList({
  files,
  setFiles,
}: {
  files: ExtendedFileType[];
  setFiles: Dispatch<SetStateAction<ExtendedFileType[]>>;
}) {
  function handleDelete(uniqueId: string) {
    setFiles((prev) => prev.filter((file) => file.uniqueId !== uniqueId));
  }
  function handleEditAlt(uniqueId: string, alt: string) {
    setFiles((prev) => {
      const updatedFiles = [...prev];

      const fileToEdit = prev.find((file) => file.uniqueId === uniqueId);
      if (!fileToEdit) return prev;
      const fileIndex = prev.indexOf(fileToEdit);
      fileToEdit.alt = alt;
      updatedFiles[fileIndex] = fileToEdit;
      return updatedFiles;
    });
  }
  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    setFiles((prev) => {
      const activeFile = files.find((f) => f.uniqueId === active.id);
      const overFile = files.find((f) => f.uniqueId === over.id);

      if (!activeFile || !overFile) return prev;

      const oldIndex = prev.indexOf(activeFile);
      const newIndex = prev.indexOf(overFile);

      return arrayMove(prev, oldIndex, newIndex);
    });
  }
  return (
    <div className="w-full flex flex-col items-stretch gap-2 overflow-y-auto">
      <DndContext
        collisionDetection={closestCenter}
        modifiers={[restrictToVerticalAxis, restrictToFirstScrollableAncestor]}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={files.map((file) => file.uniqueId)}
          strategy={verticalListSortingStrategy}
        >
          {files.map((file) => (
            <FileCard
              key={file.uniqueId}
              file={file}
              handleDelete={handleDelete}
              handleEditAlt={handleEditAlt}
            />
          ))}
        </SortableContext>
      </DndContext>
    </div>
  );
}
function FileCard({
  file,
  handleDelete,
  handleEditAlt,
}: {
  file: ExtendedFileType;
  handleDelete: (uniqueId: string) => any;
  handleEditAlt: (uniqueId: string, alt: string) => any;
}) {
  const { name } = path.parse(file.name);
  const fileSize = formatBytes(file.size);
  const [isExpanded, setIsExpanded] = useState(false);
  const tableRef = useRef<HTMLDivElement>(null);
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: file.uniqueId });
  const t = useTranslations("storage");

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  const toggleAccordion = () => {
    setIsExpanded(!isExpanded); // Toggle expanded state
  };

  return (
    <div
      className="p-2 rounded-lg bg-foreground/5 flex flex-col items-stretch"
      ref={setNodeRef}
      style={style}
    >
      <div className="flex items-start justify-between gap-2">
        <Image
          src={file.preview}
          width={96}
          height={96}
          alt={file.name}
          className="aspect-square size-24 rounded-md object-cover cursor-pointer"
          draggable={false}
          onLoad={() => URL.revokeObjectURL(file.preview)}
          {...attributes}
          {...listeners}
        />
        <div className="lg:flex flex-col flex-grow text-start md:hidden sm:flex hidden">
          <p className="line-clamp-1 text-ellipsis">{name}</p>
          <p className="text-sm text-foreground/70">{file.type}</p>
          <p className="text-sm text-foreground/70">{fileSize}</p>
        </div>
        <div className="flex gap-2 items-center justify-end flex-wrap">
          <Button
            size={"icon"}
            variant={"destructive"}
            onClick={() => handleDelete(file.uniqueId)}
          >
            <Trash className="size-5" />
          </Button>
          <Button
            size={"icon"}
            variant={"ghost"}
            onClick={toggleAccordion} // Toggle accordion on click
          >
            <ChevronDown
              className={`size-5 transition-transform ${
                isExpanded ? "rotate-180" : ""
              }`}
            />
          </Button>
        </div>
      </div>
      <div
        className="overflow-hidden transition-all duration-300 ease-in-out"
        style={{
          height: isExpanded ? tableRef.current?.scrollHeight || "auto" : "0",
        }}
      >
        <div ref={tableRef}>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell className="w-0 whitespace-nowrap">
                  {t("fileValues.name")}
                </TableCell>
                <TableCell className="line-clamp-1 text-ellipsis">
                  {name}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="w-0 whitespace-nowrap">
                  {t("fileValues.type")}
                </TableCell>
                <TableCell>{file.type}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="w-0 whitespace-nowrap">
                  {t("fileValues.size")}
                </TableCell>
                <TableCell>{fileSize}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="w-0 whitespace-nowrap">
                  {t("fileValues.alt")}
                </TableCell>
                <TableCell className="py-2">
                  <Input
                    className="max-w-44 flex-grow"
                    value={file.alt}
                    onChange={(e) =>
                      handleEditAlt(file.uniqueId, e.currentTarget.value)
                    }
                  />
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
