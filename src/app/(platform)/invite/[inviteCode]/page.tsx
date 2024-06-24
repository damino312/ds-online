import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const InviteCodePage = async ({
  params,
}: {
  params: { inviteCode: string };
}) => {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id;
  console.log(params.inviteCode);

  if (!userId) {
    redirect("/sign-in");
  }

  return <div>InviteCodePage</div>;
};
export default InviteCodePage;
