import { Badge } from "@radix-ui/themes";

import { Link } from "@/components/link";
import { Category } from "@/.contentlayer/generated";
import { sluggify } from "@/lib/utils";

export function CategoryBadge({ category }: { category?: Category }) {
  const title = category?.title ?? "uncategorized";
  const href = `/category/${sluggify(title)}`;

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
