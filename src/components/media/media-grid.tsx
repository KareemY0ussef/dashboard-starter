import { filesTable } from "@/db/schema/storage-schema";
import { getFiles } from "@/storage/actions";
import * as React from "react";

import { MediaGridFile } from "./media-grid-file";

export default function MediaGrid() {
  const [files, setFiles] = React.useState<(typeof filesTable.$inferSelect)[]>(
    [],
  );
  React.useEffect(() => {
    getFiles().then(setFiles);
  }, []);
  return (
    <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
      {files.map((file) => (
        <MediaGridFile key={file.id} file={file} />
      ))}
    </div>
  );
}
