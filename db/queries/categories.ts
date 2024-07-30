import { categories, db, userToCategories } from "@/db";
import { eq, or, sql } from "drizzle-orm";
import { CategoryType } from "@/db/types";

export const getCategoriesByUserId =
  () =>
  async (userId: number): Promise<CategoryType[]> =>
    db
      .select({
        id: categories.id,
        title: categories.title,
        ionicIconName: categories.ionicIconName,
        isDefault: categories.isDefault,
      })
      .from(categories)
      .leftJoin(
        userToCategories,
        eq(categories.id, userToCategories.categoryId)
      )
      .where(
        or(
          eq(categories.isDefault, true),
          eq(userToCategories.userId, sql.placeholder("userId"))
        )
      )
      .prepare()
      .all({ userId });
