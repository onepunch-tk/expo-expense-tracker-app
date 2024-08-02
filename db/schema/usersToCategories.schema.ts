import { integer, sqliteTable } from "drizzle-orm/sqlite-core";
import { users } from "@/db/schema/user.schema";
import { categories } from "@/db/schema/category.schema";
import { primaryKey } from "drizzle-orm/sqlite-core/primary-keys";

export const usersToCategories = sqliteTable(
  "users_to_categories",
  {
    userId: integer("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    categoryId: integer("category_id")
      .notNull()
      .references(() => categories.id, { onDelete: "cascade" }),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.userId, table.categoryId] }),
  })
);
