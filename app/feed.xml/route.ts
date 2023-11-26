import RSS from "rss";

import { allPosts } from "@/.contentlayer/generated";
import { globalConfig } from "@/config/global";

const MAX_POSTS = 100;

export function GET() {
  const feed: RSS = new RSS({
    title: globalConfig.title || "",
    description: globalConfig.description,
    site_url: globalConfig.url,
    feed_url: `${globalConfig.url}/feed.xml`,
    copyright: `${new Date().getFullYear()} ${globalConfig.title}`,
    language: globalConfig.language,
    pubDate: new Date(),
  });
  allPosts.slice(0, MAX_POSTS).map((post) => {
    feed.item({
      title: post.title,
      guid: `${globalConfig.url}${post.slug}`,
      url: `${globalConfig.url}${post.slug}`,
      date: post.date,
      description: post.description ?? "",
      author: "",
      categories: post.tags ?? [],
    });
  });
  return new Response(feed.xml({ indent: true }), {
    headers: {
      "Content-Type": "application/atom+xml; charset=utf-8",
    },
  });
}
