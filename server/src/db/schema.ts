import { integer, pgTable, varchar } from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  age: integer().notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
});

export const quotesTable = pgTable("quotes", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  author: varchar({ length: 255 }).notNull(),
  text: varchar({ length: 255 }).notNull(),
});
