import { UserRole } from "@prisma/client";
import NextAuth , {type DefaultSession} from "next-auth";
import { JWT} from "next-auth/jwt"

export type ExtendedUser = DefaultSession["user"] & {
    role: "ADMIN" | "USER"
}

declare module "next-auth" {
    interface Session {
      user: {
        role: UserRole
      } 
    }
  }

  declare module "next-auth/jwt" {
    interface JWT {
        role?: "ADMIN" | "USER"
    }
  }