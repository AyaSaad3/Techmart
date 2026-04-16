import { JWT } from './../../node_modules/next-auth/jwt/types.d';
import NextAuth, { DefaultSession } from "next-auth"

declare module "next-auth" {
    /**
     * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
     */
    interface Session {
        user: {
            /** The user's postal address. */
            role: string
            token: string
        } & DefaultSession["user"]
    }

    interface User {
        token: string
        role: string
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        token: string
    }
}