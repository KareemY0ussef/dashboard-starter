"use server";

import { db } from "@/db";
import { user } from "@/db/schema/auth-schema";
import { auth } from "@/lib/auth";
import { catchErrorTypedAsync } from "@/lib/utils";
import {
  signInSchema,
  signInSchemaType,
  signUpSchema,
  signUpSchemaType,
} from "@/schemas/auth";
import { getTranslations } from "next-intl/server";
import { headers } from "next/headers";

export async function signIn(inputs: signInSchemaType) {
  const t = await getTranslations("auth.signIn");

  // Re-validate inputs on the server side
  const parseResult = signInSchema(t).safeParse(inputs);
  if (!parseResult.success) {
    return {
      error: {
        message: t("errors.unauthorized.message"),
        description: t("errors.unauthorized.description"),
      },
    };
  }

  const { email, password } = parseResult.data;

  // Attempt to sign in the user
  const [signInError] = await catchErrorTypedAsync(
    auth.api.signInEmail({ body: { email, password, rememberMe: false } }),
  );
  if (signInError) {
    return {
      error: {
        message: t("errors.unauthorized.message"),
        description: t("errors.unauthorized.description"),
      },
    };
  }

  // Return an empty object if sign-in is successful
  return {};
}

export async function signUp(inputs: signUpSchemaType) {
  const t = await getTranslations("auth.signUp");

  // Make sure there are no users before
  const [currentUsersSelectError, currentUsers] = await catchErrorTypedAsync(
    db.select().from(user),
  );
  if (currentUsersSelectError) {
    return {
      error: {
        message: t("errors.unexpected.message"),
        description: t("errors.unexpected.description"),
      },
    };
  }

  const isFirstUser = currentUsers.length === 0;
  if (!isFirstUser) {
    return {
      error: {
        message: t("errors.creationFailed.message"),
        description: t("errors.creationFailed.description"),
      },
    };
  }

  // Re-validate inputs on the server side
  const parseResult = signUpSchema(t).safeParse(inputs);
  if (!parseResult.success) {
    return {
      error: {
        message: t("errors.creationFailed.message"),
        description: t("errors.creationFailed.description"),
      },
    };
  }

  const { username, email, password } = parseResult.data;

  // Attempt to sign up the user
  const [signUpError] = await catchErrorTypedAsync(
    auth.api.signUpEmail({ body: { name: username, email, password } }),
  );
  if (signUpError) {
    return {
      error: {
        message: t("errors.unauthorized.message"),
        description: t("errors.unauthorized.description"),
      },
    };
  }

  // Return an empty object if sign-up is successful
  return {};
}

export async function signOut() {
  const t = await getTranslations("auth.signOut");

  // Attempt to sign out the user
  const [signOutError] = await catchErrorTypedAsync(
    auth.api.signOut({ headers: await headers() }),
  );
  if (signOutError) {
    return {
      error: {
        message: t("errors.unexpected.message"),
        description: t("errors.unexpected.message"),
      },
    };
  }

  // Return an empty object if sign-out is successful
  return {};
}
