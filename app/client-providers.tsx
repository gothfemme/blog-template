"use client";
import { Theme } from "@radix-ui/themes";
import { ThemeProvider } from "next-themes";

export default function ClientProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider attribute="class" enableSystem>
      <Theme accentColor="blue">{children}</Theme>
    </ThemeProvider>
  );
}
