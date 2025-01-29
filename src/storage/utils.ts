export function formatBytes(bytes: number, decimals: number = 2): string {
  if (bytes === 0) return "0 Bytes";

  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"]; // Max size is TB

  // Calculate the appropriate unit index
  const i = Math.min(
    Math.floor(Math.log(bytes) / Math.log(k)),
    sizes.length - 1
  );

  // Format the result
  return (
    parseFloat((bytes / Math.pow(k, i)).toFixed(decimals)) + " " + sizes[i]
  );
}

export function generateFileUniqueId(file: File, index: number) {
  return `${file.name}-${file.size}-${file.lastModified}-${
    file.type
  }-${index}-${Date.now()}`;
}
export const getImageDimensions = (
  file: File
): Promise<{ width: number; height: number }> => {
  return new Promise((resolve, reject) => {
    if (!file.type.startsWith("image/")) {
      reject(new Error("The selected file is not an image."));
      return;
    }

    const reader = new FileReader();

    reader.onload = (event) => {
      const img = new Image();

      img.onload = () => {
        resolve({ width: img.width, height: img.height });
      };

      img.onerror = (error) => {
        reject(new Error("Failed to load the image."));
      };

      if (event.target?.result) {
        img.src = event.target.result as string;
      }
    };

    reader.onerror = (error) => {
      reject(new Error("Failed to read the file."));
    };

    reader.readAsDataURL(file);
  });
};
