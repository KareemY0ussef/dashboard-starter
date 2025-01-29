"use server";
import { db } from ".";
import { filesTable } from "./schema/storage-schema";

export async function insertFile(file: typeof filesTable.$inferInsert) {
  await db.insert(filesTable).values(file);
}
