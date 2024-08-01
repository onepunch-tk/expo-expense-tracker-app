import { relations } from "drizzle-orm";
import { expenses } from "@/db/schema/expense.schema";
import { users } from "@/db/schema/user.schema";
import { categories } from "@/db/schema/category.schema";

export const expensesRelations = relations(expenses, ({ one }) => ({
  user: one(users, {
    fields: [expenses.userId],
    references: [users.id],
  }),
  category: one(categories, {
    fields: [expenses.categoryId],
    references: [categories.id],
  }),
}));
