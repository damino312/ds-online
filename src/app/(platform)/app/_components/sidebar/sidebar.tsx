"use client";
import { Separator } from "@/_components/ui/separator";
import AddServerBtn from "./add-server-btn";
import UserIcon from "../user-icon";
import { useEffect, useRef, useState } from "react";
import { useSession } from "next-auth/react";
import { AuthUser } from "@/types/next-auth";
import DialogueComponent from "@/_components/dialogue-component";
import { FormInput } from "@/_components/form/form-input";
import { FormSubmit } from "@/_components/form/form-submit";
import FileUpload from "../file-upload";
import Image from "next/image";
import { X } from "lucide-react";
import { useAction } from "@/hooks/use-action";
import { addServer } from "@/actions/server/add-server";
import { useToast } from "@/_components/ui/use-toast";
import { Member, Server } from "@prisma/client";
import SidebarItem from "./sidebar-item";
import { ModeToggle } from "@/_components/mode-toggle";

interface SidebarProps {
  servers: (Server & { members: Member[] })[];
}

const Sidebar = ({ servers }: SidebarProps) => {
  const session = useSession();
  const user = session.data?.user as AuthUser;

  const { toast } = useToast();
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const [openModal, setOpenModal] = useState(false);
  const [uploadedPicture, setUploadedPicture] = useState<string | null>(null);
  const [isImgLoading, setIsImgLoading] = useState(false);

  useEffect(() => {
    const handleWheel = (event: WheelEvent) => {
      if (scrollContainerRef.current) {
        scrollContainerRef.current.scrollTop += event.deltaY;
      }
    };

    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener("wheel", handleWheel, { passive: true });
    }

    return () => {
      if (scrollContainer) {
        scrollContainer.removeEventListener("wheel", handleWheel);
      }
    };
  }, []);

  const { execute } = useAction(addServer, {
    onSuccess: (data) => {
      toast({
        title: "Server created",
        description: 'Server "' + data.server_name + '" created successfully',
      });
      setUploadedPicture(null);
      setOpenModal(false);
    },
    onError: (error) => {
      console.error(error);
      toast({
        title: "Error",
        description: error,
        variant: "destructive",
      });
    },
  });

  function onSubmit(formData: FormData) {
    const serverName = formData.get("serverName");
    execute({
      server_name: String(serverName),
      server_picture: uploadedPicture,
    });
  }

  return (
    <div className="h-screen w-20 dark:bg-[#1c1e20] bg-[#dee1e2] flex flex-col items-center pt-4 pb-6">
      <div
        ref={scrollContainerRef}
        className="h-full w-full overflow-hidden scrollbar-hide "
      >
        <div className="w-full flex justify-center">
          <AddServerBtn setOpenModal={() => setOpenModal(true)} />
        </div>
        <DialogueComponent
          title="Add Server"
          description="Give your server a personality with a name and an image. You can always change it later"
          open={openModal}
          onOpen={setOpenModal}
        >
          <form className="pt-2" action={onSubmit}>
            <div className="flex justify-center">
              {uploadedPicture ? (
                <div className="relative w-full h-20 flex justify-center my-16">
                  <div className="relative rounded-full overflow-hidden">
                    <Image
                      alt="Server picture"
                      src={uploadedPicture}
                      width={100}
                      height={100}
                      style={{ objectFit: "cover" }}
                      className="w-20 h-20"
                    />
                    <button
                      className="absolute top-0 right-0 h-full w-full flex justify-center items-center group"
                      onClick={() => setUploadedPicture(null)}
                    >
                      <X className="w-8 h-8 stroke-transparent group-hover:stroke-red-600 transition-all" />
                    </button>
                  </div>
                </div>
              ) : (
                <FileUpload
                  endpoint="imageUploader"
                  onChange={setUploadedPicture}
                  setIsLoading={setIsImgLoading}
                />
              )}
            </div>
            <FormInput className="h-10" id="serverName" label="Server name" />
            <FormSubmit className="mt-6 w-full" disabled={isImgLoading}>
              Create
            </FormSubmit>
          </form>
        </DialogueComponent>
        <div className="flex justify-center">
          <Separator className="w-12 my-2 h-0.5 dark:bg-white bg-zinc-900 rounded-sm" />
        </div>

        {servers.map((server) => (
          <SidebarItem
            className="mb-4"
            key={server.server_id}
            server={server}
          />
        ))}
      </div>
      <ModeToggle />
      <div className="mt-4">
        <UserIcon user={user} />
      </div>
    </div>
  );
};

export default Sidebar;
