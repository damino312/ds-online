import { ServerWithMembersWithUsers } from "@/types/types";
import { Channel, ChannelType } from "@prisma/client";
import { create } from "zustand";

export type ModalType = "createServer" | "invite" | "members" | 'createChannel' | 'deleteServer' | 'leaveServer' | 'editServer' | 'serverSearch' | 'deleteChannel' | 'editChannel';

interface ModalData {
  server?: ServerWithMembersWithUsers;
  channelType?: ChannelType;
  channel?: Channel;
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
