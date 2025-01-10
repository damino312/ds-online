import { db } from "./db";

export const getOrCreateConversation = async (
  member_one_id: string,
  member_two_id: string
) => {
  const conversation = await findConversation(member_one_id, member_two_id);
  if (!conversation) {
    return createNewConversation(member_one_id, member_two_id)
  } else {
    return conversation
  }
};

const findConversation = async (
  member_one_id: string,
  member_two_id: string
) => {
  try {
    const conversation = await db.conversation.findFirst({
      where: {
        OR: [
          {
            member_one_id: member_one_id,
            member_two_id: member_two_id,
          },
          {
            member_one_id: member_two_id,
            member_two_id: member_one_id,
          },
        ],
      },
      include: {
        member_one: {
          include: {
            profile: true,
          },
        },
        member_two: {
          include: {
            profile: true,
          },
        },
      },
    });
    return conversation;
  } catch (error) {
    return null;
  }
};

const createNewConversation = async (
  member_one_id: string,
  member_two_id: string
) => {
  try {
    const conversation = await db.conversation.create({
      data: {
        member_one_id: member_one_id,
        member_two_id: member_two_id,
      },
      include: {
        member_one: {
          include: {
            profile: true,
          },
        },
        member_two: {
          include: {
            profile: true,
          },
        },
      },
    });
    return conversation;
  } catch (error) {
    return null;
  }
};
