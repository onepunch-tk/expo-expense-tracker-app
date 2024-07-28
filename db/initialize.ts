import { categories } from "./schema/category.schema";
import { db } from "./index";

const DEFAULT_CATEGORIES = [
  {
    title: "food/drink",
    ionicIconName: "fast-food-outline",
  },
  {
    title: "clothing/shoes",
    ionicIconName: "shirt-outline",
  },
  {
    title: "transport",
    ionicIconName: "car-outline",
  },
  {
    title: "education",
    ionicIconName: "book-outline",
  },
  {
    title: "gifts/donations",
    ionicIconName: "gift-outline",
  },
  {
    title: "entertainment",
    ionicIconName: "game-controller-outline",
  },
  {
    title: "house",
    ionicIconName: "construct-outline",
  },
];

export async function initializeDatabase() {
  for (const cat of DEFAULT_CATEGORIES) {
    await db
      .insert(categories)
      .values({
        title: cat.title,
        ionicIconName: cat.ionicIconName,
        isDefault: true,
      })
      .onConflictDoNothing();
  }

  console.log("Default categories have been initialized.");

  const allCategories = await db.query.categories.findMany();
  console.log(
    "All categories:",
    allCategories.map((c) => c.title)
  );
}
