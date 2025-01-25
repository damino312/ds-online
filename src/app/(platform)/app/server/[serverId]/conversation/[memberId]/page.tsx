import { ChatInput } from "@/_components/chat/chat-input";
import ChatMessages from "@/_components/chat/chat-messages";
import { getOrCreateConversation } from "@/lib/conversation";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

interface MemberIdPageProps {
  params: {
    serverId: string;
    memberId: string;
  };
}

const MemberIdPage = async ({ params }: MemberIdPageProps) => {
  const session = await getServerSession();
  const user = session?.user;

  if (!user) redirect("/");

  const currentMember = await db.member.findFirst({
    where: {
      server_id: params.serverId,
      user_id: user.id,
    },
    include: {
      profile: true,
    },
  });

  if (!currentMember) redirect("/");

  const conversation = await getOrCreateConversation(
    currentMember.member_id,
    params.memberId
  );

  if (!conversation) redirect("/server/" + params.serverId);

  const { member_one: memberOne, member_two: memberTwo } = conversation;

  const otherMember =
    memberOne.member_id === currentMember.member_id ? memberTwo : memberOne;

  return (
    <div className="flex flex-col h-full">
        <ChatMessages
          member={currentMember}
          name={otherMember.profile.user_name}
          chatId={conversation.conversation_id}
          type="conversation"
          apiUrl="/api/direct-messages"
          paramKey="conversationId"
          paramValue={conversation.conversation_id}
          socketUrl="/api/socket/direct-messages"
          socketQuery={{
            conversationId: conversation.conversation_id,
          }}
        />
        <ChatInput
          name={otherMember.profile.user_name}
          type="conversation"
          apiUrl="/api/socket/direct-messages"
          query={{
            conversationId: conversation.conversation_id,
          }}
        />
    </div>
  );
};

export default MemberIdPage;
