import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
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
    schema: "./db/schemas",
    out: "./db/migrations",
    dialect: "postgresql",
    dbCredentials: dbCredentials,
});