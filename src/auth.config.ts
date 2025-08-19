import { CredentialsSignin, type NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";

import { siteConfig } from "./config/site";
import { graceHandler } from "./utils/api-utils";

const authConfig = {
  // trustHost: true,
  secret: process.env.AUTH_SECRET,
  pages: {
    signIn: "/login",
  },
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    Credentials({
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // id: "credentials",
      name: "Email Password Login",
      credentials: {
        email: { name: "email", type: "email", label: "Email", placeholder: "johndoe@gmail.com", required: true },
        password: { name: "password", type: "password", label: "Password", placeholder: "********", required: true },
      },
      authorize: graceHandler(async (credentials) => {
        // if (!credentials) return null;

        const payload = {
          email: credentials.email,
          password: credentials.password,
        };

        // TODO: implement function to call the api
        const res = await fetch(`${siteConfig.apiBaseUrl}/auth/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        const { data, error } = await res.json();
        // console.log("API Response:", data, error);

        if (!res.ok) {
          // console.error("API request error:", error);
          throw new Error(error.message);
        }

        if (data.access_token && data.user) {
          const user = {
            ...data.user,
            tokens: {
              accessToken: data.access_token,
              refreshToken: data.refresh_token,
              userId: data.user.id,
            },
          };

          return user;
        }

        return null;
      },
      async (e: any) => {
        throw new CredentialsSignin(e.message);
      },
    ),
    }),
  ],
  callbacks: {
    async signIn({ user, account, credentials }) {
      // console.log("calbacks.signIn", user, account, credentials);

      if (account?.provider === "google") {
        console.log("Login with google");
        // const res = await socialLogin({
        //   provider: "google",
        //   accessToken: account.access_token as string,
        // });
        // if (!res.ok) return false;
      }

      return true;
    },
    async jwt({ token, user, account, trigger, session }) {
      // console.log("calbacks.jwt", token, user, account, trigger, session);

      if (account?.provider === "google") {
        // const res = await socialLogin({ provider: "google", access_token: account.access_token as string });
        // const userRes = await queryClient.fetchQuery(getUserQuery(res.data.access_token))
        // return userRes ? { ...token, tokens: res.data, user: { ...userRes.data, tokens: res.data } } : token;
      }

      // if (isTokenExpired(token.tokens.access_token)) {
      //   const refreshedTokens = await refreshToken(token.tokens.refresh_token);
      //   return { ...token, tokens: refreshedTokens.data, user: token.user };
      // }

      if (user) {
        token.user = user;
        token.tokens = user.tokens;
      }

      return token;
    },
    async session({ session, token }: any) {
      // console.log("calbacks.session", session, token);

      if (token) {
        session.user = token.user;
        // session.user = {
        //   ...token.user,
        //   tokens: token.tokens,
        //   id: token.user.id.toString(),
        // };
        session.isValid = !!token.user.email;
      }

      return session;
    },
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },
  theme: {
    colorScheme: "auto", // "auto" | "dark" | "light"
    brandColor: "", // Hex color code #33FF5D
    logo: "/logo.png", // Absolute URL to image
  },
  // Enable debug messages in the console if you are having problems
  debug: process.env.NODE_ENV === "development",
} satisfies NextAuthConfig;

export default authConfig;
