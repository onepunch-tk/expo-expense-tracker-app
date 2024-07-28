import { categories } from "@/db/schema/category.schema";
import { users } from "@/db/schema/user.schema";

export type CategoryType = typeof categories.$inferSelect;
export type UserType = typeof users.$inferSelect;
