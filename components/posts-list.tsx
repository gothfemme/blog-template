import { Box, Heading, Text } from "@radix-ui/themes";
import { format, parseISO } from "date-fns";

import { Post } from "@/.contentlayer/generated";
import { Link } from "@/components/link";

export function PostsList({ posts }: { posts: Post[] }) {
  return posts.map((post) => (
    <Box key={post._id} asChild mb="4">
      <article>
        <Link href={post.slug}>
          <Heading asChild size="6">
            <h2>{post.title}</h2>
          </Heading>
        </Link>
        <Text size="1" asChild>
          <time dateTime={post.date}>
            {format(parseISO(post.date), "LLLL d, yyyy")}
          </time>
        </Text>
        {post.description && (
          <Text color="gray" as="p">
            {post.description}
          </Text>
        )}
      </article>
    </Box>
  ));
}
