"use server";
import { db } from "@/db";
import { filesTable } from "@/db/schema/storage-schema";
export async function getFiles() {
  const files = await db.select().from(filesTable);
  return files;
}
