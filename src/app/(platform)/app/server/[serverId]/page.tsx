import { db } from "@/lib/db";
import { redirect } from "next/navigation";


interface ServerIdPageProps {
  params: {
    serverId: string;
  }
}


const ServerIdPage = async ({params} : ServerIdPageProps) => {
  const channel = await db.channel.findFirst({
    where: {
      server_id: params.serverId,
      channel_name: "general"
    }
  })

  if (!channel) {
    return null;
  }
  
  return redirect(`/app/server/${params.serverId}/channel/${channel.channel_id}`);
};

export default ServerIdPage;
