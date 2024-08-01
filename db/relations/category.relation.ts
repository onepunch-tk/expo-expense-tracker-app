import { categories } from "@/db/schema/category.schema";
import { relations } from "drizzle-orm";
import { users } from "@/db/schema/user.schema";
import { expenses } from "@/db/schema/expense.schema";

export const categoriesRelations = relations(categories, ({ one, many }) => ({
  user: one(users, {
    fields: [categories.userId],
    references: [users.id],
  }),
  expenses: many(expenses),
}));
