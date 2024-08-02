import { openDatabaseAsync, SQLiteDatabase } from "expo-sqlite/next";
import type { ExpoSQLiteDatabase } from "drizzle-orm/expo-sqlite";
import { drizzle } from "drizzle-orm/expo-sqlite";
import { useDrizzleStudio } from "expo-drizzle-studio-plugin";
import { migrate } from "drizzle-orm/expo-sqlite/migrator";
import migrations from "@/db/migrations/migrations";
import * as schema from "@/db/schema";
import * as relations from "@/db/relations";
import type { SQLJsDatabase } from "drizzle-orm/sql-js";

const fullSchema = { ...schema, ...relations };
export type ExpoDbType = ExpoSQLiteDatabase<typeof fullSchema>;
//임시로 이쪽에다가 선언
export type SQLJsDbType = SQLJsDatabase<typeof fullSchema>;
let db: ExpoDbType;
let expoDb: SQLiteDatabase;

export const initialize = async (): Promise<ExpoDbType> => {
  if (!expoDb && !db) {
    expoDb = await openDatabaseAsync("database.db", {
      enableChangeListener: true,
    });
    db = drizzle(expoDb, { schema: fullSchema });
  }

  return Promise.resolve(db);
};

export const runMigrations = async (db: ExpoDbType) => {
  const { journal, migrations: dbMigrations } = migrations;
  await migrate(db, {
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
