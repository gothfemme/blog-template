import { compareDesc } from "date-fns";
import { Section } from "@radix-ui/themes";

import { allPosts } from "@/.contentlayer/generated";
import { PostsList } from "@/components/posts-list";

export default function Home() {
  const posts = allPosts.sort((a, b) =>
    compareDesc(new Date(a.date), new Date(b.date))
  );

  return (
    <Section py="8" mx="auto" style={{ maxWidth: "48rem" }}>
      <PostsList posts={posts} />
    </Section>
  );
}
