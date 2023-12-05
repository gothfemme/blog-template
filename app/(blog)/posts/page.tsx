import { compareDesc } from "date-fns";

import { allPosts } from "@/.contentlayer/generated";
import { PostsPageLayout } from "@/components/layouts/posts-page";
import { PostsPagination } from "@/components/posts/posts-pagination";

export default function PostsPage() {
  const posts = allPosts.sort((a, b) =>
    compareDesc(new Date(a.date), new Date(b.date))
  );

  return (
    <PostsPageLayout title="All posts">
      <PostsPagination total={posts.length} perPage={10} posts={posts} />
    </PostsPageLayout>
  );
}
