import { pgTable, serial, text, date, unique, PgSchema } from 'drizzle-orm/pg-core';

export const crp = new PgSchema("erp");

export const rolesTable = crp.table('roles', {
  id: serial('id').primaryKey(),
  email: text('email').notNull(),
  role: text('role').notNull(),
  createdAt: date('created_at').defaultNow(),
}, (t) => [
  unique().on(t.email, t.role)
]);

export type InsertRole = typeof rolesTable.$inferInsert;
export type SelectRole = typeof rolesTable.$inferSelect;;
