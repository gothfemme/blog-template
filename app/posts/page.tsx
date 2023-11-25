import { compareDesc } from "date-fns";
import { Heading, Section } from "@radix-ui/themes";

import { allPosts } from "@/.contentlayer/generated";
import { PostsPagination } from "@/components/posts-pagination";

export default function PostsPage() {
  const posts = allPosts.sort((a, b) =>
    compareDesc(new Date(a.date), new Date(b.date))
  );

  return (
    <Section py="8" mx="auto" style={{ maxWidth: "48rem" }}>
      <Heading mb="6" size="8">
        All posts
      </Heading>
      <PostsPagination total={posts.length} perPage={2} posts={posts} />
    </Section>
  );
}