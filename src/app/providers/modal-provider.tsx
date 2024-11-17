"use client";
import CreateChannelModal from "@/_components/modals/create-channel-modal";
import CreateInvitationModal from "@/_components/modals/create-invitation-modal";
import CreateServerModal from "@/_components/modals/create-server-modal";
import DeleteServerModal from "@/_components/modals/delete-server-modal";
import LeaveServerModal from "@/_components/modals/leave-server-modal";
import ManageMembersModal from "@/_components/modals/manage-members-modal";
import { useEffect, useState } from "react";

const ModalProvider = () => {
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    setModalOpen(true);
  }, []);

  if (!modalOpen) {
    return null;
  }

  return (
    <>
      <CreateServerModal />
      <CreateInvitationModal />
      <ManageMembersModal />
      <CreateChannelModal />
      <DeleteServerModal/>
      <LeaveServerModal/>
    </>
  );
};
export default ModalProvider;
