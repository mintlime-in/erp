import { db } from "@/app/db/drizzle";
import { rolesInErp, userRolesInErp } from "@/app/db/schemas/erp";
import { eq, inArray } from "drizzle-orm";
import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google";
import MicrosoftEntraID from "next-auth/providers/microsoft-entra-id";

const getRolesAndPermissions = async (email: string) => {
    let roles = (await db.select().from(userRolesInErp).where(eq(userRolesInErp.email, email)).execute()).map((role) => role.role)
    let permissions = (await db.select().from(rolesInErp).where(inArray(rolesInErp.role, roles)).execute()).map(d => d.permission)
    return { roles, permissions }
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
            let { roles, permissions } = await getRolesAndPermissions(session.user.email)
            session.roles = roles
            session.permissions = permissions
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
        permissions: string[]
    }
}
