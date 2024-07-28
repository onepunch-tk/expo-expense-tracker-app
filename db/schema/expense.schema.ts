import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const expenses = sqliteTable("expenses", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  title: text("title").notNull(),
  description: text("description"),
  expense: integer("expense").notNull(),
  date: integer("date", { mode: "timestamp" }).notNull(),
  userId: integer("user_id"),
  categoryId: integer("category_id"),
});
