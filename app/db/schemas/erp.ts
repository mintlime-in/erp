import { pgTable, serial, text, date, customType, PgSchema, unique } from 'drizzle-orm/pg-core';

const bytea = customType<{ data: Array<number> }>({
  dataType() {
    return 'BYTEA';
  },
});

export const erp = new PgSchema("erp");

export const imagesInErp = erp.table('images', {
  id: serial('id').primaryKey(),
  name: text('name').notNull().unique(),
  data: bytea('data').notNull(),
  createdAt: date('created_at').defaultNow(),
});

export type InsertImagesInErp = typeof imagesInErp.$inferInsert;
export type SelectImagesInErp = typeof imagesInErp.$inferSelect;

export const usersInErp = erp.table('users', {
  id: serial('id').primaryKey(),
  email: text('email').notNull().unique(),
  name: text('name').notNull(),
  createdAt: date('created_at').defaultNow(),
});

export type InsertUsersInErp = typeof usersInErp.$inferInsert;
export type SelectUsersInErp = typeof usersInErp.$inferSelect;

export const rolesInErp = erp.table('roles', {
  id: serial('id').primaryKey(),
  email: text('email').notNull().references(() => usersInErp.email),
  role: text('role').notNull(),
  createdAt: date('created_at').defaultNow(),
}, (t) => [
  unique().on(t.email, t.role)
]);

export type InsertRolesInErp = typeof rolesInErp.$inferInsert;
export type SelectRolesInErp = typeof rolesInErp.$inferSelect;;
