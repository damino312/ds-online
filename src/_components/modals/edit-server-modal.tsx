"use client";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/_components/ui/dialog";
import { useModal } from "@/hooks/use-modal-store";
import { useAction } from "@/hooks/use-action";
import { useToast } from "@/_components/ui/use-toast";
import Image from "next/image";
import FileUpload from "@/app/(platform)/app/_components/file-upload";
import { FormInput } from "@/_components/form/form-input";
import { FormSubmit } from "@/_components/form/form-submit";
import { X } from "lucide-react";
import { editServer } from "@/actions/server/edit-server";

const EditServerModal = () => {
  const { isOpen, onClose, type, data } = useModal();
  const [uploadedPicture, setUploadedPicture] = useState<string | null>(null);
  const [isImgLoading, setIsImgLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (data?.server?.server_picture) {
      setUploadedPicture(data?.server?.server_picture);
    }
  }, [data]);

  const { execute } = useAction(editServer, {
    onSuccess: (data) => {
      toast({
        title: "Server updated",
        description: 'Server "' + data.server_name + '" updated successfully',
      });
      setUploadedPicture(null);
      onClose();
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

  const isModalOpen = isOpen && type === "editServer";

  if (!isModalOpen) return null;

  function onSubmit(formData: FormData) {
    const serverName = formData.get("serverName");
    if (!serverName) return;

    execute({
      server_name: String(serverName),
      server_picture: uploadedPicture,
      server_id: data?.server?.server_id as string,
    });
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Server</DialogTitle>
          <DialogDescription>
            Here you can change settings of the server
          </DialogDescription>
          {!data?.server ? (
            <div>Loading</div>
          ) : (
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
              <FormInput
                className="h-10"
                id="serverName"
                label="Server name"
                defaultValue={data?.server?.server_name}
              />
              <FormSubmit className="mt-6 w-full" disabled={isImgLoading || !data?.server}>
                Save
              </FormSubmit>
            </form>
          )}
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default EditServerModal;
