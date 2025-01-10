import { getOrCreateConversation } from "@/lib/conversation";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

interface MemberIdPageProps {
  params: {
    serverId: string;
    memberId: string
  };
}

const MemberIdPage = async ({params}: MemberIdPageProps) => {
    const session = await getServerSession();
    const user = session?.user;

    if (!user) redirect('/');

    const currentMember = await db.member.findFirst({
      where: {
        server_id: params.serverId,
        user_id: user.id
      },
      include: {
        profile: true
      }
    })

    if (!currentMember) redirect('/');

    const conversation = await getOrCreateConversation(currentMember.member_id, params.memberId);

    if (!conversation) redirect('/server/' + params.serverId);

    const { member_one: memberOne, member_two: memberTwo } = conversation;

    const otherMember = memberOne.member_id === currentMember.member_id ? memberTwo : memberOne;


    return <div>Member id page</div>;
  };
  
  export default MemberIdPage;
  