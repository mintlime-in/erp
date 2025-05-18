import { db } from "@/app/db/drizzle";
import { rolesInErp, userRolesInErp, usersInErp } from "@/app/db/schemas/erp";
import { eq, inArray } from "drizzle-orm";
import NextAuth, { DefaultSession } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import MicrosoftEntraID from "next-auth/providers/microsoft-entra-id";
import { redirect } from "next/navigation";

async function getUser(email: string) {
    const user = await db.select().from(usersInErp).where(eq(usersInErp.email, email)).execute()
    const userId = user[0]?.userid;
    let roles = (await db.select().from(userRolesInErp).where(eq(userRolesInErp.userid, userId)).execute()).map((role) => role.role)
    return { userId, roles }
}

export function clientSignIn() {
    redirect("/api/auth/signin")
}

export function clientSignOut() {
    redirect("/api/auth/signout")
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
    },
    providers: [
        Credentials({
            credentials: {
                email: {
                    type: "email",
                    label: "Email",
                    placeholder: "johndoe@gmail.com",
                },
                password: {
                    type: "password",
                    label: "Password",
                    placeholder: "*****",
                },
            },
            authorize: async (credentials, req) => {
                const { email, password } = credentials as { email: string; password: string };
                if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
                    return {
                        userid: "admin",
                        name: "ADMIN",
                        email: process.env.ADMIN_EMAIL,
                        roles: ["admin"],
                    }
                }
                return null
            }
        }),
        GoogleProvider({
            clientId: (process.env.GOOGLE_CLIENT_ID) as string,
            clientSecret: (process.env.GOOGLE_CLIENT_SECRET) as string,
            async profile(profile) {
                const user = await getUser(profile.email as string)
                return {
                    id: profile.sub,
                    userid: user.userId,
                    name: profile.name,
                    email: profile.email,
                    image: profile.picture,
                    roles: user.roles
                }
            }
        }),
        MicrosoftEntraID({
            clientId: process.env.AUTH_MICROSOFT_ENTRA_ID_ID,
            clientSecret: process.env.AUTH_MICROSOFT_ENTRA_ID_SECRET,
            issuer: process.env.AUTH_MICROSOFT_ENTRA_ID_ISSUER,
            async profile(profile) {
                const user = await getUser(profile.email as string)
                return {
                    id: profile.sub,
                    userid: user.userId,
                    name: profile.name,
                    email: profile.email,
                    image: profile.picture,
                    roles: user.roles
                }
            }
        }),
    ],
    callbacks: {
        async session({ session, token }) {
            session.user.roles = token.roles as string[]; // Make role available in session
            session.user.userid = token.userid as string;
            return session;
        },
        async jwt({ token, user }) {
            if (user) {
                token.roles = user.roles; // Store role in token
                token.userid = user.userid;
            }
            return token;
        },
        redirect({ url, baseUrl }) {
            return "/dashboard"
        },
        async signIn({ user, account, profile, email, credentials }) {
            return user.userid ? true : false
        }
    }
})

declare module "next-auth" {
    interface User {
        userid?: string;
        roles?: string[];
        permissions?: string[];
    }

    interface Session {
        user: {
            userid?: string;
            id?: string;
            roles?: string[];
        } & DefaultSession["user"];
    }
}
