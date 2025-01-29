import {
  bigint,
  pgTable,
  smallint,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import { createId } from "@paralleldrive/cuid2";
export const filesTable = pgTable("file", {
  id: varchar("id", { length: 128 })
    .primaryKey()
    .$defaultFn(() => createId()),
  name: text("name").notNull(),
  ext: text("ext").notNull(),
  type: text("type").notNull(),
  size: bigint("size", { mode: "number" }).notNull(),
  width: smallint().notNull(),
  height: smallint().notNull(),
  alt: text("alt").default("").notNull(),
  path: text("pathname").notNull(),
  url: text("url").notNull(),
  downloadUrl: text("download_url").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .$onUpdate(() => new Date())
    .notNull(),
});
