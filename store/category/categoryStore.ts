import { create } from "zustand";
import { CategoryType } from "@/db/types";
import { immer } from "zustand/middleware/immer";

interface CategoryState {
  categories: CategoryType[];
  addCategory: (category: CategoryType) => void;
  removeCategory: (id: number) => void;
  initialCategories: (initialCategories: CategoryType[]) => void;
}
export const userCategoryStore = create<CategoryState>()(
  immer((set, get, store) => ({
    categories: [],
    addCategory: (newCategory) => {
      set((state) => {
        state.categories.push({ ...newCategory });
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
