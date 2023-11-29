import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Theme } from "@radix-ui/themes";

import "@/styles/globals.css";
import "@radix-ui/themes/styles.css";
import "@/styles/theme-config.css";

import { Nav } from "@/components/nav";
import { ThemeProvider } from "@/components/theme-provider";
import { globalConfig } from "@/config/global";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: globalConfig.title,
  description: globalConfig.description,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <html className={inter.variable} lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Theme accentColor="blue" grayColor="auto">
            <Nav />
            <main
              style={{
                marginTop: "var(--space-6)",
                paddingInline: "var(--space-6)",
              }}
            >
              {children}
            </main>
          </Theme>
        </ThemeProvider>
      </body>
    </html>
  );
}
