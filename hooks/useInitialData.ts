import { ExpoDbType, SQLJsDbType } from "@/db/dirzzle";
import { getCategories } from "@/db/queries/categories";
import { getExpenses } from "@/db/queries/expenses";
import { useEffect, useState } from "react";
import { CategoryWithExpensesCount, Expense } from "@/db/types";

export const useInitialData = (
  db: ExpoDbType | SQLJsDbType | null,
  userId: number,
  initialCategories: (initialCategories: CategoryWithExpensesCount[]) => void,
  initializeExpenseGroup: (initializeExpenses: Expense[]) => void
) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const { data: dbCategories } = await getCategories(db, userId);
        if (dbCategories?.length) {
          initialCategories(dbCategories);
        }
        const { data: dbExpenses } = await getExpenses(db, userId);
        if (dbExpenses?.length) {
          initializeExpenseGroup(dbExpenses);
        }
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [db, userId, initialCategories, initializeExpenseGroup]);

  return { isLoading, error };
};
