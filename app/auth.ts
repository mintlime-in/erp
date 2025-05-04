import { db } from "@/app/db/drizzle";
import { rolesTable } from "@/app/db/schemas/roles";
import { eq } from "drizzle-orm";
import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google";

const getRoles = async (email: string) => {
    return (await db.select().from(rolesTable).where(eq(rolesTable.email, email)).execute()).map((role) => role.role)
}

export const { handlers, signIn, signOut, auth } = NextAuth({
    logger: {
        error: (e) => console.error(e),
        debug: (e) => console.log(e),
        warn: (e) => console.warn(e),
    },
    session: {
        strategy: "jwt"
    },
    theme: {
        colorScheme: "dark",
        logo: "/api/images?name=logo-min.png",
    },
    providers: [
        GoogleProvider({
            clientId: (process.env.GOOGLE_CLIENT_ID) as string,
            clientSecret: (process.env.GOOGLE_CLIENT_SECRET) as string,
        })
    ],
    callbacks: {
        async session({ session, token }) {
            session.roles = await getRoles(session.user.email)
            return session
        },
        redirect({ url, baseUrl }) {
            return "/dashboard"
        }
    }
})

declare module "next-auth" {
    interface Session {
        roles: string[];
    }
}
