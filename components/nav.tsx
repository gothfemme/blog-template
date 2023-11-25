"use client";

import { Suspense } from "react";
import dynamic from "next/dynamic";
import { Box, Flex } from "@radix-ui/themes";

import { layoutConfig } from "@/config/layout";

import { Link } from "./link";

const ThemeToggle = dynamic(
  () => import("./theme-toggle").then((mod) => mod.ThemeToggle),
  { ssr: false }
);

export function Nav() {
  return (
    <Box
      asChild
      px="4"
      py="3"
      position={"fixed"}
      top={"0"}
      width={"100%"}
      style={{
        backgroundColor: "var(--gray-1)",
        borderBottom: "1px solid var(--gray-5)",
        zIndex: "999",
      }}
    >
      <header>
        <Flex align="center" gap="4">
          <Flex asChild mr="auto">
            <nav>
              <Link href="/" color="gray" weight="bold">
                Home
              </Link>
            </nav>
          </Flex>
          <Flex gap="2" asChild>
            <nav>
              {layoutConfig.mainNav.map(({ href, title }) => (
                <Link href={href} key={`nav-${href}`} color="gray">
                  {title}
                </Link>
              ))}
            </nav>
          </Flex>
          <Suspense>
            <ThemeToggle />
          </Suspense>
        </Flex>
      </header>
    </Box>
  );
}
