"use client";
import Image from "next/image";
import { useMDXComponent } from "next-contentlayer/hooks";
import * as React from "react";
import NextLink from "next/link";
import {
  CheckCircledIcon,
  CrossCircledIcon,
  ExclamationTriangleIcon,
  InfoCircledIcon,
  Link2Icon,
} from "@radix-ui/react-icons";

import {
  Blockquote,
  Box,
  Flex,
  Code,
  Em,
  Heading,
  Kbd,
  Link,
  Separator,
  Strong,
  Tabs,
  Text,
  Table,
  Callout,
} from "@radix-ui/themes";
import * as themesComponents from "@radix-ui/themes";
import styles from "./mdx-components.module.css";
import { cn } from "@/lib/utils";
import { MDXComponents } from "mdx/types";
import { CodeBlock } from "./code-block";

export const components: MDXComponents = {
  ...themesComponents,
  Tabs: Tabs.Root,
  TabsList: Tabs.List,
  TabsContent: Tabs.Content,
  TabsTrigger: Tabs.Trigger,
  h1: (props) => (
    <Heading asChild size="8" mb="3">
      <h1 {...props} style={{ scrollMarginTop: "var(--space-9)" }} />
    </Heading>
  ),
  h2: ({ children, id, ...props }) => (
    <Heading
      size="6"
      mt="7"
      mb="2"
      asChild
      id={id}
      style={{ scrollMarginTop: "var(--space-9)" }}
      data-heading
    >
      <h2 {...props}>
        <LinkHeading id={id}>{children}</LinkHeading>
      </h2>
    </Heading>
  ),
  h3: ({ children, id, ...props }) => (
    <Heading
      size="5"
      mt="7"
      mb="2"
      id={id}
      style={{ scrollMarginTop: "var(--space-9)" }}
      asChild
      data-heading
    >
      <h3 {...props}>
        <LinkHeading id={id}>{children}</LinkHeading>
      </h3>
    </Heading>
  ),
  h4: ({ children, ...props }) => (
    <Heading
      size="4"
      mt="6"
      mb="3"
      style={{ scrollMarginTop: "var(--space-9)" }}
      asChild
    >
      <h4 {...props}>{children}</h4>
    </Heading>
  ),
  p: ({ children, ...props }) => {
    return (
      <Text mb="3" as="p" size="3" {...props}>
        {children}
      </Text>
    );
  },
  aside: ({ children, ...props }) => {
    if (props.className?.includes("hint")) {
      let color = "gray";
      let Icon = InfoCircledIcon;

      if (props.className.includes("info")) {
        color = "blue";
      }
      if (props.className.includes("tip")) {
        color = "green";
        Icon = CheckCircledIcon;
      }
      if (props.className.includes("warning")) {
        color = "yellow";
        Icon = ExclamationTriangleIcon;
      }

      if (props.className.includes("danger")) {
        color = "red";
        Icon = CrossCircledIcon;
      }

      return (
        <Callout.Root my="3" color={color}>
          <Callout.Icon>
            <Icon />
          </Callout.Icon>
          <Callout.Text {...props}>
            <>{children}</>
          </Callout.Text>
        </Callout.Root>
      );
    }
  },
  a: ({ href = "", ...props }) => {
    if (href.startsWith("http")) {
      return <Link {...props} href={href} target="_blank" rel="noopener" />;
    }
    return (
      <NextLink href={href} passHref legacyBehavior>
        <Link {...props} />
      </NextLink>
    );
  },
  hr: ({ ...props }) => (
    <Separator size="4" my="6" asChild>
      <hr {...props} />
    </Separator>
  ),
  ul: (props) => <ul {...props} className={styles.List} />,
  ol: ({ children, ...props }) => (
    <Box mb="3" pl="4" asChild>
      <ol {...props}>{children}</ol>
    </Box>
  ),
  li: (props) => (
    <Text my="3" size="3" asChild>
      <li {...props}></li>
    </Text>
  ),
  em: Em,
  strong: Strong,
  img: ({ ...props }) => (
    <Box my="6">
      <img {...props} style={{ maxWidth: "100%", verticalAlign: "middle" }} />
    </Box>
  ),
  blockquote: Blockquote,
  pre: (props) => {
    // if (props.children.props.live) {
    //   return (
    //     <PreWithLivePreview
    //       scroll={props.children.props.scroll}
    //       style={props.children.props.style}
    //       {...props}
    //     />
    //   );
    // }
    return <CodeBlock {...props}>{/* <code /> */}</CodeBlock>;
  },
  code: ({ line, live, style, ["data-language"]: dataLanguage, ...props }) => {
    // if it's a codeblock (``` block in markdown), it'll have a className from prism
    const isInlineCode = !dataLanguage;
    return isInlineCode ? (
      <Code
        {...props}
        style={{
          whiteSpace: "break-spaces",
        }}
      />
    ) : (
      <code {...props} data-invert-line-highlight={line !== undefined} />
    );
  },
  Note: ({ children, ...props }) => (
    <Box className={styles.Note} asChild {...props}>
      <aside>{children}</aside>
    </Box>
  ),
  // Highlights,
  table: ({ children }) => <Table.Root my="6">{children}</Table.Root>,
  thead: ({ children }) => <Table.Header>{children}</Table.Header>,
  tbody: ({ children }) => <Table.Body>{children}</Table.Body>,
  tr: ({ children }) => <Table.Row>{children}</Table.Row>,
  th: ({ children }) => (
    <Table.ColumnHeaderCell>{children}</Table.ColumnHeaderCell>
  ),
  td: ({ children }) => <Table.Cell>{children}</Table.Cell>,
  Kbd,
  Code,
  Description: ({ children, ...props }) => {
    // takes the text even if it's wrapped in `<p>`
    // https://github.com/wooorm/xdm/issues/47
    const childText =
      typeof children === "string" ? children : children.props.children;
    return (
      <Text as="p" size="4" mt="2" mb="7" color="gray" {...props}>
        {childText}
      </Text>
    );
  },
  Image,
  // CssVariablesTable: (props) => (
  //   <Box mt="2">
  //     <CssVariablesTable {...props} />
  //   </Box>
  // ),
  // DataAttributesTable: (props) => <DataAttributesTable {...props} />,
  // PropsTable: (props) => (
  //   <Box my="4">
  //     <PropsTable {...props} />
  //   </Box>
  // ),
  // TabsCodeBlock: (props) => (
  //   <Tabs.Root {...props}>
  //     <Box className={styles.TabsCodeBlock}>{props.children}</Box>
  //   </Tabs.Root>
  // ),
  // TabsCodeBlockContent: (props) => (
  //   <CodeBlock {...props} style={{ boxShadow: "none", borderRadius: 0 }} />
  // ),
  // KeyboardTable: (props) => (
  //   <Box mb="5">
  //     <KeyboardTable {...props} />
  //   </Box>
  // ),
  // PackageRelease,
  // PRLink,
};

const LinkHeading = ({
  id,
  children,
  className,
  ...props
}: {
  id?: string;
  children: React.ReactNode;
} & React.ComponentProps<typeof Link>) => (
  <Link
    asChild
    weight="bold"
    highContrast
    color="gray"
    underline="hover"
    {...props}
  >
    <a id={id} href={`#${id}`} className={cn(className, styles.LinkHeading)}>
      {children}

      <Link2Icon aria-hidden />
    </a>
  </Link>
);

interface MdxProps {
  code: string;
}

export function Mdx({ code }: MdxProps) {
  const Component = useMDXComponent(code);

  return <Component components={components} />;
}
