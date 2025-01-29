import { filesTable } from "@/db/schema/storage-schema";
import { Edit, Trash } from "lucide-react";
import Image from "next/image";

import { Button } from "../ui/button";

export function MediaGridFile({
  file,
}: {
  file: typeof filesTable.$inferSelect;
}) {
  return (
    <div className="group relative">
      <Image
        src={file.url}
        className="aspect-square w-full rounded-md object-cover"
        width={file.width}
        height={file.height}
        alt={file.alt}
        draggable={false}
      />
      <Button
        size={"icon"}
        variant={"destructive"}
        className="duration-400 pointer-events-none absolute right-2 top-2 opacity-0 transition-opacity ease-in-out group-hover:pointer-events-auto group-hover:opacity-100"
      >
        <Trash className="size-5" />
      </Button>
      <Button
        size={"icon"}
        variant={"default"}
        className="duration-400 pointer-events-none absolute left-2 top-2 opacity-0 transition-opacity ease-in-out group-hover:pointer-events-auto group-hover:opacity-100"
      >
        <Edit className="size-5" />
      </Button>
      <div className="gradient duration-400 pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-b from-black/0 via-black/80 to-black px-2 pb-1 pt-4 text-white opacity-0 transition-opacity ease-in-out group-hover:pointer-events-auto group-hover:opacity-100">
        <p className="line-clamp-1 text-ellipsis text-sm">{file.name}</p>
        <p className="cursor-pointer text-sm underline decoration-foreground">
          info
        </p>
      </div>
    </div>
  );
}
