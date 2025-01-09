import { create } from "zustand";

interface ModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  onToggle: () => void;
}

export const useMemberSidebar = create<ModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({isOpen: true}),
  onClose: () => set({ isOpen: false }),
  onToggle: () => set((state) => ({ isOpen: !state.isOpen })),
}));
