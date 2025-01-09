import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { MemberRole } from "@prisma/client";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const InviteCodePage = async ({
  params,
}: {
  params: { inviteCode: string };
}) => {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id;

  if (!userId) {
    redirect("/sign-in");
  }

  const server = await db.server.findFirst({
    where: {
      server_invite_code: params.inviteCode,
    },
    include: {
      members: true,
    },
  });

  if (!server) {
    redirect("/app");
  }

  const isUserFound = server?.members.find(
    (member) => member.user_id === userId
  );

  if (isUserFound) {
    redirect("/app/server/" + server?.server_id);
  } else {
    await db.member.create({
      data: {
        user_id: userId,
        member_role: MemberRole.GUEST,
        server_id: server?.server_id,
      },
    });
    redirect("/app/server/" + server?.server_id);
  }

  return <div>InviteCodePage</div>;
};
export default InviteCodePage;
