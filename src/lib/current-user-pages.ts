import { db } from "./db";
import { authOptions } from "./auth";
import { NextApiRequest } from "next";
import { getToken } from "next-auth/jwt";

export const CurrentUserPages = async (req: NextApiRequest) => {
    const session = await getToken({ req, secret: authOptions.secret });
    const userId = session?.id;

    if (!userId) return null;

    const user = await db.user.findUnique({
        where: {
            user_id: userId
        }
    });
    
    return user;
}