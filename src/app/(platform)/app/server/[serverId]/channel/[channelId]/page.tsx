import { ChatInput } from "@/_components/chat/chat-input";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";

interface ChannelIdPageProps {
  params: {
    serverId: string;
    channelId: string;
  };
}

const ChannelIdPage = async ({ params }: ChannelIdPageProps) => {

  const channel = await db.channel.findFirst({
    where: {
      channel_id: params.channelId,
    },
  });

  if (!channel) redirect("/");


  return (
    <div className="bg-white dark:bg-[#313338] flex flex-col h-full">
      <div className="flex-1">Fiture messages</div>
      <ChatInput
        name={channel?.channel_name}
        type="channel"
        apiUrl="/api/socket/messages"
        query={{
          channelId: channel.channel_id,
          serverId: channel.server_id,
        }
        }
      />
    </div>
  );
};

export default ChannelIdPage;
