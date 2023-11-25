"use client";
import { useSearchParams } from "next/navigation";

import { Post } from "@/.contentlayer/generated";

import { Pagination } from "./pagination";
import { PostsList } from "./posts-list";

export function PostsPagination({
  posts,
  total,
  perPage = 20,
}: {
  posts: Post[];
  total: number;
  perPage?: number;
}) {
  const searchParams = useSearchParams();
  const currentPage = parseInt(searchParams.get("page") ?? "1");
  const paginatedPosts = posts.slice(
    (currentPage - 1) * perPage,
    currentPage * perPage
  );
  return (
    <>
      <PostsList posts={paginatedPosts} />
      <Pagination total={total} perPage={perPage} currentPage={currentPage} />
    </>
  );
}
