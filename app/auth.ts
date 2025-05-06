import { db } from "@/app/db/drizzle";
import { rolesInErp } from "@/app/db/schemas/erp";
import { eq } from "drizzle-orm";
import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google";
import MicrosoftEntraID from "next-auth/providers/microsoft-entra-id";

const getRoles = async (email: string) => {
    return (await db.select().from(rolesInErp).where(eq(rolesInErp.email, email)).execute()).map((role) => role.role)
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
        }),
        MicrosoftEntraID({
            clientId: process.env.AUTH_MICROSOFT_ENTRA_ID_ID,
            clientSecret: process.env.AUTH_MICROSOFT_ENTRA_ID_SECRET,
            issuer: process.env.AUTH_MICROSOFT_ENTRA_ID_ISSUER,
        }),
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
