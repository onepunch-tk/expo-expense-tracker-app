import { drizzle } from "drizzle-orm/expo-sqlite";
import { categories } from "./schema/category.schema";
import { expenses } from "./schema/expense.schema";
import { users } from "./schema/user.schema";
import { openDatabaseSync } from "expo-sqlite/next";
import { relations } from "drizzle-orm";

export * from "./schema/user.schema";
export * from "./schema/expense.schema";
export * from "./schema/category.schema";

export const usersRelations = relations(users, ({ many }) => ({
  expenses: many(expenses),
  categories: many(categories),
}));
export const categoriesRelations = relations(categories, ({ many }) => ({
  expenses: many(expenses),
  users: many(users),
}));
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

export const expoDb = openDatabaseSync("db.db");
const schema = {
  users,
  expenses,
  categories,
  usersRelations,
  expensesRelations,
  categoriesRelations,
};

export const db = drizzle(expoDb, { logger: true, schema });
