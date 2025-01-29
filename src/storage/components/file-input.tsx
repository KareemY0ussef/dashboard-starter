import { CloudUploadIcon } from "lucide-react";
import { type DropzoneOptions, useDropzone } from "react-dropzone";
import { formatBytes } from "../utils";
import { useTranslations } from "next-intl";

export default function FileInput({
  disabled,
  ...options
}: DropzoneOptions & { disabled?: boolean }) {
  const { getRootProps, getInputProps } = useDropzone(options);
  const t = useTranslations("storage");

  return (
    <div
      className={`w-full aspect-[4/2] border-2 rounded-lg border-dashed flex flex-col items-center justify-center select-none transition-colors ${
        disabled ? "cursor-not-allowed" : "cursor-pointer hover:bg-foreground/5"
      }`}
      {...getRootProps()}
    >
      <input {...getInputProps()} />
      <CloudUploadIcon className="text-gray-300 size-14 mb-2" />
      <p className="text-foreground/60 text-sm">
        {t.rich("inputMessage", {
          strong: (chunks) => <span className="font-medium">{chunks}</span>,
        })}
      </p>
      {options.maxSize && (
        <p className="text-foreground/60 text-sm">
          {t("maxSizeMessage", { size: formatBytes(options.maxSize) })}
        </p>
      )}
    </div>
  );
}
