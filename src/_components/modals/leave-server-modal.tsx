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
import { leaveServer } from "@/actions/member/leave-server";

const LeaveServerModal = () => {
  const { isOpen, onClose, type, data } = useModal();
  const { toast } = useToast();
  
  const {server} = data
  const { execute } = useAction(leaveServer, {
    onSuccess: (data) => {
      toast({
        title: "Info",
        description: 'You left server "' + server?.server_name + '"',
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

  const isModalOpen = isOpen && type === "leaveServer";

  if (!isModalOpen) return null;

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
          <DialogTitle className="text-4xl text-left">Leave &quot;{server?.server_name}&quot; server</DialogTitle>
          <DialogDescription className="text-left font-bold pt-2">
            Do you really want to leave the server?
          </DialogDescription>
          <form className=" flex justify-end gap-4 pt-6" action={onSubmit}>
            <Button className="bg-gray-400 px-8" onClick={onClose}>Cancel</Button>
            <FormSubmit variant="destructive" className="px-8 bg-red-700" >
              Leave
            </FormSubmit>
          </form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default LeaveServerModal;
