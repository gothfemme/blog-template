import { defineDocumentType } from "contentlayer/source-files";

import { urlFromFilePath } from "../utils";
import { Category } from "../nested/category";
import { Tag } from "../nested/tag";

export const Post = defineDocumentType(() => ({
  name: "Post",
  filePathPattern: `posts/**/*.mdx`,
  contentType: "mdx",
  fields: {
    title: {
      type: "string",
      required: true,
    },
    description: {
      type: "string",
    },
    date: {
      type: "date",
      required: true,
    },
    cover: {
      type: "string",
      required: false,
    },
    category: {
      type: "nested",
      of: Category,
    },
    tags: {
      type: "list",
      of: Tag,
    },
  },
  computedFields: {
    url_path: {
      type: "string",
      description:
        'The URL path of this page relative to site root. For example, the site root page would be "/", and doc page would be "docs/getting-started/"',
      resolve: urlFromFilePath,
    },
    slug: {
      type: "string",
      resolve: (post) => urlFromFilePath(post).replace(/^\/posts\//, ""),
    },
  },
}));
