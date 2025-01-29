import { z } from "zod";

export const signInSchema = (t: (key: string) => string) => {
  return z.object({
    email: z
      .string({ message: t("schema.email.string") })
      .trim()
      .toLowerCase()
      .email({ message: t("schema.email.invalid") })
      .min(1, { message: t("schema.email.required") }),
    password: z
      .string({ message: t("schema.password.string") })
      .trim()
      .min(1, { message: t("schema.password.required") })
      .min(8, { message: t("schema.password.min") })
      .max(32, { message: t("schema.password.max") }),
  });
};

export type signInSchemaType = z.infer<ReturnType<typeof signInSchema>>;

export const signUpSchema = (t: (key: string) => string) => {
  return z
    .object({
      username: z
        .string({ message: t("schema.username.string") })
        .trim()
        .min(3, {
          message: t("schema.username.min"),
        })
        .max(32, {
          message: t("schema.username.max"),
        })
        .refine((value) => !!value, {
          message: t("schema.username.required"),
        }),
      email: z
        .string({ message: t("schema.email.string") })
        .trim()
        .toLowerCase()
        .email({
          message: t("schema.email.invalid"),
        })
        .refine((value) => !!value, {
          message: t("schema.email.required"),
        }),
      password: z
        .string({ message: t("schema.password.string") })
        .trim()
        .min(8, {
          message: t("schema.password.min"),
        })
        .max(32, {
          message: t("schema.password.max"),
        }),
      passwordConfirmation: z
        .string({ message: t("schema.passwordConfirmation.string") })
        .trim()
        .min(8, {
          message: t("schema.passwordConfirmation.min"),
        })
        .max(32, {
          message: t("schema.passwordConfirmation.max"),
        }),
    })
    .refine(
      ({ password, passwordConfirmation }) => password === passwordConfirmation,
      {
        message: t("schema.passwordConfirmation.match"),
        path: ["passwordConfirmation"],
      }
    );
};

export type signUpSchemaType = z.infer<ReturnType<typeof signUpSchema>>;
