"use client";

import { useEffect, useState } from "react";
import { useModal } from "@/hooks/use-modal-store";
import { useOrigin } from "@/hooks/use-origin";
import { Copy, CopyCheck } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Label } from "../ui/label";
import { Input } from "../ui/input";

const ManageMembersModal = () => {
  const { isOpen, onClose, type, data } = useModal();
  const origin = useOrigin();
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | undefined;
    if (saved) {
      timer = setTimeout(() => {
        setSaved(false);
      }, 1500);
    }
    return () => {
      timer && clearTimeout(timer);
    };
  }, [saved]);
  const isModalOpen = isOpen && type === "members";

  if (!isModalOpen) return null;

  const { server } = data;
  const inviteUrl = origin + "/invite/" + server?.server_invite_code;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Manage members</DialogTitle>
          <div className="text-left">
            <Label>Server Invite Url</Label>
            <p className="text-sm text-muted-foreground mt-2 mb-2">
              This is the link you send to your friends
            </p>
            <div className="flex gap-4 items-center mb-4">
              <Input readOnly value={inviteUrl} />
              {saved ? (
                <CopyCheck className="hover:cursor-pointer h-6 w-6 text-green-500" />
              ) : (
                <Copy
                  className="hover:cursor-pointer h-6 w-6 text-muted-foreground hover:text-primary"
                  onClick={() => {
                    setSaved(true);
                    navigator.clipboard.writeText(inviteUrl);
                  }}
                />
              )}
            </div>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default ManageMembersModal;
