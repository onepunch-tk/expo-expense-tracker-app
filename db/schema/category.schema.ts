import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const categories = sqliteTable("categories", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("title").unique().notNull(),
  ionicIconName: text("ionic_icon_name").notNull(),
  isDefault: integer("is_default", { mode: "boolean" }).default(false),
});
