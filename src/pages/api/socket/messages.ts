import { CurrentUserPages } from "@/lib/current-user-pages";
import { db } from "@/lib/db";
import { NextApiResponseServerIO } from "@/types/types";
import { NextApiRequest } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponseServerIO
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const user = await CurrentUserPages(req);
    const { content, fileUrl } = req.body;
    const { serverId, channelId } = req.query;

    if (!user) {
        return res.status(401).json({ error: "Unauthorized" });
    }

    if (!serverId) {
        return res.status(400).json({ error: "Server ID missing" });
    }

    if (!channelId) {
        return res.status(400).json({ error: "Channel ID missing" });
    }

    if (!content) {
        return res.status(400).json({ error: "Content missing" });
    }

    const server = await db.server.findFirst({
        where: {
            server_id: serverId as string,
            members: {
                some: {
                    user_id: user.user_id
                }
            }
        },
        include: {
            members: true,
        }
    })

    if (!server) {
        return res.status(404).json({ error: "Server not found" });
    }

    const channel = await db.channel.findFirst({
        where: {
            channel_id: channelId as string,
            server_id: serverId as string,
        }
    })

    if (!channel) {
        return res.status(404).json({ error: "Channel not found" });
    }

    const member = server.members.find((member) => member.user_id === user.user_id);

    if (!member) {
        return res.status(404).json({ error: "Member not found" });
    }

    const message = await db.message.create({
        data: {
            message_content: content,
            file_url: fileUrl,
            channel_id: channelId as string,
            member_id: member.member_id
        },
        include: {
            member: {
                include: {
                    profile: true
                }
            }
        }
    })

    const channelKey = `chat:${channelId}:messages`;

    res.socket.server.io.emit(channelKey, message);

    return res.status(200).json(message);

  } catch (error) {
    console.error("[MESSAGES_POST]", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
