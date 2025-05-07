import { sql } from 'drizzle-orm';
import { pgTable, serial, text, customType, PgSchema, unique, timestamp } from 'drizzle-orm/pg-core';

const bytea = customType<{ data: Array<number> }>({
  dataType() {
    return 'BYTEA';
  },
});

export const erp = new PgSchema("erp");
/**
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 *  @description Images table
 * 
*/
export const imagesInErp = erp.table('images', {
  id: serial('id').primaryKey(),
  name: text('name').notNull().unique(),
  data: bytea('data').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
});
export type InsertImagesInErp = typeof imagesInErp.$inferInsert;
export type SelectImagesInErp = typeof imagesInErp.$inferSelect;
/**
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 *  @description Users table
 * 
*/
export const usersInErp = erp.table('users', {
  id: serial('id').primaryKey(),
  email: text('email').notNull().unique(),
  name: text('name').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
});
export type InsertUsersInErp = typeof usersInErp.$inferInsert;
export type SelectUsersInErp = typeof usersInErp.$inferSelect;
/**
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * @description Permissions table
 * 
*/
export const permissionsInErp = erp.table('permissions', {
  id: serial('id').primaryKey(),
  permission: text('permission').notNull().unique(),
  createdAt: timestamp('created_at').defaultNow(),
});
export type InsertPermissionsInErp = typeof permissionsInErp.$inferInsert;
export type SelectPermissionsInErp = typeof permissionsInErp.$inferSelect;
/**
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * @description User Roles Mapping table
 * 
*/
export const rolesInErp = erp.table('roles', {
  id: serial('id').primaryKey(),
  role: text('role').notNull(),
  permission: text('permission').notNull().references(() => permissionsInErp.permission),
  createdAt: timestamp('created_at').defaultNow(),
}, (t) => [
  unique().on(t.role, t.permission,)
]);
export type InsertRolesInErp = typeof rolesInErp.$inferInsert;
export type SelectRolesInErp = typeof rolesInErp.$inferSelect;
/**
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * @description User Roles Mapping table
*/
export const userRolesInErp = erp.table('user_roles', {
  id: serial('id').primaryKey(),
  email: text('email').notNull().references(() => usersInErp.email),
  role: text('role').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
}, (t) => [
  unique().on(t.email, t.role)
]);
export type InsertUserRolesInErp = typeof userRolesInErp.$inferInsert;
export type SelectUserRolesInErp = typeof userRolesInErp.$inferSelect;
