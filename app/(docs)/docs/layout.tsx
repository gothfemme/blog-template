import { Box, Flex } from "@radix-ui/themes";

import { DocsNav } from "@/components/docs-nav";
import { SideNav } from "@/components/side-nav";
import { docsConfig } from "@/config/layout";

interface DocsLayoutProps {
  children: React.ReactNode;
}

export default function DocsLayout({ children }: DocsLayoutProps) {
  return (
    <Flex>
      <SideNav>
        <Box pt="4" px="4" pb="9">
          <DocsNav items={docsConfig.sidebarNav} />
        </Box>
      </SideNav>
      <Box>{children}</Box>
    </Flex>
  );
}
