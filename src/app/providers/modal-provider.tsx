"use client";
import CreateChannelModal from "@/_components/modals/create-channel-modal";
import CreateInvitationModal from "@/_components/modals/create-invitation-modal";
import CreateServerModal from "@/_components/modals/create-server-modal";
import DeleteChannelModal from "@/_components/modals/delete-channel-modal";
import DeleteServerModal from "@/_components/modals/delete-server-modal";
import EditChannelModal from "@/_components/modals/edit-channel-modal";
import EditServerModal from "@/_components/modals/edit-server-modal";
import LeaveServerModal from "@/_components/modals/leave-server-modal";
import ManageMembersModal from "@/_components/modals/manage-members-modal";
import MessageFileModal from "@/_components/modals/message-file-modal";
import ServerSearchModal from "@/_components/modals/server-search-modal";
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
      <EditServerModal/>
      <ServerSearchModal/>
      <DeleteChannelModal/>
      <EditChannelModal/>
      <MessageFileModal/>
    </>
  );
};
export default ModalProvider;
