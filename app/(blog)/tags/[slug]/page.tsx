import { notFound } from "next/navigation";
import { Metadata } from "next";

import { allPosts } from "contentlayer/generated";
import { sluggify } from "@/lib/utils";
import { PostsPagination } from "@/components/posts/posts-pagination";
import { PostsPageLayout } from "@/components/layouts/posts-page";

interface TagProps {
  params: {
    slug?: string;
  };
}

function getPostsFromTagParams(params: TagProps["params"]) {
  const slug = params.slug;
  const posts = slug
    ? allPosts.filter(
        (post) => post.tags?.map((t) => sluggify(t.title)).includes(slug)
      )
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
    slug: sluggify(tag.title),
  }));
}

export default function TagsPage({ params }: TagProps) {
  const slug = params.slug;

  const posts = getPostsFromTagParams(params);

  if (!posts) {
    notFound();
  }

  return (
    <PostsPageLayout title={`#${slug}`}>
      <PostsPagination posts={posts} total={posts.length} />
    </PostsPageLayout>
  );
}
