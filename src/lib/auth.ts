import { db } from "@/db";
import * as schema from "@/db/schema/auth-schema";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { nextCookies } from "better-auth/next-js";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    schema: {
      ...schema,
    },
  }),
  trustedOrigins: ["http://localhost:3000", "http://192.168.1.55:3000"],
  emailAndPassword: { enabled: true },
  plugins: [nextCookies()],
});
