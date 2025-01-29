import SignInForm from "@/components/auth/sign-in-form";
import NewUserForm from "@/components/auth/sign-up-form";
import { db } from "@/db";
import { user } from "@/db/schema/auth-schema";
import { auth } from "@/lib/auth";
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
    return usersCount > 0 ? <SignInForm /> : <NewUserForm />;
  }
}
