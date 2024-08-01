import { eq } from "drizzle-orm";
import { User } from "@/db/types";
import { users } from "@/db/schema/user.schema";
import { db } from "@/db/dirzzle";

export const getUserByEmail = async (
  email: string
): Promise<User | undefined> => {
  const result = await db.select().from(users).where(eq(users.email, email));
  return result.length > 0 ? result[0] : undefined;
};
export const insertUser = async (email: string, password: string) => {
  await db.insert(users).values({ email, password });
};
