"use client";
import CreateInvitationModal from "@/_components/modals/create-invitation-modal";
import CreateServerModal from "@/_components/modals/create-server-modal";
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
    </>
  );
};
export default ModalProvider;
