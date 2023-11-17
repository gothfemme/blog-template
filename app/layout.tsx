import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "@radix-ui/themes/styles.css";
import { Nav } from "@/components/nav";

import { ThemeProvider } from "@/components/theme-provider";
import { Theme } from "@radix-ui/themes";
import { globalConfig } from "@/.contentlayer/generated";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: globalConfig.title,
  description: globalConfig.description,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Theme accentColor="blue" grayColor="gray" scaling="105%">
            <Nav />
            <main>{children}</main>
          </Theme>
        </ThemeProvider>
      </body>
    </html>
  );
}
