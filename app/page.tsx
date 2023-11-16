import { allPosts } from "@/.contentlayer/generated";
import { Box, Container, Heading, Text } from "@radix-ui/themes";
// import Link from "next/link";
import { Link } from "@/components/link";
import { compareDesc, format, parseISO } from "date-fns";

export default function Home() {
  return (
    <Container size="2" py="8">
      {allPosts.map((post) => (
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
            {post.description && <p>{post.description}</p>}
          </article>
        </Box>
      ))}
    </Container>
  );
}
