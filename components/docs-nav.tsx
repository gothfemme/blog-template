"use client";

import { usePathname } from "next/navigation";
import { Box, Flex, Grid, Heading, Text } from "@radix-ui/themes";

import { SidebarNavItem } from "@/types";

import { Link } from "./link";

export interface DocsSidebarNavProps {
  items: SidebarNavItem[];
}

export function DocsNav({ items }: DocsSidebarNavProps) {
  const pathname = usePathname();

  return items.length ? (
    <Box>
      {items.map((item, index) => (
        <Box key={index} mb="4">
          <Box py="2" px="2">
            <Heading as="h4" size={{ initial: "3", md: "2" }}>
              {item.title}
            </Heading>
          </Box>
          {item.items ? (
            <DocsSidebarNavItems items={item.items} pathname={pathname} />
          ) : null}
        </Box>
      ))}
    </Box>
  ) : null;
}

interface DocsSidebarNavItemsProps {
  items: SidebarNavItem[];
  pathname: string | null;
}

export function DocsSidebarNavItems({
  items,
  pathname,
}: DocsSidebarNavItemsProps) {
  return items.length ? (
    <Grid flow={"row"}>
      {items.map((item, index) =>
        !item.disabled && item.href ? (
          <Flex key={index} py="2" px="2" asChild>
            <Link
              href={item.href}
              underline="hover"
              style={{
                color: "var(--gray-12)",
                borderRadius: "var(--radius-2)",
                background: pathname === item.href ? "var(--accent-a5)" : "",
              }}
            >
              <Text size={{ initial: "3", md: "2" }}>{item.title}</Text>
            </Link>
          </Flex>
        ) : (
          <Flex key={index} py="2" px="2">
            <Text
              style={{
                color: "var(--gray-a10)",
                cursor: "var(--cursor-disabled: not-allowed)",
              }}
              size={{ initial: "3", md: "2" }}
            >
              {item.title}
            </Text>
          </Flex>
        )
      )}
    </Grid>
  ) : null;
}
