"use client";

import { signUp } from "@/actions/auth";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { catchErrorTypedAsync } from "@/lib/utils";
import { signUpSchema, signUpSchemaType } from "@/schemas/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Loader } from "lucide-react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import * as React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export default function NewUserForm() {
  const [showPassword, setShowPassword] = React.useState(false);
  const [showPasswordConfirmation, setShowPasswordConfirmation] =
    React.useState(false);
  const router = useRouter();
  const t = useTranslations("authentication.registration");

  const [loading, setLoading] = React.useState(false);

  const form = useForm<signUpSchemaType>({
    resolver: zodResolver(signUpSchema(t)),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      passwordConfirmation: "",
    },
  });

  async function onSubmit(inputs: signUpSchemaType) {
    setLoading(true);
    const [unexpectedSignUpError, signUpResponse] = await catchErrorTypedAsync(
      signUp(inputs),
    );
    if (unexpectedSignUpError) {
      toast.error(t("errors.unexpected.message"), {
        description: t("errors.unexpected.description"),
      });
      setLoading(false);
      return;
    }

    const { error: signUpError } = signUpResponse;
    if (signUpError) {
      toast.error(signUpError.message, {
        description: signUpError.description,
      });
      setLoading(false);
      return;
    }

    router.push("/");
  }

  return (
    <div className="flex flex-col gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">{t("form.title")}</CardTitle>
          <CardDescription>{t("form.description")}</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col gap-4"
            >
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("form.usernameLabel")}</FormLabel>
                    <FormControl>
                      <Input type="text" {...field} disabled={loading} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("form.emailLabel")}</FormLabel>
                    <FormControl>
                      <Input type="email" {...field} disabled={loading} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("form.passwordLabel")}</FormLabel>
                    <FormControl>
                      <div className="flex gap-2">
                        <Input
                          type={showPassword ? "text" : "password"}
                          {...field}
                          disabled={loading}
                        />
                        <Button
                          size={"icon"}
                          variant={"outline"}
                          className="shrink-0"
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          disabled={loading}
                        >
                          {showPassword ? (
                            <EyeOff className="size-5" />
                          ) : (
                            <Eye className="size-5" />
                          )}
                        </Button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="passwordConfirmation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("form.confirmPasswordLabel")}</FormLabel>
                    <FormControl>
                      <div className="flex gap-2">
                        <Input
                          type={showPasswordConfirmation ? "text" : "password"}
                          {...field}
                          disabled={loading}
                        />
                        <Button
                          size={"icon"}
                          variant={"outline"}
                          className="shrink-0"
                          type="button"
                          onClick={() =>
                            setShowPasswordConfirmation(
                              !showPasswordConfirmation,
                            )
                          }
                          disabled={loading}
                        >
                          {showPasswordConfirmation ? (
                            <EyeOff className="size-5" />
                          ) : (
                            <Eye className="size-5" />
                          )}
                        </Button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? (
                  <Loader className="size-5 animate-spin" />
                ) : (
                  t("form.submitButton")
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
