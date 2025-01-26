"use client";
import * as React from "react";

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
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff, Loader } from "lucide-react";
import { newUserSchema, newUserSchemaType } from "../schemas";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { authClient } from "../auth-client";
import { useTranslations } from "next-intl";

export default function NewUserForm() {
  const [showPassword, setShowPassword] = React.useState(false);
  const [showPasswordConfirmation, setShowPasswordConfirmation] =
    React.useState(false);
  const router = useRouter();
  const t = useTranslations("authentication.registration");

  const [loading, setLoading] = React.useState(false);

  const form = useForm<newUserSchemaType>({
    resolver: zodResolver(newUserSchema(t)),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      passwordConfirmation: "",
    },
  });

  async function onSubmit(values: newUserSchemaType) {
    try {
      setLoading(true);

      const { error } = await authClient.signUp.email({
        name: values.username,
        email: values.email,
        password: values.password,
      });

      if (error) {
        setLoading(false);
        toast.error(t("errors.creationFailed.message"), {
          description: t("errors.creationFailed.description"),
        });
      } else {
        router.push("/");
      }
    } catch (error) {
      console.error(error);
      setLoading(false);

      toast.error(t("errors.unexpected.message"), {
        description: t("errors.unexpected.description"),
      });
    }
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
                      <Input type="text" {...field} />
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
                      <Input type="email" {...field} />
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
                        />
                        <Button
                          size={"icon"}
                          variant={"outline"}
                          className="shrink-0"
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
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
                        />
                        <Button
                          size={"icon"}
                          variant={"outline"}
                          className="shrink-0"
                          type="button"
                          onClick={() =>
                            setShowPasswordConfirmation(
                              !showPasswordConfirmation
                            )
                          }
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
