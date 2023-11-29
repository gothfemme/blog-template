import { compareDesc } from "date-fns";
import { Container, Flex, Section } from "@radix-ui/themes";

import { allPosts } from "@/.contentlayer/generated";
import { PostsGrid, PostsList } from "@/components/posts/posts-list";
import { Link } from "@/components/link";

export default function Home() {
  const posts = allPosts
    .sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)))
    .slice(0, 3);

  return (
    <Container size={"3"}>
      <Section py="8" mx="auto">
        <PostsList posts={posts} />
        <Flex mt="6" justify={"center"}>
          <Link href="/posts">All Posts</Link>
        </Flex>
      </Section>
    </Container>
  );
}
