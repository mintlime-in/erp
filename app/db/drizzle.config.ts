import { defineConfig } from "drizzle-kit";

export const dbCredentials = {
    host: process.env.DB_HOST!,
    port: parseInt((process.env.DB_PORT!) as string),
    user: process.env.DB_USERNAME!,
    password: process.env.DB_PASSWORD!,
    database: process.env.DB_DB!,
    ssl: false
}

export default defineConfig({
    migrations: {
        schema: "drizzle"
    },
    schema: "app/db/schemas",
    out: "app/db/migrations",
    dialect: "postgresql",
    dbCredentials: dbCredentials,
});