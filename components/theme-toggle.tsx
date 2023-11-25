"use client";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { IconButton, VisuallyHidden } from "@radix-ui/themes";
import { useTheme } from "next-themes";

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

      {resolvedTheme === "dark" ? (
        <MoonIcon width="18" height="18" aria-hidden="true" />
      ) : (
        <SunIcon width="18" height="18" aria-hidden="true" />
      )}
    </IconButton>
  );
}
