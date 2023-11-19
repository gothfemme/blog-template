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
    <Box
      asChild
      px="2"
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
