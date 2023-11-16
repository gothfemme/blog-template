import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "@radix-ui/themes/styles.css";
import { Nav } from "@/components/nav";
// import ClientProviders from "./client-providers";
import { ThemeProvider } from "@/components/theme-provider";
import { Theme } from "@radix-ui/themes";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Blog Template",
  description: "A NextJS + Contentlayer blog template",
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
        {/* <ClientProviders>
        </ClientProviders> */}
      </body>
    </html>
  );
}
