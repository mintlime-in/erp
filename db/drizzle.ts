import { drizzle } from 'drizzle-orm/node-postgres';
import { dbCredentials } from "../drizzle.config";
import { Pool } from 'pg';

export const db = drizzle({
  client: new Pool(dbCredentials),
  logger: true,
});


