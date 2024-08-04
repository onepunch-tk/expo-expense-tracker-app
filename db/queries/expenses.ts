import { ExpoDbType, SQLJsDbType } from "@/db/dirzzle";
import { Expense, InsertExpenseSchema, NewExpense } from "@/db/types";
import { desc, eq } from "drizzle-orm";
import { expenses } from "@/db/schema";
import { protect } from "@/db/queries/helpers";
import { z } from "zod";

const getExpensesQuery = async (
  db: ExpoDbType | SQLJsDbType,
  userId: number
): Promise<Expense[]> => {
  return db.query.expenses.findMany({
    where: eq(expenses.userId, userId),
    orderBy: [desc(expenses.createdAt), desc(expenses.id)],
  });
};

export const getExpenses = protect(getExpensesQuery, z.tuple([z.number()]));

const createExpenseQuery = async (
  db: ExpoDbType | SQLJsDbType,
  newExpense: NewExpense
): Promise<Expense | undefined> => {
  const createdExpenses = await db
    .insert(expenses)
    .values(newExpense)
    .returning();
  return createdExpenses ? createdExpenses.pop() : undefined;
};

export const createExpense = protect(
  createExpenseQuery,
  z.tuple([InsertExpenseSchema])
);
