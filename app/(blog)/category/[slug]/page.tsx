import { notFound } from "next/navigation";
import { Metadata } from "next";

import { allPosts } from "contentlayer/generated";
import { sluggify } from "@/lib/utils";
import { PostsPagination } from "@/components/posts/posts-pagination";
import { PostsPageLayout } from "@/components/layouts/posts-page";

interface CategoryPageProps {
  params: {
    slug?: string;
  };
}

function getPostsFromCategoryParams(params: CategoryPageProps["params"]) {
  const slug = params.slug;
  const posts = slug
    ? allPosts.filter(
        (post) => sluggify(post.category?.title ?? "uncategorized") === slug
      )
    : [];

  if (!posts.length) {
    return null;
  }

  return posts;
}

export function generateMetadata({ params }: CategoryPageProps): Metadata {
  const slug = params.slug;

  if (!slug) {
    return {};
  }

  return {
    title: slug,
    description: `Posts with the category ${slug}`,
  };
}

export function generateStaticParams(): CategoryPageProps["params"][] {
  const categories = Array.from(
    new Set(
      allPosts.flatMap((post) =>
        sluggify(post.category?.title ?? "uncategorized")
      )
    )
  );
  return categories.map((slug) => ({
    slug,
  }));
}

export default function TagsPage({ params }: CategoryPageProps) {
  const slug = params.slug;

  const posts = getPostsFromCategoryParams(params);

  if (!posts) {
    notFound();
  }

  return (
    <PostsPageLayout title={`Category: ${slug}`}>
      <PostsPagination posts={posts} total={posts.length} />
    </PostsPageLayout>
  );
}
