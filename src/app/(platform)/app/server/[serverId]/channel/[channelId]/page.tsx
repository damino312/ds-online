import { ChatInput } from "@/_components/chat/chat-input";
import ChatMessages from "@/_components/chat/chat-messages";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

interface ChannelIdPageProps {
  params: {
    serverId: string;
    channelId: string;
  };
}

const ChannelIdPage = async ({ params }: ChannelIdPageProps) => {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!user?.id) redirect("/");

  const channel = await db.channel.findFirst({
    where: {
      channel_id: params.channelId,
    },
  });

  const member = await db.member.findFirst({
    where: {
      server_id: params.serverId,
      user_id: user.id,
    },
  });

  if (!channel || !member) redirect("/");

  return (
    <div className="h-full bg-white dark:bg-[#313338] flex flex-col">
      <ChatMessages
        member={member}
        name={channel.channel_name}
        chatId={channel.channel_id}
        type="channel"
        apiUrl="/api/messages"
        socketUrl="/api/socket/messages"
        socketQuery={{
          channelId: channel.channel_id,
          serverId: channel.server_id,
        }}
        paramKey="channelId"
        paramValue={channel.channel_id}
      />
      <ChatInput
        name={channel?.channel_name}
        type="channel"
        apiUrl="/api/socket/messages"
        query={{
          channelId: channel.channel_id,
          serverId: channel.server_id,
        }}
      />
    </div>
  );
};

export default ChannelIdPage;
