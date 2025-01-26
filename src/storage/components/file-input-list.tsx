import Image from "next/image";
import { ExtendedFileType } from "../types";
import { Button } from "@/components/ui/button";
import { Edit, Trash } from "lucide-react";

export default function FileInputList({
  files,
}: {
  files: ExtendedFileType[];
}) {
  return (
    <div className="w-full flex flex-col items-stretch gap-2">
      {files.map((file) => (
        <FileCard key={file.uniqueId} file={file} />
      ))}
    </div>
  );
}
function FileCard({ file }: { file: ExtendedFileType }) {
  return (
    <div className="p-2 rounded-lg bg-foreground/5 flex flex-col items-stretch">
      <div className="flex items-start justify-between">
        <Image
          src={file.preview}
          width={96}
          height={96}
          alt={file.name}
          className="aspect-square size-24 rounded-md object-cover cursor-pointer"
          draggable={false}
        />
        <div className="flex gap-2 items-center justify-center">
          <Button size={"icon"} variant={"default"}>
            <Edit className="size-5" />
          </Button>
          <Button size={"icon"} variant={"destructive"}>
            <Trash className="size-5" />
          </Button>
          <Button size={"icon"} variant={"destructive"}>
            <Trash className="size-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
