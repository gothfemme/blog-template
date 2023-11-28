import { defineNestedType } from "contentlayer/source-files";

// A piece of content can have many tags.
export const Tag = defineNestedType(() => ({
  name: "Tag",
  fields: {
    title: { type: "string", required: true },
  },
}));
