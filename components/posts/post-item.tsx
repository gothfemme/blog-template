import { Box, Text, Heading, Card, Flex, Inset, Grid } from "@radix-ui/themes";
import { format, parseISO } from "date-fns";
import Image from "next/image";

import { Link } from "@/components/link";
import { Post } from "@/.contentlayer/generated";

function PostRoot({
  children,
  orientation,
}: {
  children: React.ReactNode;
  orientation?: "horizontal" | "vertical";
}) {
  if (orientation === "vertical") {
    return (
      <Flex direction={"column"} gap={"2"} asChild>
        <article>{children}</article>
      </Flex>
    );
  }
  return (
    <Grid columns={"2"} gap={"4"} asChild>
      <article>{children}</article>
    </Grid>
  );
}

function PostCover({ cover, slug }: Pick<Post, "cover" | "slug">) {
  if (!cover) {
    return null;
  }
  return (
    <Box
      position={"relative"}
      style={{ minHeight: 200, backgroundColor: "var(--gray-1)" }}
    >
      <Link href={slug}>
        <Image
          src={cover}
          alt=""
          fill={true}
          priority
          style={{
            objectFit: "cover",
            borderRadius: "var(--radius-4)",
          }}
        />
      </Link>
    </Box>
  );
}

export function PostItem({
  post,
  orientation,
}: {
  post: Post;
  orientation?: "horizontal" | "vertical";
}) {
  return (
    <PostRoot orientation={orientation}>
      <PostCover cover={post.cover} slug={post.slug} />
      <Box>
        <Text size="1" asChild>
          <time dateTime={post.date}>
            {format(parseISO(post.date), "LLLL d, yyyy")}
          </time>
        </Text>
        <Link href={post.slug} color="gray" highContrast underline="hover">
          <Heading as="h2" size="6">
            {post.title}
          </Heading>
        </Link>
        {post.description && (
          <Text color="gray" as="p">
            {post.description}
          </Text>
        )}
      </Box>
    </PostRoot>
  );
}
