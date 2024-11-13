"use client";

import { Dispatch, SetStateAction, useState } from "react";
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
import { addServer } from "@/actions/server/add-server";
import Image from "next/image";
import FileUpload from "@/app/(platform)/app/_components/file-upload";
import { FormInput } from "@/_components/form/form-input";
import { FormSubmit } from "@/_components/form/form-submit";
import { X } from "lucide-react";
import { Button } from '@/_components/ui/button';

const DeleteServerModal = () => {
  const { isOpen, onClose, type, data } = useModal();
  const { toast } = useToast();

  // const { execute } = useAction(addServer, {
  //   onSuccess: (data) => {
  //     toast({
  //       title: "Server created",
  //       description: 'Server "' + data.server_name + '" created successfully',
  //     });
  //     onClose();
  //   },
  //   onError: (error) => {
  //     console.error(error);
  //     toast({
  //       title: "Error",
  //       description: error,
  //       variant: "destructive",
  //     });
  //   },
  // });

  const isModalOpen = isOpen && type === "deleteServer";

  if (!isModalOpen) return null;
  const {server} = data

  function onSubmit() {
    // execute({
    //   server_name: String(serverName),
    //   server_picture: uploadedPicture,
    // });
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className=" bg-slate-100 dark:bg-slate-200">
        <DialogHeader>
          <DialogTitle className="text-4xl dark:text-black">Delete &quot;{server?.server_name}&quot; server</DialogTitle>
          <DialogDescription className="text-left text-black font-bold">
            Are you sure you want to delete this server? This action cannot be
            undone!
          </DialogDescription>
          <form className=" flex justify-end gap-4 pt-6" action={onSubmit}>
            <Button variant='secondary' className="bg-gray-400 px-8 text-white" onClick={onClose}>Cancel</Button>
            <FormSubmit variant="destructive" className="px-8 bg-red-700" >
              Delete
            </FormSubmit>
          </form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteServerModal;
