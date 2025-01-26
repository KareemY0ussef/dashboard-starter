import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { DialogProps } from "@radix-ui/react-dialog";
import MediaInput from "./file-input";

export default function AddFileDialog({ ...props }: DialogProps) {
  return (
    <Dialog {...props}>
      <DialogContent className="max-h-screen grid grid-rows-[auto,1fr]">
        <DialogHeader>
          <DialogTitle>Add a file</DialogTitle>
        </DialogHeader>

        <MediaInput />
      </DialogContent>
    </Dialog>
  );
}
