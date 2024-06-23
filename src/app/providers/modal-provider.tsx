"use client";
import CreateServerModal from "@/_components/modal-component";
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
    </>
  );
};
export default ModalProvider;
