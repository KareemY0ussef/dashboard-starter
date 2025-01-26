"use client";

import FileInput from "@/storage/components/file-input";
import { useTranslations } from "next-intl";
import { useState } from "react";
import FileInputList from "@/storage/components/file-input-list";
import { ExtendedFileType } from "@/storage/types";

export default function NewMediaPage() {
  const t = useTranslations("dashboard.media.new");
  const [files, setFiles] = useState<ExtendedFileType[]>([]);
  function generateFileUniqueId(file: File, index: number) {
    return `${file.name}-${file.size}-${file.lastModified}-${
      file.type
    }-${index}-${Date.now()}`;
  }
  return (
    <div className="flex flex-col">
      <h2 className="text-3xl font-semibold mb-6">{t("title")}</h2>
      <section className="grid md:grid-cols-2 grid-cols-1 gap-4">
        <FileInput
          onDropAccepted={(acceptedFiles: File[]) => {
            setFiles((prev) => [
              ...prev,
              ...acceptedFiles.map((file, index) => {
                const fileWithUniqueId = Object.assign(file, {
                  uniqueId: generateFileUniqueId(file, index),
                  preview: URL.createObjectURL(file),
                });
                return fileWithUniqueId;
              }),
            ]);
          }}
        />
        <FileInputList files={files} />
      </section>
    </div>
  );
}
