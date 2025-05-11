import { sql } from 'drizzle-orm';
import { pgTable, serial, text, customType, PgSchema, unique, timestamp, json } from 'drizzle-orm/pg-core';

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
  userid: text('userid').notNull().unique(),
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
  userid: text('userid').notNull().references(() => usersInErp.userid),

  role: text('role').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
}, (t) => [
  unique().on(t.userid, t.role)
]);
export type InsertUserRolesInErp = typeof userRolesInErp.$inferInsert;
export type SelectUserRolesInErp = typeof userRolesInErp.$inferSelect;
/**
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * @description User Settings table
*/
export const userSettingsInErp = erp.table('user_settings', {
  id: serial('id').primaryKey(),
  userid: text('userid').notNull().references(() => usersInErp.userid),
  settings: json('settings').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
}, (t) => [
  unique().on(t.userid, t.settings)
]);
export type InsertUserSettingsInErp = typeof userSettingsInErp.$inferInsert;
export type SelectUserSettingsInErp = typeof userSettingsInErp.$inferSelect;
/**
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * @description Campus table
*/
export const campusInErp = erp.table('campus', {
  id: serial('id').primaryKey(),
  campusId: text('campusId').notNull().unique(),
  name: text('name'),
  createdAt: timestamp('created_at').defaultNow(),
});
export type InsertCampusInErp = typeof campusInErp.$inferInsert;
export type SelectCampusInErp = typeof campusInErp.$inferSelect;
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
 * @description Department table
*/
export const departmentInErp = erp.table('department', {
  id: serial('id').primaryKey(),
  departmentId: text('departmentId').notNull().unique(),
  name: text('name').notNull(),
  campusId: text('campusId').notNull().references(() => campusInErp.campusId),
  createdAt: timestamp('created_at').defaultNow(),
}, (t) => [
  unique().on(t.departmentId, t.campusId)
]);
export type InsertDepartmentInErp = typeof departmentInErp.$inferInsert;
export type SelectDepartmentInErp = typeof departmentInErp.$inferSelect;
/**
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * @description Programme table
*/
export const programmeInErp = erp.table('programme', {
  id: serial('id').primaryKey(),
  degree: text('degree').notNull(),
  programme: text('programmeId').notNull(),
  specialization: text('specialization').notNull(),
  programmeName: text('programmeName').notNull(),
  departmentId: text('departmentId').notNull().references(() => departmentInErp.departmentId),
  createdAt: timestamp('created_at').defaultNow(),
}, (t) => [
  unique().on(t.degree, t.programme, t.specialization, t.departmentId)
]);
export type InsertProgrammeInErp = typeof programmeInErp.$inferInsert;
export type SelectProgrammeInErp = typeof programmeInErp.$inferSelect;
/**
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * @description Paper table
*/
export const paperInErp = erp.table('paper', {
  id: serial('id').primaryKey(),
  paperId: text('paperId').notNull(),
  paperName: text('paperName').notNull(),
  programmeId: text('programmeId').notNull().references(() => programmeInErp.programme),
  createdAt: timestamp('created_at').defaultNow(),
}, (t) => [
  unique().on(t.paperId, t.programmeId)
]);