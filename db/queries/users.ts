import { db } from "@/db";
import { eq, sql } from "drizzle-orm";
import { UserType } from "@/db/types";
import { users } from "@/db/schema/user.schema";

const getUserByEmailQuery = db
  .select()
  .from(users)
  .where(
    eq(
      sql<string>`lower(${users.email})`,
      sql<string>`lower(${sql.placeholder("email")})`
    )
  )
  .prepare();

export const getUserByEmail = async (
  email: string
): Promise<UserType | undefined> => {
  return getUserByEmailQuery.get({ email });
};

export const insertUserQuery = db
  .insert(users)
  .values({
    email: sql.placeholder("email"),
    password: sql.placeholder("password"),
  })
  .prepare();

export const insertUser = async (email: string, password: string) => {
  await insertUserQuery.execute({ email, password });
};
