import { notFound } from "next/navigation";
import { Metadata } from "next";
import { Heading, Section, Text } from "@radix-ui/themes";

import { Mdx } from "@/components/mdx-components";
import { allDocs } from "contentlayer/generated";
import { Toc } from "@/components/toc";

interface DocPageProps {
  params: {
    slug?: string[];
  };
}

function getDocFromParams(params: DocPageProps["params"]) {
  const slug = params.slug?.join("/") ?? "";
  const doc = allDocs.find((doc) => doc.slugAsParams === slug);

  if (!doc) {
    null;
  }

  return doc;
}

export function generateMetadata({ params }: DocPageProps): Metadata {
  const doc = getDocFromParams(params);

  if (!doc) {
    return {};
  }

  return {
    title: doc.title,
    description: doc.description,
  };
}

export function generateStaticParams(): DocPageProps["params"][] {
  return allDocs.map((doc) => ({
    slug: doc.slugAsParams.split("/"),
  }));
}

export default function PostPage({ params }: DocPageProps) {
  const doc = getDocFromParams(params);

  if (!doc) {
    notFound();
  }

  return (
    <Section style={{ maxWidth: "48rem" }} mx="auto" py="8">
      <article>
        <Heading size="8" as="h1">
          {doc.title}
        </Heading>
        {doc.description && (
          <Text size="5" mb="6" as="p" color="gray">
            {doc.description}
          </Text>
        )}
        <Toc />
        <Mdx code={doc.body.code} />
      </article>
    </Section>
  );
}
