import { relations } from "drizzle-orm";
import { categories, users, usersToCategories } from "@/db/schema";

export const usersToGroupsRelations = relations(
  usersToCategories,
  ({ one }) => ({
    category: one(categories, {
      fields: [usersToCategories.categoryId],
      references: [categories.id],
    }),
    user: one(users, {
      fields: [usersToCategories.userId],
      references: [users.id],
    }),
  })
);
