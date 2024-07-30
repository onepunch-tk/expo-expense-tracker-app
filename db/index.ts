import { drizzle } from "drizzle-orm/expo-sqlite";
import { categories } from "./schema/category.schema";
import { expenses } from "./schema/expense.schema";
import { users } from "./schema/user.schema";
import { openDatabaseSync } from "expo-sqlite/next";
import { relations } from "drizzle-orm";

export * from "./schema/user.schema";
export * from "./schema/expense.schema";
export * from "./schema/category.schema";

export const usersRelations = relations(users, ({ many }) => ({
  expenses: many(expenses),
  categories: many(categories),
}));
export const categoriesRelations = relations(categories, ({ many }) => ({
  expenses: many(expenses),
  users: many(users),
}));
export const expensesRelations = relations(expenses, ({ one }) => ({
  user: one(users, {
    fields: [expenses.userId],
    references: [users.id],
  }),
  category: one(categories, {
    fields: [expenses.categoryId],
    references: [categories.id],
  }),
}));

export const expoDb = openDatabaseSync("sqlite.db");
const schema = {
  users,
  expenses,
  categories,
  usersRelations,
  expensesRelations,
  categoriesRelations,
};

export const db = drizzle(expoDb, { logger: true, schema });

/*
한번 더 문제가 생기면 해당 코드로 수정
* const DB_NAME = "your_database.db";

const schema = `
CREATE TABLE IF NOT EXISTS categories (
  id integer PRIMARY KEY AUTOINCREMENT NOT NULL,
  title text,
  ionic_icon_name text NOT NULL,
  is_default integer DEFAULT false
);

CREATE TABLE IF NOT EXISTS expenses (
  id integer PRIMARY KEY AUTOINCREMENT NOT NULL,
  title text NOT NULL,
  description text,
  expense integer NOT NULL,
  date integer NOT NULL,
  user_id integer,
  category_id integer
);

CREATE TABLE IF NOT EXISTS users (
  id integer PRIMARY KEY AUTOINCREMENT NOT NULL,
  email text NOT NULL,
  password text NOT NULL
);

CREATE UNIQUE INDEX IF NOT EXISTS title_constraint ON categories (title);
CREATE UNIQUE INDEX IF NOT EXISTS email_constraint ON users (email);
`;

async function ensureDirExists(dir: string) {
  const dirInfo = await FileSystem.getInfoAsync(dir);
  if (!dirInfo.exists) {
    await FileSystem.makeDirectoryAsync(dir, { intermediates: true });
  }
}

async function initDatabase() {
  const dbDir = `${FileSystem.documentDirectory}SQLite`;
  await ensureDirExists(dbDir);

  const dbPath = `${dbDir}/${DB_NAME}`;
  const fileInfo = await FileSystem.getInfoAsync(dbPath);

  if (!fileInfo.exists) {
    await FileSystem.writeAsStringAsync(dbPath, '', { encoding: FileSystem.EncodingType.UTF8 });
  }

  const expoDb = SQLite.openDatabase(DB_NAME);

  return new Promise<SQLite.WebSQLDatabase>((resolve, reject) => {
    expoDb.transaction(
      tx => {
        tx.executeSql(schema);
      },
      error => {
        console.error("Error executing schema:", error);
        reject(error);
      },
      () => {
        console.log("Schema executed successfully");
        resolve(expoDb);
      }
    );
  });
}

export async function setupDatabase() {
  try {
    const expoDb = await initDatabase();
    const db = drizzle(expoDb);
    console.log("Database setup completed");
    return db;
  } catch (error) {
    console.error("Database setup failed:", error);
    throw error;
  }
}*/
