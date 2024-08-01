import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { users } from "@/db/schema/user.schema";
import { categories } from "@/db/schema/category.schema";

export const expenses = sqliteTable("expenses", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  title: text("title").notNull(),
  description: text("description"),
  amount: integer("amount").notNull(),
  date: integer("date", { mode: "timestamp" }).notNull(),
  userId: integer("user_id")
    .references(() => users.id, { onDelete: "cascade" })
    .notNull(),
  categoryId: integer("category_id")
    .references(() => categories.id, { onDelete: "cascade" })
    .notNull(),
});
