"use client";

import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { IconButton, VisuallyHidden } from "@radix-ui/themes";
import { useTheme } from "next-themes";

import styles from "./theme-toggle.module.css";

export function ThemeToggle() {
  const { setTheme, resolvedTheme } = useTheme();

  return (
    <IconButton
      onClick={() => {
        setTheme(resolvedTheme === "light" ? "dark" : "light");
      }}
      size="3"
      color="gray"
      variant="ghost"
    >
      <VisuallyHidden>Toggle theme</VisuallyHidden>
      <MoonIcon
        className={styles.moon}
        width="18"
        height="18"
        aria-hidden="true"
      />
      <SunIcon
        className={styles.sun}
        width="18"
        height="18"
        aria-hidden="true"
      />
    </IconButton>
  );
}
