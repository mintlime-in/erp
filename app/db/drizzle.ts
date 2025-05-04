import { drizzle } from 'drizzle-orm/node-postgres';
import { dbCredentials } from "./drizzle.config";
import { Pool } from 'pg';

export const pool = new Pool(dbCredentials)

export const db = drizzle({
  client: pool,
  logger: true,
});


