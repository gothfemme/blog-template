import { allPosts, allPages } from "@/.contentlayer/generated";
import { globalConfig } from "@/config/global";

export default function Sitemap() {
  const posts = allPosts.map((post) => ({
    url: `${globalConfig.url}/${post.slug}`,
    lastModified: new Date(post.date),
  }));
  const pages = allPages.map((page) => ({
    url: `${globalConfig.url}/${page.slugAsParams}`,
    lastModified: new Date(),
  }));

  return [
    {
      url: globalConfig.url,
      lastModified: new Date(),
    },
    ...posts,
    ...pages,
  ];
}
