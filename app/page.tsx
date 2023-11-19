import { compareDesc, format, parseISO } from "date-fns";
import { Box, Container, Heading, Text } from "@radix-ui/themes";
import { Link } from "@/components/link";
import { allPosts } from "@/.contentlayer/generated";

export default function Home() {
  const posts = allPosts.sort((a, b) =>
    compareDesc(new Date(a.date), new Date(b.date))
  );
  return (
    <Container size="2" py="8">
      {posts.map((post) => (
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
      ))}
    </Container>
  );
}
