import NextAuth, { DefaultSession, DefaultUser } from "next-auth";
import { JWT as DefaultJWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      login: string;
      picture: string | null;
    } & DefaultSession["user"];
  }

  interface User extends DefaultUser {
    id: string;
    login: string;
    picture: string | null;
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    id: string;
    login: string;
    picture: string | null;
  }
}
