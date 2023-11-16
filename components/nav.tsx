"use client";

import dynamic from "next/dynamic";
import { Box, Container, Flex } from "@radix-ui/themes";

import { Link } from "./link";

const ThemeToggle = dynamic(
  () => import("./theme-toggle").then((mod) => mod.ThemeToggle),
  { ssr: false }
);

export function Nav() {
  return (
    <Box asChild p="2" style={{ borderBottom: "1px solid var(--gray-5)" }}>
      <header>
        <Container size={"2"}>
          <Flex align="center" gap="2">
            <Flex asChild mr="auto">
              <nav>
                <Link href="/">Home</Link>
              </nav>
            </Flex>
            <ThemeToggle />
          </Flex>
        </Container>
      </header>
    </Box>
  );
}
