import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const categories = sqliteTable("categories", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  category: text("category").unique("category_constraint"),
  ionicIconName: text("ionic_icon_name").notNull(),
  isDefault: integer("is_default", { mode: "boolean" }).default(0),
});
