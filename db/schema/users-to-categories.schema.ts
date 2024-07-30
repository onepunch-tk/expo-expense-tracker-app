import { integer, primaryKey, sqliteTable } from "drizzle-orm/sqlite-core";
import { categories } from "./category.schema";
import { users } from "./user.schema";

export const userToCategories = sqliteTable(
  "user_categories",
  {
    userId: integer("user_id").references(() => users.id),
    categoryId: integer("category_id").references(() => categories.id),
  },
  (t) => ({ pk: primaryKey({ columns: [t.userId, t.categoryId] }) })
);
