import { Box, Container, Heading, Section } from "@radix-ui/themes";

export function PostsPageLayout({
  children,
  title,
}: {
  children: React.ReactNode;
  title: string;
}) {
  return (
    <Container size={"3"}>
      <Section py="8" mx="auto" size="3">
        <Heading mb="6" size="8">
          {title}
        </Heading>
        <Box>{children}</Box>
      </Section>
    </Container>
  );
}
