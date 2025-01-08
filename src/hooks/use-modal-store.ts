import { ServerWithMembersWithUsers } from "@/types/types";
import { create } from "zustand";

export type ModalType = "createServer" | "invite" | "members" | 'createChannel' | 'deleteServer' | 'leaveServer' | 'editServer' | 'serverSearch';

interface ModalData {
  server?: ServerWithMembersWithUsers;
}

interface ModalStore {
  type: ModalType | null;
  data: ModalData;
  isOpen: boolean;
  onOpen: (type: ModalType, data?: ModalData) => void;
  onClose: () => void;
}

export const useModal = create<ModalStore>((set) => ({
  type: null,
  data: {},
  isOpen: false,
  onOpen: (type, data = {}) => set({ type, isOpen: true, data }),
  onClose: () => set({ type: null, isOpen: false }),
}));
