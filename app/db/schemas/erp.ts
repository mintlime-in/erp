import { sql } from 'drizzle-orm';
import { pgTable, serial, text, customType, PgSchema, unique, timestamp, json, primaryKey, foreignKey } from 'drizzle-orm/pg-core';

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
 *  @description Users table
 * 
*/
export const usersInErp = erp.table('users', {
  id: text('id').primaryKey(),
  email: text('email').notNull().unique(),
  name: text('name').notNull(),
  image: bytea('image').notNull(),
  status: text('status'),
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
 * @description User Roles Mapping table
*/
export const userRolesInErp = erp.table('user_roles', {
  id: serial('id').primaryKey(),
  userId: text('user_id').notNull().references(() => usersInErp.id),
  role: text('role').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
}, (t) => [
  unique().on(t.userId, t.role)
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
 * 
 * @description Campus table
*/
export const campusInErp = erp.table('campus', {
  id: text('id').primaryKey(),
  name: text('name').notNull().unique(),
  address: text('address'),
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
  id: text('id'),
  name: text('name').notNull(),
  campusId: text('campus_id').notNull().references(() => campusInErp.id),
  hodUserId: text('hod_user_id').references(() => usersInErp.id),
  createdAt: timestamp('created_at').defaultNow(),
}, (t) => [
  primaryKey({
    columns: [t.id, t.campusId],
  }),
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
  degree: text('degree').notNull(), // UG/PG/PGD/PhD
  programme: text('programme').notNull(), // B.Tech/M.Tech/MBA/PhD
  specialization: text('specialization').notNull(), // CSE/IT/ME/CE
  programmeName: text('programme_name').notNull(), // B.Tech in CSE
  totalSemester: text('total_semester').notNull(),
  durationInYears: text('duration').notNull(),
  departmentId: text('department_id').notNull(),
  campusId: text('campus_id').notNull(),
  status: text('status').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
}, (t) => [
  unique().on(t.degree, t.programme, t.specialization, t.departmentId, t.campusId),
  foreignKey({
    columns: [t.departmentId, t.campusId],
    foreignColumns: [departmentInErp.id, departmentInErp.campusId],
  }),
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
  code: text('code').notNull(),
  paperName: text('paperName').notNull(),
  semester: text('semester').notNull(),
  programmeId: text('programme_id').notNull().references(() => programmeInErp.id),
  departmentId: text('department_id').notNull(),
  campusId: text('campus_id').notNull(),
  status: text('status').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
}, (t) => [
  unique().on(t.programmeId, t.semester, t.code),
  foreignKey({
    columns: [t.departmentId, t.campusId],
    foreignColumns: [departmentInErp.id, departmentInErp.campusId],
  }),
]);