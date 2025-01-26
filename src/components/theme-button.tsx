"use client";
import { useTheme } from "next-themes";
import { Button, ButtonProps } from "./ui/button";
import { Moon, Sun } from "lucide-react";

export default function ThemeButton({ ...props }: ButtonProps) {
  const { setTheme, resolvedTheme } = useTheme();
  return (
    <Button
      size={"icon"}
      variant={"outline"}
      {...props}
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
    >
      <Sun className="size-5 hidden dark:block" />
      <Moon className="size-5 block dark:hidden" />
    </Button>
  );
}
