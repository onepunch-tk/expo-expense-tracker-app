import { openDatabaseAsync, SQLiteDatabase } from "expo-sqlite/next";
import { drizzle, ExpoSQLiteDatabase } from "drizzle-orm/expo-sqlite";
import { DbType } from "@/db/types";
import { useDrizzleStudio } from "expo-drizzle-studio-plugin";
import * as schema from "./schema";
import * as relations from "./relations";
import { migrate } from "drizzle-orm/expo-sqlite/migrator";
import migrations from "@/db/migrations/migrations";

let expoDb: SQLiteDatabase;
let db: DbType;

export const initialize = async (): Promise<DbType> => {
  if (!expoDb && !db) {
    console.log("open my local db...");
    expoDb = await openDatabaseAsync("database.db", {
      enableChangeListener: true,
    });
    console.log("open success my db: ", expoDb);
    db = drizzle(expoDb, { schema: { ...schema, ...relations } });
    console.log("make success drizzle: ", db);
  }

  return Promise.resolve(db);
};
export const runMigrations = async (db: DbType | null) => {
  const { journal, migrations: dbMigrations } = migrations;
  await migrate(db as ExpoSQLiteDatabase, {
    journal,
    migrations: dbMigrations,
  });
};

export const useDrizzleStudioHelper = () => {
  useDrizzleStudio(expoDb as any);
};

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
