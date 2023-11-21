import { visit } from "unist-util-visit";
import { Properties, h } from "hastscript";
import type { Node } from "mdast";

type HastNode = Node & {
  name: string;
  attributes: Record<any, any> & { title?: string };
  children?: Node[];
  data?: Node["data"] & { hName?: string; hProperties?: Properties };
};

// forces children to be <span>. otherwise they're a <p> and the markup could invalidate
const decorateChildren = (node: any) => {
  Object.assign(node.data ?? (node.data = {}), {
    hName: "span",
    hProperties: node.properties,
  });
};

const defaultCalloutTypes = ["note", "tip", "info", "warning", "danger"];

export default function remarkCalloutDirectives() {
  return (tree: HastNode) => {
    visit(tree, (node) => {
      if (
        node.type === "containerDirective" ||
        node.type === "leafDirective" ||
        node.type === "textDirective"
      ) {
        if (!defaultCalloutTypes.includes(node.name)) return;

        const data = node.data || (node.data = {});
        const tagName = node.type === "textDirective" ? "span" : "aside";

        data.hName = tagName;
        data.hProperties = h(tagName, {
          ...(node.attributes || {}),
          className: `hint ${node.name}`,
        }).properties;

        if (node.children && Array.isArray(node.children)) {
          node.children.forEach(decorateChildren);
        }
      }
    });
  };
}
