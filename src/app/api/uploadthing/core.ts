import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";

const f = createUploadthing();

const handleAuth = async () => {
  const session = await getServerSession(authOptions);
  if (!session?.user?.name) throw new UploadThingError("Unauthorized");
  return session;
};

export const ourFileRouter = {
  imageUploader: f({ image: { maxFileSize: "4MB" } })
    .middleware(async () => {
      const session = await handleAuth();
      return { userId: !session?.user?.name };
    })
    .onUploadComplete(() => {}),
  messageFile: f(["image", "pdf"])
    .middleware(async () => {
      const session = await handleAuth();
      return { userId: !session?.user?.name };
    })
    .onUploadComplete(() => {}),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
