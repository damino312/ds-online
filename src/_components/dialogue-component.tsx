import { Dispatch, SetStateAction } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";

interface DialogueComponentProps {
  onOpen: Dispatch<SetStateAction<boolean>>;
  children: React.ReactNode;
  title: string;
  description?: string;
  open: boolean;
}

const DialogueComponent = ({
  onOpen,
  children,
  title,
  description,
  open,
}: DialogueComponentProps) => {
  return (
    <Dialog onOpenChange={onOpen} open={open}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
          {children}
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default DialogueComponent;
