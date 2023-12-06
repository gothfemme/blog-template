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
import { CategoryBadge } from "@/components/posts/category-badge";

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
        <Flex gap="2" align="center">
          <CategoryBadge category={post.category} />
          <Text size="2" asChild color="gray">
            <time dateTime={post.date}>
              {format(parseISO(post.date), "LLLL d, yyyy")}
            </time>
          </Text>
        </Flex>
        <Heading size="8" mt="5" as="h1">
          {post.title}
        </Heading>
        {post.description && (
          <Text size="5" mt="4" as="p" color="gray">
            {post.description}
          </Text>
        )}
        {post.cover && (
          <Box mt="5">
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
        <Box mt="9">
          <Mdx code={post.body.code} />
        </Box>
      </article>
      <Flex gap="2" mt="8">
        {post.tags?.map((tag) => (
          <TagBadge key={`tags-${tag._id}`} tag={tag.title} />
        ))}
      </Flex>
    </Section>
  );
}
