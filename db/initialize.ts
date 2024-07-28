import { categories } from "./schema/category.schema";
import { db } from "./index";

const DEFAULT_CATEGORIES = [
  {
    category: "food/drink",
    ionicIconName: "fast-food-outline",
  },
  {
    category: "clothing/shoes",
    ionicIconName: "shirt-outline",
  },
  {
    category: "transport",
    ionicIconName: "car-outline",
  },
  {
    category: "education",
    ionicIconName: "book-outline",
  },
  {
    category: "gifts/donations",
    ionicIconName: "gift-outline",
  },
  {
    category: "entertainment",
    ionicIconName: "game-controller-outline",
  },
  {
    category: "house",
    ionicIconName: "construct-outline",
  },
];

export async function initializeDatabase() {
  for (const cat of DEFAULT_CATEGORIES) {
    await db
      .insert(categories)
      .values({
        category: cat.category,
        ionicIconName: cat.ionicIconName,
        isDefault: true,
      })
      .onConflictDoNothing();
  }

  console.log("Default categories have been initialized.");

  const allCategories = await db.query.categories.findMany();
  console.log(
    "All categories:",
    allCategories.map((c) => c.category)
  );
}
