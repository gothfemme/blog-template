import { LayoutConfig } from "@/types";

export const layoutConfig: LayoutConfig = {
  mainNav: [
    { href: "/", title: "Home" },
    { href: "/posts", title: "Posts" },
    { href: "/about", title: "About" },
  ],
  sidebarNav: [],
};

export const docsConfig: LayoutConfig = {
  mainNav: [],
  sidebarNav: [
    {
      title: "Documentation",
      items: [
        {
          title: "Introduction",
          href: "/docs",
        },
      ],
    },
    {
      title: "Overview",
      items: [
        {
          title: "Getting Started",
          href: "/docs/overview/getting-started",
        },
      ],
    },
  ],
};
