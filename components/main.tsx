import { Box } from "@radix-ui/themes";

export function Main({ children }: { children: React.ReactNode }) {
  return (
    <Box asChild mt="6" px={{ initial: "4", md: "6" }}>
      <main>{children}</main>
    </Box>
  );
}
