"use client";

import { Box, Flex } from "@radix-ui/themes";
import { usePathname } from "next/navigation";

import { globalConfig } from "@/config/global";
import { layoutConfig } from "@/config/layout";

import { Link } from "./link";
import { RssButton } from "./rss-button";
import { ThemeToggle } from "./theme-toggle";

export function Nav() {
  const path = usePathname();
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
                {globalConfig.title}
              </Link>
            </nav>
          </Flex>
          <Flex gap="4" asChild>
            <nav>
              {layoutConfig.mainNav.map(({ href, title }) => (
                <Link
                  href={href}
                  key={`nav-${href}`}
                  color="gray"
                  highContrast={href === path}
                >
                  {title}
                </Link>
              ))}
            </nav>
          </Flex>
          <RssButton />
          <ThemeToggle />
        </Flex>
      </header>
    </Box>
  );
}
