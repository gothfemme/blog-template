import { defineNestedType } from "contentlayer/source-files";

// A piece of content can have one Category
export const Category = defineNestedType(() => ({
  name: "Category",
  fields: {
    title: { type: "string", required: true },
  },
}));
