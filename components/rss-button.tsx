import { IconButton, VisuallyHidden } from "@radix-ui/themes";
import Link from "next/link";

import { RssIcon } from "./icons";

export function RssButton() {
  return (
    <IconButton size="3" color="gray" variant="ghost" asChild>
      <Link href="/rss.xml">
        <VisuallyHidden>RSS Feed</VisuallyHidden>
        <RssIcon />
      </Link>
    </IconButton>
  );
}
