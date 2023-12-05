import { Box, Text, Heading, Flex, Grid, ScrollArea } from "@radix-ui/themes";
import { format, parseISO } from "date-fns";
import Image from "next/image";

import { Link } from "@/components/link";
import { IsoDateTimeString, Post } from "@/.contentlayer/generated";

import { CategoryBadge } from "./category-badge";
import { TagBadge } from "./tag-badge";

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
    <Grid columns={"4fr 6fr"} gap={"6"} asChild>
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
      style={{
        minHeight: 200,
        backgroundColor: "var(--gray-1)",
      }}
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

function PostHeading({ slug, title }: Pick<Post, "title" | "slug">) {
  return (
    <Link href={slug} color="gray" highContrast underline="hover">
      <Heading as="h2" size="5">
        {title}
      </Heading>
    </Link>
  );
}

function PostTimestamp({ date }: { date: IsoDateTimeString }) {
  return (
    <Text size="1" asChild>
      <time dateTime={date}>{format(parseISO(date), "LLLL d, yyyy")}</time>
    </Text>
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
      <PostCover cover={post.cover} slug={post.url_path} />
      <Flex direction="column" gap="2">
        <PostHeading title={post.title} slug={post.url_path} />
        <Flex gap="4" align="center" justify="start">
          <CategoryBadge category={post.category} />
          <PostTimestamp date={post.date} />
        </Flex>
        {post.description && (
          <Text color="gray" as="p" mb="1">
            {post.description}
          </Text>
        )}
        {post.tags ? (
          <ScrollArea scrollbars="horizontal" type="auto">
            <Flex gap="3">
              {post.tags.map((tag) => (
                <TagBadge key={`tag-${post._id}-${tag._id}`} tag={tag.title} />
              ))}
            </Flex>
          </ScrollArea>
        ) : null}
      </Flex>
    </PostRoot>
  );
}
