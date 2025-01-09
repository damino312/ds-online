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
import { editChannel } from "@/actions/channel/edit-channel";
import { FormInput } from "../form/form-input";

const EditChannelModal = () => {
  const { isOpen, onClose, type, data } = useModal();
  const { toast } = useToast();

  const { execute } = useAction(editChannel, {
    onSuccess: (data) => {
      toast({
        title: "Channel Edited",
        description: 'Channel "' + data.channel_name + '" edited successfully',
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

  const isModalOpen = isOpen && type === "editChannel";

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

  function onSubmit(formData: FormData) {
    const channelName = formData.get("serverName") as string;
    execute({
      channel_id: channel?.channel_id as string,
      channel_name: channelName
    });
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Channel</DialogTitle>
          <DialogDescription>
            Here you can change settings of the server
          </DialogDescription>
            <form className="pt-2" action={onSubmit}>
              <FormInput
                className="h-10"
                id="serverName"
                label="Channel name"
                defaultValue={channel.channel_name}
              />
              <FormSubmit className="mt-6 w-full">
                Save
              </FormSubmit>
            </form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default EditChannelModal;
