"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button, ButtonProps } from "../ui/button";

export default function ThemeButton({ ...props }: ButtonProps) {
  const { setTheme, resolvedTheme } = useTheme();
  return (
    <Button
      size={"icon"}
      variant={"outline"}
      {...props}
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
    >
      <Sun className="hidden size-5 dark:block" />
      <Moon className="block size-5 dark:hidden" />
    </Button>
  );
}
