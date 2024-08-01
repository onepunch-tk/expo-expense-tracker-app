import { relations } from "drizzle-orm";
import { users } from "@/db/schema/user.schema";
import { categories } from "@/db/schema/category.schema";
import { expenses } from "@/db/schema/expense.schema";

export const usersRelations = relations(users, ({ many }) => ({
  categories: many(categories),
  expenses: many(expenses),
}));
