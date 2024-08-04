import { create } from "zustand";
import { Category, CategoryWithExpensesCount } from "@/db/types";
import { immer } from "zustand/middleware/immer";

interface CategoryState {
  categories: CategoryWithExpensesCount[];
  addCategory: (category: Category) => void;
  removeCategory: (id: number) => void;
  initialCategories: (initialCategories: CategoryWithExpensesCount[]) => void;
  updateExpenseCount: (categoryId: number) => void;
}
export const useCategoryStore = create<CategoryState>()(
  immer((set, get, store) => ({
    categories: [],
    addCategory: (newCategory) => {
      set((state) => {
        state.categories.push({ ...newCategory, expenseCount: 0 });
      });
    },
    removeCategory: (id) => {
      set((state) => {
        state.categories = state.categories.filter((c) => c.id !== id);
      });
    },
    initialCategories: (initialCategories) => {
      set((state) => {
        state.categories = initialCategories;
      });
    },
    updateExpenseCount: (categoryId) => {
      set((state) => {
        const updateCategory = state.categories.find(
          (cat) => cat.id === categoryId
        );
        if (updateCategory) {
          updateCategory.expenseCount = updateCategory.expenseCount + 1;
        }
      });
    },
  }))
);
