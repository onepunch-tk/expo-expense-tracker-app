/*
* type Expense = {
  id: string;
  category: string;
  description: string;
  iconName: string;
  title: string;
  expense: number;
  date: string;
};

type ExpenseGroup = {
  sortDate: Date;
  expenses: Expense[];
};
* */

import { CreatedExpense, Expense } from "@/db/types";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

// 년과 월만을 나타내는 커스텀 타입
type YearMonth = {
  year: number;
  month: number; // 0-11 범위의 월
};

export type SelectedDate = "all" | string;

export type ExpenseGroup = {
  sortDate: YearMonth;
  expenses: Expense[];
};

interface ExpenseState {
  expenseGroup: ExpenseGroup[];
  selectedCategoryId: number;
  selectedDate: SelectedDate;
  initializeExpenseGroup: (initializeExpenses: Expense[]) => void;
  addExpense: (createdExpense: CreatedExpense | undefined) => void;
  setSelectedDate: (date: SelectedDate) => void;
  setSelectedCategoryId: (categoryId: number) => void;
  getFilteredExpenses: () => ExpenseGroup[];
  deleteExpenseFromCategoryId: (categoryId: number) => void;
}

// 'YYYY-MM' 문자열에서 YearMonth 객체 생성
const getSortDate = (stringDate: string): YearMonth => {
  const [year, month] = stringDate.split("-").map(Number);
  return { year, month }; // JavaScript의 월은 0-11 범위
};

// YearMonth 객체를 'YYYY-MM' 문자열로 변환
const castStringDateFromSortDate = (yearMonth: YearMonth): string => {
  return `${yearMonth.year}-${String(yearMonth.month).padStart(2, "0")}`;
};

// YearMonth 객체 비교 함수
const compareYearMonth = (a: YearMonth, b: YearMonth): number => {
  if (a.year !== b.year) return a.year - b.year;
  return b.month - a.month;
};

export const useExpenseStore = create<ExpenseState>()(
  immer((set, get) => ({
    expenseGroup: [],
    selectedCategoryId: -1,
    selectedDate: "all",
    initializeExpenseGroup: (initializeExpenses) => {
      set((state) => {
        state.expenseGroup = initializeExpenses.reduce((acc, value) => {
          const sortDate = getSortDate(value.createdAt);
          const updateGroupKey = castStringDateFromSortDate(sortDate);
          const findGroup = acc.find(
            (a) => castStringDateFromSortDate(a.sortDate) === updateGroupKey
          );
          if (findGroup) {
            findGroup.expenses.push(value);
          } else {
            const updateExpenseGroup: ExpenseGroup = {
              sortDate,
              expenses: [value],
            };
            acc.push(updateExpenseGroup);
          }
          return acc;
        }, Array.from<ExpenseGroup>([]));
      });
    },
    addExpense: (createdExpense) => {
      if (!createdExpense) {
        return;
      }
      const sortDate = getSortDate(createdExpense.createdAt);
      console.log("getKeyString: ", sortDate);
      const compareKey = castStringDateFromSortDate(sortDate);
      console.log("newGroupKey: ", compareKey);
      set((state) => {
        const findExpenseGroup = state.expenseGroup.find(
          (eg) => castStringDateFromSortDate(eg.sortDate) === compareKey
        );
        if (findExpenseGroup) {
          findExpenseGroup.expenses = [
            createdExpense,
            ...findExpenseGroup.expenses,
          ];
        } else {
          state.expenseGroup.push({
            sortDate,
            expenses: [createdExpense],
          });
        }
      });
    },
    deleteExpenseFromCategoryId: (categoryId) => {
      const { expenseGroup } = get();
      set((state) => {
        state.expenseGroup = expenseGroup.reduce((acc, value) => {
          const filteredExpenses = value.expenses.filter(
            (exp) => exp.categoryId !== categoryId
          );
          acc.push({ sortDate: value.sortDate, expenses: filteredExpenses });
          return acc;
        }, Array.from<ExpenseGroup>([]));
      });
    },
    setSelectedCategoryId: (categoryId) => {
      set({ selectedCategoryId: categoryId });
    },
    setSelectedDate: (selectedDate) => {
      set({ selectedDate });
    },
    getFilteredExpenses: () => {
      const { expenseGroup, selectedCategoryId, selectedDate } = get();

      return expenseGroup.reduce((acc, value) => {
        // Initialize inclusion flag
        // 포함 여부 플래그 초기화
        let shouldInclude = true;

        //category filtering check
        // Check if any expense in this group matches the selected category
        // 이 그룹에 선택된 카테고리("ALL" 이 아닌 경우)와 일치하는 지출이 하나라도 있는지 확인
        if (selectedCategoryId !== -1) {
          shouldInclude = value.expenses.some(
            (exp) => exp.categoryId === selectedCategoryId
          );
        }

        //date filtering check
        // If a specific date is selected, check if this group's date matches
        // 특정 날짜가 선택됐으면("all" 이 아니면), 이 그룹의 날짜가 일치하는지(그룹의 "sortDate") 확인
        if (selectedDate !== "all") {
          const groupKey = castStringDateFromSortDate(value.sortDate);
          shouldInclude = shouldInclude && groupKey === selectedDate;
        }

        if (shouldInclude) {
          const filteredExpenses =
            selectedCategoryId !== -1
              ? value.expenses.filter(
                  (exp) => exp.categoryId === selectedCategoryId
                )
              : value.expenses;

          acc.push({
            sortDate: value.sortDate,
            expenses: filteredExpenses,
          });
        }

        return acc;
      }, Array.from<ExpenseGroup>([]));
    },
  }))
);
