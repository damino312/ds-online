"use client";
import { Separator } from "@/_components/ui/separator";
import AddServerBtn from "./sidebar/add-server-btn";
import UserIcon from "./user-icon";
import { useEffect, useRef, useState } from "react";
import { useSession } from "next-auth/react";
import { AuthUser } from "@/types/next-auth";
import DialogueComponent from "@/_components/dialogue-component";

const Sidebar = () => {
  const session = useSession();
  const user = session.data?.user as AuthUser;
  const [openModal, setOpenModal] = useState(false);

  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleWheel = (event: WheelEvent) => {
      if (scrollContainerRef.current) {
        scrollContainerRef.current.scrollTop += event.deltaY;
      }
    };

    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener("wheel", handleWheel);
    }

    return () => {
      if (scrollContainer) {
        scrollContainer.removeEventListener("wheel", handleWheel);
      }
    };
  }, []);

  return (
    <div className="h-screen w-20 bg-black flex flex-col items-center pt-4 pb-6">
      <div
        ref={scrollContainerRef}
        className="h-full overflow-hidden scrollbar-hide "
      >
        <AddServerBtn setOpenModal={() => setOpenModal(true)} />
        <DialogueComponent
          title="Add Server"
          open={openModal}
          onOpen={setOpenModal}
        >
          <div></div>
        </DialogueComponent>
        <Separator className="w-12 mt-3 h-0.5 bg-zinc-900" />
      </div>
      <div className="mt-4">
        <UserIcon user={user} />
      </div>
    </div>
  );
};

export default Sidebar;
