import { notFound } from "next/navigation";
import { Metadata } from "next";
import { Container, Heading } from "@radix-ui/themes";

import { PostsList } from "@/components/posts-list";
import { allPosts } from "contentlayer/generated";

interface TagProps {
  params: {
    slug?: string;
  };
}

function getPostsFromTagParams(params: TagProps["params"]) {
  const slug = params.slug;
  const posts = slug
    ? allPosts.filter((post) => post.tags?.includes(slug))
    : [];

  if (!posts.length) {
    return null;
  }

  return posts;
}

export function generateMetadata({ params }: TagProps): Metadata {
  const slug = params.slug;

  if (!slug) {
    return {};
  }

  return {
    title: slug,
    description: `Posts with the tag ${slug}`,
  };
}

export function generateStaticParams(): TagProps["params"][] {
  const tags = Array.from(new Set(allPosts.flatMap((post) => post.tags ?? [])));
  return tags.map((tag) => ({
    slug: encodeURIComponent(tag),
  }));
}

export default function TagsPage({ params }: TagProps) {
  const slug = params.slug;

  const posts = getPostsFromTagParams(params);

  if (!posts) {
    notFound();
  }

  return (
    <Container size="2" py="8">
      <Heading>#{slug}</Heading>
      <PostsList posts={posts} />
    </Container>
  );
}
