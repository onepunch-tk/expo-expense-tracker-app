import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { users } from "@/db/schema/user.schema";
import { categories } from "@/db/schema/category.schema";
import { sql } from "drizzle-orm";

export const expenses = sqliteTable("expenses", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  title: text("title").notNull(),
  description: text("description"),
  amount: integer("amount").notNull(),
  createdAt: text("created_at")
    .notNull()
    .default(sql`(CURRENT_DATE)`),
  userId: integer("user_id")
    .references(() => users.id, { onDelete: "cascade" })
    .notNull(),
  categoryId: integer("category_id")
    .references(() => categories.id, { onDelete: "cascade" })
    .notNull(),
});
