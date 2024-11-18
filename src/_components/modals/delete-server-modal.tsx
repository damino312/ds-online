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
import { FormSubmit } from "@/_components/form/form-submit";
import { Button } from '@/_components/ui/button';
import { deleteServer } from "@/actions/server/delete-server";

const DeleteServerModal = () => {
  const { isOpen, onClose, type, data } = useModal();
  const { toast } = useToast();

  const { execute } = useAction(deleteServer, {
    onSuccess: (data) => {
      toast({
        title: "Server Deleted",
        description: 'Server "' + data.server_name + '" deleted successfully',
      });
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

  const isModalOpen = isOpen && type === "deleteServer";

  if (!isModalOpen) return null;
  const {server} = data

  function onSubmit() {
    if (!server) {
      toast({
        title: "Error",
        description: 'Server have not found, try again',
        variant: "destructive",
      });
      return
    }
    execute({
      server_id: server?.server_id,
    });
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-4xl mb-2">Delete &quot;{server?.server_name}&quot; server</DialogTitle>
          <DialogDescription className="font-bold text-left mb-6">
            Are you sure you want to delete this server? This action cannot be
            undone!
          </DialogDescription>
          <form className="flex justify-end gap-4 pt-6 " action={onSubmit}>
            <Button className="bg-gray-400 px-8" onClick={onClose}>Cancel</Button>
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
