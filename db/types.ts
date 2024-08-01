import { categories } from "@/db/schema/category.schema";
import { users } from "@/db/schema/user.schema";
import { expenses } from "@/db/schema";
import type { ExpoSQLiteDatabase } from "drizzle-orm/expo-sqlite";
import type { SQLJsDatabase } from "drizzle-orm/sql-js";

export type DbType = ExpoSQLiteDatabase | SQLJsDatabase;

export type Category = typeof categories.$inferSelect;
export type User = typeof users.$inferSelect;
export type Expense = typeof expenses.$inferSelect;

export type CategoryWithExpensesCount = Omit<Category, "userId"> & {
  expenseCount: number;
};
