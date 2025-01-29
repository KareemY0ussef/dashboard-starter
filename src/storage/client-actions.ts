import { upload } from "@vercel/blob/client";
import { OnUploadProgressCallback } from "@vercel/blob";
import { filesTable } from "@/db/schema/storage-schema";
import path from "path";
import { getImageDimensions } from "./utils";
import { insertFile } from "@/db/storage";

export async function uploadFile({
  file,
  alt,
  onUploadProgress,
}: {
  file: File;
  alt?: string;
  onUploadProgress?: OnUploadProgressCallback;
}) {
  const newBlob = await upload(file.name, file, {
    access: "public",
    handleUploadUrl: "/api/upload",
    multipart: file.size > 10485760,
    onUploadProgress,
  });
  const { name, ext } = path.parse(file.name);

  const { height, width } = await getImageDimensions(file);
  const dbFile: typeof filesTable.$inferInsert = {
    name: name,
    ext: ext,
    type: file.type,
    size: file.size,
    height: height,
    width: width,
    url: newBlob.url,
    downloadUrl: newBlob.downloadUrl,
    path: newBlob.pathname,
    alt: alt,
  };
  await insertFile(dbFile);
  return newBlob;
}
