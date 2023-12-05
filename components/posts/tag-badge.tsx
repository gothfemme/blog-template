import { Badge } from "@radix-ui/themes";

import { Link } from "@/components/link";
import { sluggify } from "@/lib/utils";

export function TagBadge({ tag }: { tag: string }) {
  return (
    <Badge variant="soft" color="gray" radius="full">
      <Link
        href={`/tags/${sluggify(tag)}`}
        weight={"bold"}
        style={{ color: "inherit" }}
      >
        #{tag}
      </Link>
    </Badge>
  );
}
