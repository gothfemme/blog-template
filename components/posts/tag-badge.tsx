import { Badge } from "@radix-ui/themes";

import { Link } from "@/components/link";

export function TagBadge({ tag }: { tag: string }) {
  return (
    <Badge key={`tags-${tag}`} variant="soft" color="gray" radius="full">
      <Link
        href={`/tags/${encodeURIComponent(tag)}`}
        style={{ color: "inherit" }}
      >
        #{tag}
      </Link>
    </Badge>
  );
}
