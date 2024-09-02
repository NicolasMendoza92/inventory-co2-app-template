import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "./lib/db";
import { getUserById } from "./data/user";
import { UserRole } from "@prisma/client";
import { getTwoFactorConfirmationByUserId } from "./data/two-factor-confirmation";
import { getAccountByUserId } from "./data/account";

export const {
  handlers: { GET, POST },
  signIn,
  signOut,
  auth,
  unstable_update: update,
} = NextAuth({
  pages:{
    signIn: "/auth/login",
    error:"/auth/error",
  },
  callbacks: {
    async signIn({ user }) {
      if (!user.id) {;
        return false;
      }
      try {
        const existingUser = await getUserById(user.id);
        // evito el sing in sin email verification 
        if (!existingUser?.emailVerified) {
          console.error("Email not verified.");
          return false;
        }

        // Add logic to 2FA
        if (existingUser.isTwoFactorEnabled) {
          const twoFactorConfirmation = await getTwoFactorConfirmationByUserId(existingUser.id);

          if (!twoFactorConfirmation) {
            console.error("Two-factor authentication not confirmed.");
            return false;
          }
          // delete 2fa for next sign in
          await db.twoFactorConfirmation.delete({
            where: { id: twoFactorConfirmation.id }
          })
        }

        return true;

      } catch (error) {
        console.error("Error during signIn callback:", error);
        return false;
      }
    },
    async session({ session, token }) {
      // El sub del token es el id del usuario, segun console.log
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }
      if (token.role && session.user) {
        session.user.role = token.role as UserRole;
      }
      if (session.user) {
        session.user.isTwoFactorEnabled = token.isTwoFactorEnabled as boolean;
      }
      if (session.user) {
        session.user.name = token.name;
        session.user.email = token.email as string;
        session.user.isOAuth = token.isOAuth as boolean;
      }
      return session;
    },
    async jwt({ token }) {
      if (!token.sub) return token;
      const existingUser = await getUserById(token.sub);
      if (!existingUser) return token;

      const existingAccount = await getAccountByUserId( existingUser.id);
      token.isOAuth = !!existingAccount;

      token.email = existingUser.email;
      token.name = existingUser.name;
      token.role = existingUser.role;
      token.isTwoFactorEnabled = existingUser.isTwoFactorEnabled

      return token;
    },
  },
  adapter: PrismaAdapter(db),
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },
  ...authConfig,
});
