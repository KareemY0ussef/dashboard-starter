import { db } from "@/db";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import * as schema from "@/db/schema/auth-schema";
export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    schema: {
      ...schema,
    },
  }),
  trustedOrigins: ["http://localhost:3000", "http://192.168.1.55:3000"],
  emailAndPassword: { enabled: true },
});
