"use server";

import { auth } from "@/auth";
import {
  loginSchema,
  loginSchemaType,
  newUserSchema,
  newUserSchemaType,
} from "./schemas";

export async function signup(values: newUserSchemaType) {
  try {
    // revalidate inputs
    const result = newUserSchema.safeParse(values);
    if (!result.success) {
      console.error("Signup server action error - zod error : ", result.error);
      return {
        error: {
          message: "Invalid inputs",
          description: "make sure your data obey our rules.",
        },
      };
    }

    const { username, email, password } = result.data;

    // signup user
    try {
      await auth.api.signUpEmail({ body: { name: username, email, password } });
      return { error: null };
    } catch (signupError) {
      console.error("Signup server action error - auth error : ", signupError);
      return {
        error: {
          message: "Unexpected error",
          description: "try again or contact us",
        },
      };
    }
  } catch (generalError) {
    // catch any unexpected error
    console.error(
      "Signup server action error - general error : ",
      generalError
    );
    return {
      error: {
        message: "Unexpected error",
        description: "try again or contact us",
      },
    };
  }
}

export async function login(values: loginSchemaType) {
  try {
    // revalidate inputs
    const result = loginSchema.safeParse(values);
    if (!result.success) {
      console.error("login server action error - zod error : ", result.error);
      return {
        error: {
          message: "Invalid inputs",
          description: "make sure your data obey fields rules.",
        },
      };
    }

    const { email, password } = result.data;

    // signup user
    try {
      await auth.api.signInEmail({ body: { email, password } });
      return { error: null };
    } catch (loginError) {
      console.error("login server action error - auth error : ", loginError);
      return {
        error: {
          message: "Unexpected error",
          description: "try again or contact us",
        },
      };
    }
  } catch (generalError) {
    // catch any unexpected error
    console.error("login server action error - general error : ", generalError);
    return {
      error: {
        message: "Unexpected error",
        description: "try again or contact us",
      },
    };
  }
}
