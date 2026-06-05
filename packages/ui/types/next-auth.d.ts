import type { DefaultSession } from "next-auth"

declare module "next-auth" {
  interface Session {
    user: { isPaidUser: boolean } & DefaultSession["user"]
  }
}
