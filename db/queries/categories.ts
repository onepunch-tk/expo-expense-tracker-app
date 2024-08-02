import { categories, usersToCategories } from "@/db/schema";
import { CategoryWithExpensesCount } from "@/db/types";
import { protect } from "@/db/queries/helpers";
import { ExpoDbType, SQLJsDbType } from "@/db/dirzzle";
import { eq } from "drizzle-orm";
import { z } from "zod";

const DEFAULT_CATEGORIES = [
  {
    name: "food/drink",
    ionicIconName: "fast-food-outline",
    description:
      "Expenses related to groceries, eating out, beverages, and snacks.",
    isDefault: true,
  },
  {
    name: "clothing/shoes",
    ionicIconName: "shirt-outline",
    description: "Purchases of clothing items, footwear, and accessories.",
    isDefault: true,
  },
  {
    name: "transport",
    ionicIconName: "car-outline",
    description:
      "Costs associated with public transportation, fuel, vehicle maintenance, and ride-sharing services.",
    isDefault: true,
  },
  {
    name: "education",
    ionicIconName: "book-outline",
    description:
      "Expenses for tuition, books, courses, workshops, and educational materials.",
    isDefault: true,
  },
  {
    name: "gifts/donations",
    ionicIconName: "gift-outline",
    description:
      "Money spent on presents for others or charitable contributions.",
    isDefault: true,
  },
  {
    name: "entertainment",
    ionicIconName: "game-controller-outline",
    description:
      "Costs for leisure activities, such as movies, concerts, gaming, and hobbies.",
    isDefault: true,
  },
  {
    name: "house",
    ionicIconName: "construct-outline",
    description:
      "Expenses related to rent/mortgage, utilities, home maintenance, and household items.",
    isDefault: true,
  },
];

// category: {
//   extras: {
//     expenseCount: sql<number>`count(${eq(
//       expenses.categoryId,
//       categories.id
//     )})`.as("expense_count"),
//   },
// },

export const getCategoriesQuery = async (
  db: ExpoDbType | SQLJsDbType,
  userId: number
): Promise<CategoryWithExpensesCount[]> => {
  const result = await db.query.usersToCategories.findMany({
    where: (utc) => eq(utc.userId, userId),
    with: {
      category: {
        with: {
          expenses: true,
        },
      },
    },
  });
  return result.map((r) => ({
    id: r.category.id,
    name: r.category.name,
    ionicIconName: r.category.ionicIconName,
    isDefault: r.category.isDefault,
    expenseCount: r.category.expenses.length,
  }));
};

export const getCategories = protect(getCategoriesQuery, z.tuple([z.number()]));

const initializeCategoriesQuery = async (
  db: ExpoDbType | SQLJsDbType
): Promise<void> => {
  await db.insert(categories).values(DEFAULT_CATEGORIES).onConflictDoNothing();
};

export const initializeCategories = protect(initializeCategoriesQuery);

const insertUsersToCategoriesQuery = async (
  db: ExpoDbType | SQLJsDbType,
  userId: number
) => {
  await db.transaction(async (tx) => {
    try {
      const defaultCategories = await tx.query.categories.findMany({
        where: eq(categories.isDefault, true),
      });
      for (const category of defaultCategories) {
        await tx
          .insert(usersToCategories)
          .values({ categoryId: category.id, userId });
      }
    } catch (e) {
      console.error(e);
    }
  });
};

export const insertUsersToCategories = protect(
  insertUsersToCategoriesQuery,
  z.tuple([z.number()])
);
