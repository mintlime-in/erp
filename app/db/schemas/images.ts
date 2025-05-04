import { pgTable, serial, text, date, customType } from 'drizzle-orm/pg-core';

const customByteA = customType<{ data: Array<number> }>({
  dataType() {
    return 'BYTEA';
  },
});

export const imagesTable = pgTable('images', {
  id: serial('id').primaryKey(),
  name: text('name').notNull().unique(),
  data: customByteA('data').notNull(),
  createdAt: date('created_at').defaultNow(),
});

export type InsertRole = typeof imagesTable.$inferInsert;
export type SelectRole = typeof imagesTable.$inferSelect;;


