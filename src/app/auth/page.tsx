import { auth } from "@/auth";
import LoginForm from "@/auth/components/login-form";
import NewUserForm from "@/auth/components/new-user-form";
import { db } from "@/db";
import { user } from "@/db/schema/auth-schema";
import { count } from "drizzle-orm";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function Page() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (session?.user) {
    return redirect("/");
  } else {
    const { count: usersCount } = (
      await db.select({ count: count() }).from(user)
    )[0];
    return usersCount > 0 ? <LoginForm /> : <NewUserForm />;
  }
}
