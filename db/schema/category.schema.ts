import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { users } from "@/db/schema/user.schema";

export const categories = sqliteTable("categories", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("title").notNull(),
  ionicIconName: text("ionic_icon_name").notNull(),
  isDefault: integer("is_default", { mode: "boolean" }).default(false),
  description: text("description"),
  userId: integer("user_id").references(() => users.id, {
    onDelete: "cascade",
  }),
});
