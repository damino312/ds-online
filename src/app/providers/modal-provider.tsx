"use client";
import CreateInvitationModal from "@/_components/create-invitation-modal";
import CreateServerModal from "@/_components/create-server-modal";
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
    </>
  );
};
export default ModalProvider;
