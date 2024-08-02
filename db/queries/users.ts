import { eq } from "drizzle-orm";
import { EmailLookupSchema, InsertUserSchema, User } from "@/db/types";
import { users } from "@/db/schema/user.schema";
import { protect } from "@/db/queries/helpers";
import { z } from "zod";
import { ExpoDbType, SQLJsDbType } from "@/db/dirzzle";

const getUserByEmailQuery = async (
  db: ExpoDbType | SQLJsDbType,
  email: string
): Promise<User | undefined> => {
  const result = await db.select().from(users).where(eq(users.email, email));
  return result[0];
};

export const getUserByEmail = protect(
  async (
    db: ExpoDbType | SQLJsDbType,
    data: z.infer<typeof EmailLookupSchema>
  ) => {
    const { email } = data;
    return getUserByEmailQuery(db, email);
  },
  z.tuple([EmailLookupSchema])
);

const createUserQuery = async (
  db: ExpoDbType | SQLJsDbType,
  userData: z.infer<typeof InsertUserSchema>
): Promise<User> => {
  return db
    .insert(users)
    .values(userData)
    .returning()
    .then((rows) => rows[0]);
};

export const createUser = protect(
  async (
    db: ExpoDbType | SQLJsDbType,
    data: z.infer<typeof InsertUserSchema>
  ) => {
    return await createUserQuery(db, data);
  },
  z.tuple([InsertUserSchema])
);
