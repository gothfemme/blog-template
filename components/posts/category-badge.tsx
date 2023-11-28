import { Badge } from "@radix-ui/themes";

import { Link } from "@/components/link";
import { Category } from "@/.contentlayer/generated";

export function CategoryBadge({ category }: { category?: Category }) {
  const href = `/category/${category?._raw.flattenedPath ?? "uncategorized"}`;
  const title = category?.title ?? "uncategorized";

  return (
    <Badge variant="soft" color="gray">
      <Link
        href={href}
        weight="bold"
        style={{ color: "inherit", textTransform: "uppercase" }}
      >
        {title}
      </Link>
    </Badge>
  );
}
