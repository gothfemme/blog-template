import { notFound } from "next/navigation";
import { format, parseISO } from "date-fns";
import { Metadata } from "next";
import {
  AspectRatio,
  Box,
  Flex,
  Heading,
  Section,
  Text,
} from "@radix-ui/themes";
import Image from "next/image";

import { Mdx } from "@/components/mdx-components";
import { allPosts } from "contentlayer/generated";
import { TagBadge } from "@/components/posts/tag-badge";

interface PostProps {
  params: {
    slug: string;
  };
}

function getPostFromParams(params: PostProps["params"]) {
  const slug = params.slug;
  const post = allPosts.find((post) => post.slug === slug);

  if (!post) {
    null;
  }

  return post;
}

export function generateMetadata({ params }: PostProps): Metadata {
  const post = getPostFromParams(params);

  if (!post) {
    return {};
  }

  return {
    title: post.title,
    description: post.description,
  };
}

export function generateStaticParams(): PostProps["params"][] {
  return allPosts.map((post) => ({
    slug: post.slug,
  }));
}

export default function PostPage({ params }: PostProps) {
  const post = getPostFromParams(params);

  if (!post) {
    notFound();
  }

  return (
    <Section style={{ maxWidth: "48rem" }} mx="auto" py="8">
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
        {post.cover && (
          <Box mb="6">
            <AspectRatio ratio={16 / 8}>
              <Image
                src={post.cover}
                alt=""
                fill={true}
                priority
                style={{
                  objectFit: "cover",
                  borderRadius: "var(--radius-4)",
                }}
              />
            </AspectRatio>
          </Box>
        )}
        <Mdx code={post.body.code} />
      </article>
      <Flex gap="2" mt="8">
        {post.tags?.map((tag) => (
          <TagBadge key={`tags-${tag._id}`} tag={tag.title} />
        ))}
      </Flex>
    </Section>
  );
}
