import { Box, Container, Flex, Text } from "@radix-ui/themes";

export function Footer() {
  return (
    <Box py="6" px="4" style={{ borderTop: "1px solid var(--gray-a5)" }}>
      <Container size="4">
        <Flex>
          <Box>
            <Text size={"2"} color="gray">
              © 2023
            </Text>
          </Box>
        </Flex>
      </Container>
    </Box>
  );
}
