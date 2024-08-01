import { eq } from "drizzle-orm";
import { DbType, User } from "@/db/types";
import { users } from "@/db/schema/user.schema";

export const getUserByEmail = async (
  db: DbType | null,
  email: string
): Promise<User | undefined> => {
  const result = await db?.select().from(users).where(eq(users.email, email));
  if (result) {
    return result.pop();
  } else {
    return undefined;
  }
};
export const insertUser = async (
  db: DbType | null,
  email: string,
  password: string
) => {
  await db?.insert(users).values({ email, password });
};
