import { categories } from "@/db/schema/category.schema";
import { users } from "@/db/schema/user.schema";
import { expenses } from "@/db/schema";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

export type ProtectResult<T> = {
  data: T | null;
  error: string | null;
};

export const InsertUserSchema = createInsertSchema(users).omit({ id: true });
export const InsertCategorySchema = createInsertSchema(categories).omit({
  id: true,
});
export const InsertExpenseSchema = createInsertSchema(expenses).omit({
  id: true,
  createdAt: true,
});

export const SelectUserSchema = createSelectSchema(users);
export const SelectCategorySchema = createSelectSchema(categories);
export const SelectExpenseSchema = createSelectSchema(expenses);
export const CategoryWithExpensesCountSchema = SelectCategorySchema.extend({
  expenseCount: z.number().int().nonpositive(),
});

export const EmailLookupSchema = InsertUserSchema.pick({ email: true });

export const CreateCategorySchema = InsertCategorySchema.pick({
  name: true,
  ionicIconName: true,
  isDefault: true,
});

export type User = z.infer<typeof SelectUserSchema>;
export type Category = z.infer<typeof SelectCategorySchema>;
export type Expense = z.infer<typeof SelectExpenseSchema>;
export type CategoryWithExpensesCount = z.infer<
  typeof CategoryWithExpensesCountSchema
>;
export type NewExpense = z.infer<typeof InsertExpenseSchema>;
export type CreatedExpense = z.infer<typeof SelectExpenseSchema>;
