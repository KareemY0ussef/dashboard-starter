"use client";

import FileInput from "@/storage/components/file-input";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import FileInputList from "@/storage/components/file-input-list";
import { ExtendedFileType } from "@/storage/types";
import { generateFileUniqueId } from "@/storage/utils";
import { Button } from "@/components/ui/button";
import { Loader } from "lucide-react";
import { uploadFile } from "@/storage/client-actions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function NewMediaPage() {
  const t = useTranslations("dashboard.media.new");
  const [files, setFiles] = useState<ExtendedFileType[]>([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleUpload() {
    if (files.length === 0) {
      toast.info("You should select at least on image");
      return;
    }
    setLoading(true);
    const toastId = toast.loading(`Uploading ${files.length} files`, {
      description: `0 of ${files.length} uploaded`,
      duration: Infinity,
    });
    for (const [index, file] of files.entries()) {
      await uploadFile({ file, alt: file.alt });
      toast.loading(`Uploading ${files.length} files`, {
        id: toastId,
        description: `${index + 1} of ${files.length} uploaded`,
      });
    }
    toast.success(`Uploaded ${files.length} files successfully`, {
      description: "",
      id: toastId,
    });
    setTimeout(() => {
      toast.dismiss(toastId);
    }, 2000);
    router.push("/media");
  }

  useEffect(() => {
    return () => files.forEach((file) => URL.revokeObjectURL(file.preview));
  });

  return (
    <div className="flex flex-col">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-semibold mb-6">{t("title")}</h2>
        <Button onClick={handleUpload} className="w-20" disabled={loading}>
          {loading ? (
            <Loader className="size-5 animate-spin" />
          ) : (
            t("saveButton")
          )}
        </Button>
      </div>
      <section
        className={`grid md:grid-cols-2 grid-cols-1 gap-4 ${
          loading ? "pointer-events-none" : ""
        }`}
      >
        <FileInput
          onDropAccepted={(acceptedFiles: File[]) => {
            setFiles((prev) => [
              ...prev,
              ...acceptedFiles.map((file, index) => {
                const fileWithUniqueId = Object.assign(file, {
                  uniqueId: generateFileUniqueId(file, index),
                  preview: URL.createObjectURL(file),
                  alt: "",
                });
                return fileWithUniqueId;
              }),
            ]);
          }}
        />
        <FileInputList files={files} setFiles={setFiles} />
      </section>
    </div>
  );
}
