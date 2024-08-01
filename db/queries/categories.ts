import { categories, expenses } from "@/db/schema";
import { CategoryWithExpensesCount, DbType } from "@/db/types";
import { count, eq, or } from "drizzle-orm";
import { ExpoSQLiteDatabase } from "drizzle-orm/expo-sqlite";

const DEFAULT_CATEGORIES = [
  {
    name: "food/drink",
    ionicIconName: "fast-food-outline",
    description:
      "Expenses related to groceries, eating out, beverages, and snacks.",
  },
  {
    name: "clothing/shoes",
    ionicIconName: "shirt-outline",
    description: "Purchases of clothing items, footwear, and accessories.",
  },
  {
    name: "transport",
    ionicIconName: "car-outline",
    description:
      "Costs associated with public transportation, fuel, vehicle maintenance, and ride-sharing services.",
  },
  {
    name: "education",
    ionicIconName: "book-outline",
    description:
      "Expenses for tuition, books, courses, workshops, and educational materials.",
  },
  {
    name: "gifts/donations",
    ionicIconName: "gift-outline",
    description:
      "Money spent on presents for others or charitable contributions.",
  },
  {
    name: "entertainment",
    ionicIconName: "game-controller-outline",
    description:
      "Costs for leisure activities, such as movies, concerts, gaming, and hobbies.",
  },
  {
    name: "house",
    ionicIconName: "construct-outline",
    description:
      "Expenses related to rent/mortgage, utilities, home maintenance, and household items.",
  },
];
export async function getCategories(
  db: DbType | null,
  userId: number
): Promise<CategoryWithExpensesCount[]> {
  return (db as ExpoSQLiteDatabase)
    .select({
      id: categories.id,
      name: categories.name,
      ionicIconName: categories.ionicIconName,
      isDefault: categories.isDefault,
      description: categories.description,
      expenseCount: count(expenses.id),
    })
    .from(categories)
    .leftJoin(expenses, eq(expenses.categoryId, categories.id))
    .where(or(eq(categories.isDefault, true), eq(categories.userId, userId)))
    .groupBy(categories.id);
}

export async function initializeCategories(db: DbType | null) {
  const allCategories = await db
    ?.select()
    .from(categories)
    .where(eq(categories.isDefault, true));
  const categoryNames = allCategories?.map((c) => c.name);

  DEFAULT_CATEGORIES.filter((d) => !categoryNames?.includes(d.name)).map(
    async (c) =>
      await db?.insert(categories).values({
        name: c.name,
        ionicIconName: c.ionicIconName,
        isDefault: true,
        description: c.description,
      })
  );

  console.log("Default categories have been initialized.");

  console.log(
    "All categories:",
    allCategories?.map((c) => c.name)
  );
}
