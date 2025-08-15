import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import type { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    accessToken?: string;
    role?: string;
    id: string;
    is_profile_complete: boolean;
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const res = await fetch(`${process.env.API_URL}/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(credentials),
          });

          const data = await res.json();

          if (res.ok && data?.data?.access_token) {
            return {
              id: data.data.user.id,
              name: data.data.user.username,
              email: data.data.user.email,
              role: data.data.user.role,
              token: data.data.access_token,
              refreshToken: data.data.refresh_token,
              is_profile_complete: data.data.user.is_profile_complete,
            };
          }
          console.log("message", data);

          throw new Error(data.message || "Invalid email or password");
        } catch (error: any) {
          console.error("Authorization error:", error);
          throw new Error(error.message || "Authorization failed");
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, user }: { token: JWT; user?: any }) {
      if (user?.token) {
        token.accessToken = user.token;
        token.id = user.id;
        token.role = user.role;
        token.is_profile_complete = user.is_profile_complete;
      }
      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken as string;
      session.role = token.role as string;
      session.id = token.id as string;
      session.is_profile_complete = token.is_profile_complete as boolean;
      return session;
    },
  },
  secret: process.env.NEXT_AUTH_SECRET,
};