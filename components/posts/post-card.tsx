import { Box, Text, Heading, Card, Inset } from "@radix-ui/themes";
import { format, parseISO } from "date-fns";
import Link from "next/link";
import Image from "next/image";

import { Post } from "@/.contentlayer/generated";

export function PostCard({ post }: { post: Post }) {
  return (
    <Card variant="surface" asChild>
      <Link href={post.slug}>
        {post.cover ? (
          <Inset clip="padding-box" side="top" pb="current">
            <Image
              src={post.cover}
              alt=""
              height={140}
              width={240}
              style={{
                display: "block",
                objectFit: "cover",
                width: "100%",
              }}
            />
          </Inset>
        ) : null}
        {/* <Flex gap="3" align={"center"}> */}
        <Box>
          <Heading as="h2" size="4">
            {post.title}
          </Heading>
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
        </Box>
        {/* </Flex> */}
      </Link>
    </Card>
  );
}
