"use client";

import { Dispatch, SetStateAction, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { useModal } from "@/hooks/use-modal-store";
import { useAction } from "@/hooks/use-action";
import { useToast } from "./ui/use-toast";
import { addServer } from "@/actions/server/add-server";
import Image from "next/image";
import FileUpload from "@/app/(platform)/app/_components/file-upload";
import { FormInput } from "./form/form-input";
import { FormSubmit } from "./form/form-submit";
import { X } from "lucide-react";

const CreateServerModal = () => {
  const { isOpen, onClose, type } = useModal();
  const [uploadedPicture, setUploadedPicture] = useState<string | null>(null);
  const [isImgLoading, setIsImgLoading] = useState(false);
  const { toast } = useToast();

  const { execute } = useAction(addServer, {
    onSuccess: (data) => {
      toast({
        title: "Server created",
        description: 'Server "' + data.server_name + '" created successfully',
      });
      setUploadedPicture(null);
    },
    onError: (error) => {
      console.error(error);
      toast({
        title: "Error",
        description: error,
        variant: "destructive",
      });
    },
  });

  const isModalOpen = isOpen && type === "createServer";

  if (!isModalOpen) return null;

  function onSubmit(formData: FormData) {
    const serverName = formData.get("serverName");
    execute({
      server_name: String(serverName),
      server_picture: uploadedPicture,
    });
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Server</DialogTitle>
          <DialogDescription>
            Give your server a personality with a name and an image. You can
            always change it later
          </DialogDescription>
          <form className="pt-2" action={onSubmit}>
            <div className="flex justify-center">
              {uploadedPicture ? (
                <div className="relative w-full h-20 flex justify-center my-16">
                  <div className="relative rounded-full overflow-hidden">
                    <Image
                      alt="Server picture"
                      src={uploadedPicture}
                      width={100}
                      height={100}
                      style={{ objectFit: "cover" }}
                      className="w-20 h-20"
                    />
                    <button
                      className="absolute top-0 right-0 h-full w-full flex justify-center items-center group"
                      onClick={() => setUploadedPicture(null)}
                    >
                      <X className="w-8 h-8 stroke-transparent group-hover:stroke-red-600 transition-all" />
                    </button>
                  </div>
                </div>
              ) : (
                <FileUpload
                  endpoint="imageUploader"
                  onChange={setUploadedPicture}
                  setIsLoading={setIsImgLoading}
                />
              )}
            </div>
            <FormInput className="h-10" id="serverName" label="Server name" />
            <FormSubmit className="mt-6 w-full" disabled={isImgLoading}>
              Create
            </FormSubmit>
          </form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default CreateServerModal;
