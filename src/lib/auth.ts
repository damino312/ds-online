import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { db } from "./db";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { compare } from "bcrypt";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db),
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        login: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        console.log(123);
        if (!credentials?.login || !credentials?.password) {
          return null;
        }
        const user = await db.user.findFirst({
          where: {
            user_login: credentials.login,
          },
        });
        if (!user) {
          return null;
        }
        const match = await compare(credentials.password, user.user_password);
        if (!match) {
          return null;
        }

        return {
          id: user.user_id, // Add this line to include the 'id' property
          login: user.user_login,
          picture: user.user_picture,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      // When user signs in, add their information to the token
      if (user) {
        token.id = user.id; // Make sure it matches what you return in 'authorize'
        token.login = user.login;
        token.picture = user.picture;
      }
      return token;
    },
    async session({ session, token }) {
      // Assign the user information to the session object
      session.user = {
        ...session.user,
      };
      return session;
    },
  },
};
