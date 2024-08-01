import { create } from "zustand";
import { Category, CategoryWithExpensesCount } from "@/db/types";
import { immer } from "zustand/middleware/immer";

interface CategoryState {
  categories: CategoryWithExpensesCount[];
  addCategory: (category: Category) => void;
  removeCategory: (id: number) => void;
  initialCategories: (initialCategories: CategoryWithExpensesCount[]) => void;
}
export const userCategoryStore = create<CategoryState>()(
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
  }))
);
