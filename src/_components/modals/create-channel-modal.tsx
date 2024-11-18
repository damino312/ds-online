"use client";

import { Dispatch, SetStateAction, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/_components/ui/dialog";
import { useModal } from "@/hooks/use-modal-store";
import { useAction } from "@/hooks/use-action";
import { useToast } from "@/_components/ui/use-toast";
import { FormInput } from "@/_components/form/form-input";
import { FormSubmit } from "@/_components/form/form-submit";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { createChannel } from "@/actions/channel/create-channel";
import { ChannelType } from "@prisma/client";

const CreateChannelModal = () => {
  const { isOpen, onClose, type, data } = useModal();
  const { server } = data;
  const { toast } = useToast();

  const { execute, isLoading, fieldErrors } = useAction(createChannel, {
    onSuccess: (data) => {
      toast({
        title: "Channel created",
        description: 'Channel "' + data.channel_name + '" created successfully',
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

  const isModalOpen = isOpen && type === "createChannel";

  if (!isModalOpen) return null;

  function onSubmit(formData: FormData) {
    const channelName = formData.get("channel_name")?.toString();
    const channelType = formData.get("channel_type")?.toString() as
      | ChannelType
      | undefined;

    if (!channelName || !channelType || !server) {
      toast({
        title: "Error",
        description: "Incomplete data",
        variant: "destructive",
      });
      return;
    }

    execute({
      channel_name: channelName,
      channel_type: channelType,
      server_id: server?.server_id,
    });
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-3xl">
            Add Channel
          </DialogTitle>
          <form className="pt-2" action={onSubmit}>
            <FormInput
              label="Channel Name"
              labelClassName="block text-left "
              errors={fieldErrors}
              required
              placeholder="Name here"
              className="h-10 mb-3"
              id="channel_name"
            />
            <Select name="channel_type" required>
              <SelectTrigger className="w-1/2">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="TEXT">TEXT</SelectItem>
                <SelectItem value="AUDIO">AUDIO</SelectItem>
                <SelectItem value="VIDEO">VIDEO</SelectItem>
              </SelectContent>
            </Select>
            <FormSubmit
              disabled={isLoading}
              variant="babyBlue"
              className="mt-6 w-full "
            >
              Create
            </FormSubmit>
          </form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default CreateChannelModal;
