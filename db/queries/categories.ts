import { categories, expenses, usersToCategories } from "@/db/schema";
import {
  Category,
  CategoryWithExpensesCount,
  InsertCategorySchema,
  NewCategory,
} from "@/db/types";
import { protect } from "@/db/queries/helpers";
import { ExpoDbType, SQLJsDbType } from "@/db/dirzzle";
import { and, eq } from "drizzle-orm";
import { z } from "zod";

const DEFAULT_CATEGORIES = [
  {
    name: "food/drink",
    ionIconName: "fast-food-outline",
    isDefault: true,
  },
  {
    name: "clothing/shoes",
    ionIconName: "shirt-outline",
    isDefault: true,
  },
  {
    name: "transport",
    ionIconName: "car-outline",
    isDefault: true,
  },
  {
    name: "education",
    ionIconName: "book-outline",
    isDefault: true,
  },
  {
    name: "gifts/donations",
    ionIconName: "gift-outline",
    isDefault: true,
  },
  {
    name: "entertainment",
    ionIconName: "game-controller-outline",
    isDefault: true,
  },
  {
    name: "house",
    ionIconName: "construct-outline",
    isDefault: true,
  },
  {
    name: "etc",
    ionIconName: "ellipsis-horizontal-outline",
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
    ionIconName: r.category.ionIconName,
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

const createCategoryQuery = async (
  db: ExpoDbType | SQLJsDbType,
  newCategory: NewCategory,
  userId: number
): Promise<Category | null> => {
  const results = await db.insert(categories).values(newCategory).returning();
  const createdCategory = results.pop();
  if (createdCategory) {
    await db
      .insert(usersToCategories)
      .values({ categoryId: createdCategory.id, userId });
    return createdCategory;
  }

  return null;
};

export const createCategory = protect(
  createCategoryQuery,
  z.tuple([InsertCategorySchema, z.number()])
);

const deleteCategoryQuery = async (
  db: ExpoDbType | SQLJsDbType,
  userId: number,
  categoryId: number
) => {
  await db.delete(categories).where(eq(categories.id, categoryId));
  await db
    .delete(usersToCategories)
    .where(
      and(
        eq(usersToCategories.userId, userId),
        eq(usersToCategories.categoryId, categoryId)
      )
    );
  await db.delete(expenses).where(eq(expenses.categoryId, categoryId));
};

export const deleteCategory = protect(
  deleteCategoryQuery,
  z.tuple([z.number(), z.number()])
);
