import { pgTable, serial, text, date, customType, PgSchema } from 'drizzle-orm/pg-core';

const customByteA = customType<{ data: Array<number> }>({
  dataType() {
    return 'BYTEA';
  },
});

const crp = new PgSchema("erp");

export const imagesTable = crp.table('images', {
  id: serial('id').primaryKey(),
  name: text('name').notNull().unique(),
  data: customByteA('data').notNull(),
  createdAt: date('created_at').defaultNow(),
});

export type InsertRole = typeof imagesTable.$inferInsert;
export type SelectRole = typeof imagesTable.$inferSelect;;


