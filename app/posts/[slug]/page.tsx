import { notFound } from "next/navigation";
import { allPosts } from "contentlayer/generated";
import { format, parseISO } from "date-fns";
import { Metadata } from "next";
import { Mdx } from "@/components/mdx-components";
import { Container, Flex, Heading, Separator, Text } from "@radix-ui/themes";
import { Link } from "@/components/link";

interface PostProps {
  params: {
    slug: string;
  };
}

async function getPostFromParams(params: PostProps["params"]) {
  const slug = params?.slug;
  const post = allPosts.find((post) => post.slugAsParams === slug);

  if (!post) {
    null;
  }

  return post;
}

export async function generateMetadata({
  params,
}: PostProps): Promise<Metadata> {
  const post = await getPostFromParams(params);

  if (!post) {
    return {};
  }

  return {
    title: post.title,
    description: post.description,
  };
}

export async function generateStaticParams(): Promise<PostProps["params"][]> {
  return allPosts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function PostPage({ params }: PostProps) {
  const post = await getPostFromParams(params);

  if (!post) {
    notFound();
  }

  return (
    <Container size="2" py="8">
      <article>
        <Text size="2" asChild color="gray">
          <time dateTime={post.date}>
            {format(parseISO(post.date), "LLLL d, yyyy")}
          </time>
        </Text>
        <Heading size="8" as="h1">
          {post.title}
        </Heading>
        {post.description && (
          <Text size="5" mb="6" as="p" color="gray">
            {post.description}
          </Text>
        )}
        <Mdx code={post.body.code} />
      </article>
      <Flex gap="2" mt="8">
        {post.tags?.map((tag) => (
          <Link key={`tags-${tag}`} href={`tags/${tag}`}>
            #{tag}
          </Link>
        ))}
      </Flex>
    </Container>
  );
}
