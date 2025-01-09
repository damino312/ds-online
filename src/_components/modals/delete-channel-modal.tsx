"use client";

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
import { deleteChannel } from "@/actions/channel/delete-channel";

const DeleteChannelModal = () => {
  const { isOpen, onClose, type, data } = useModal();
  const { toast } = useToast();

  const { execute } = useAction(deleteChannel, {
    onSuccess: (data) => {
      toast({
        title: "Channel Deleted",
        description: 'Channel "' + data.channel_name + '" deleted successfully',
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

  const isModalOpen = isOpen && type === "deleteChannel";

  if (!isModalOpen) return null;
  const { channel } = data

  if (!channel) {
    toast({
      title: "Error",
      description: 'Channel have not found, try again',
      variant: "destructive",
    });
    return null
  }

  function onSubmit() {
    execute({
      channel_id: channel?.channel_id as string,
    });
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-4xl text-left">Delete &quot;{channel.channel_name}&quot; channel</DialogTitle>
          <DialogDescription className="font-bold text-left pt-2">
            Are you sure you want to delete this channel? This action cannot be
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

export default DeleteChannelModal;
