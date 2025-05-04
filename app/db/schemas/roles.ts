import { pgTable, serial, text, date, unique } from 'drizzle-orm/pg-core';

export const rolesTable = pgTable('roles', {
  id: serial('id').primaryKey(),
  email: text('email').notNull(),
  role: text('role').notNull(),
  createdAt: date('created_at').defaultNow(),
}, (t) => [
  unique().on(t.email, t.role)
]);

export type InsertRole = typeof rolesTable.$inferInsert;
export type SelectRole = typeof rolesTable.$inferSelect;;
