import { Flex, Grid } from "@radix-ui/themes";

import { Post } from "@/.contentlayer/generated";

import { PostItem } from "./post-item";

export function PostsList({ posts }: { posts: Post[] }) {
  return (
    <Flex direction={"column"} gap="6">
      {posts.map((post) => (
        <PostItem post={post} key={post._id} orientation="horizontal" />
      ))}
    </Flex>
  );
}

export function PostsGrid({
  posts,
  columns = "2",
}: {
  posts: Post[];
  columns?: "1" | "2" | "3";
}) {
  return (
    <Grid columns={{ initial: "1", sm: columns }} gapY="6" gapX="6">
      {posts.map((post) => (
        <PostItem post={post} key={post._id} orientation="vertical" />
      ))}
    </Grid>
  );
}
