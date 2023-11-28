import { defineNestedType } from "contentlayer/source-files";

export const Author = defineNestedType(() => ({
  name: "Author",
  fields: {
    name: { type: "string", required: true },
    handle: { type: "string", required: true },
    avatar: { type: "string", required: true },
  },
}));
