import {
  ComputedFields,
  defineDocumentType,
  defineNestedType,
  makeSource,
} from "contentlayer/source-files";
import rehypePrettyCode, {
  LineElement,
  Options as PrettyCodeOptions,
} from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import remarkDirective from "remark-directive";
import remarkCalloutDirectives from "./lib/remark-callout-directives-plugin";

const computedFields: ComputedFields = {
  slug: {
    type: "string",
    resolve: (doc) => `/${doc._raw.flattenedPath}`,
  },
  slugAsParams: {
    type: "string",
    resolve: (doc) => doc._raw.flattenedPath.split("/").slice(1).join("/"),
  },
};

export const Page = defineDocumentType(() => ({
  name: "Page",
  filePathPattern: `pages/**/*.mdx`,
  contentType: "mdx",
  fields: {
    title: {
      type: "string",
      required: true,
    },
    description: {
      type: "string",
    },
  },
  computedFields,
}));

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
    tags: {
      type: "list",
      of: { type: "string" },
    },
  },
  computedFields,
}));

const prettyCodeOptions: PrettyCodeOptions = {
  theme: "min-dark",
  onVisitHighlightedLine(node: LineElement) {
    // Each line node by default has `class="line"`.
    node.properties.className?.push("highlighted");
  },
};

export default makeSource({
  contentDirPath: "./content",
  documentTypes: [Post, Page],
  mdx: {
    remarkPlugins: [remarkGfm, remarkDirective, remarkCalloutDirectives],
    rehypePlugins: [rehypeSlug, [rehypePrettyCode, prettyCodeOptions]],
  },
});
