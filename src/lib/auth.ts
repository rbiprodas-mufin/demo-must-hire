import NextAuth, { CredentialsSignin } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import { authConfig } from "~/config/auth";
import { credentialLogin } from "~/features/auth/apis/services";
import { ITokenResponse, IUser } from "~/types";
import { graceHandler } from "~/utils/api-utils";

export const { handlers, signIn, signOut, auth: authSession } = NextAuth({
  secret: authConfig.secret,
  pages: {
    signIn: "/login",
  },
  providers: [
    Google({
      clientId: authConfig.googleClientId,
      clientSecret: authConfig.googleClientSecret,
    }),
    Credentials({
      id: "credentials",
      name: "Email Password Login",
      credentials: {
        email: {
          name: "email",
          type: "email",
          label: "Email",
          placeholder: "johndoe@gmail.com",
          required: true
        },
        password: {
          name: "password",
          type: "password",
          label: "Password",
          placeholder: "********",
          required: true
        },
      },
      authorize: graceHandler(async (credentials) => {
        if (!credentials) return null;

        const payload = {
          email: credentials.email,
          password: credentials.password,
        };

        const { data, success, message } = await credentialLogin(payload);
        // console.log("API Response:", data, success, message);

        if (!success) {
          throw new Error(message || "Invalid credentials");
        }

        if (!data.access_token || !data.user) return null;

        return {
          id: data.user.id,
          email: data.user.email,
          username: data.user.username,
          role: data.user.role,
          is_active: data.user.is_active,
          is_email_verified: data.user.is_email_verified,
          is_profile_complete: data.user.is_profile_complete,
          tokens: {
            accessToken: data.access_token,
            refreshToken: data.refresh_token,
            userId: data.user.id,
          },
        };
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

      // if (account?.provider === "google") {
      //   const res = await socialLogin({ provider: "google", access_token: account.access_token as string });
      //   const userRes = await queryClient.fetchQuery(getUserQuery(res.data.access_token))
      //   return userRes ? { ...token, tokens: res.data, user: { ...userRes.data, tokens: res.data } } : token;
      // }

      // if (isTokenExpired(token.tokens.access_token)) {
      //   const refreshedTokens = await refreshToken(token.tokens.refresh_token);
      //   return { ...token, tokens: refreshedTokens.data, user: token.user };
      // }

      // Handle session update trigger
      if (trigger === "update" && session) {
        // Merge the updated session data
        if (session.user) {
          token.user = { ...(token.user || {}), ...session.user } as IUser;
        }
        if (session.tokens) {
          token.tokens = { ...(token.tokens || {}), ...session.tokens } as ITokenResponse;
        }
      }

      if (user) {
        const { tokens, ...restUser } = user;
        token.user = restUser as IUser;
        token.tokens = tokens;
      }

      return token;
    },
    async session({ session, token }) {
      // console.log("calbacks.session", session, token);

      // token from jwt callback
      if (token) {
        session.user = token.user as IUser;
        session.isAuthenticated = true;
        session.isValid = !!(token.user as IUser).email;
        session.tokens = token.tokens as ITokenResponse;
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
});
