import NextAuth, { DefaultSession, DefaultUser } from "next-auth";
import { JWT as DefaultJWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: AuthUser | null;
  }

  interface User extends AuthUser {}
}

declare module "next-auth/jwt" {
  interface JWT extends AuthUser {}
}

export type AuthUser = {
  id: string;
  login: string;
};
