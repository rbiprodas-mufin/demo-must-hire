import NextAuth from "next-auth";
import { authOptions } from "./auth-option";

export const { signIn, signOut, auth: authSession } = NextAuth(authOptions);
