import { notFound } from "next/navigation";
import { Metadata } from "next";
import { allPages } from "contentlayer/generated";

import { Mdx } from "@/components/mdx-components";
import { Container, Heading, Flex, Text } from "@radix-ui/themes";
import { format, parseISO } from "date-fns";
import Link from "next/link";

interface PageProps {
  params: {
    slug: string[];
  };
}

async function getPageFromParams(params: PageProps["params"]) {
  const slug = params?.slug?.join("/");
  const page = allPages.find((page) => page.slugAsParams === slug);

  if (!page) {
    null;
  }

  return page;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const page = await getPageFromParams(params);

  if (!page) {
    return {};
  }

  return {
    title: page.title,
    description: page.description,
  };
}

export async function generateStaticParams(): Promise<PageProps["params"][]> {
  return allPages.map((page) => ({
    slug: page.slugAsParams.split("/"),
  }));
}

export default async function PagePage({ params }: PageProps) {
  const page = await getPageFromParams(params);

  if (!page) {
    notFound();
  }

  return (
    <Container size="2" py="8">
      <article>
        <Heading size="8" as="h1">
          {page.title}
        </Heading>
        {page.description && (
          <Text size="5" mb="6" as="p" color="gray">
            {page.description}
          </Text>
        )}
        <Mdx code={page.body.code} />
      </article>
    </Container>
  );
}
