import { Theme } from "@radix-ui/themes";

export default function ClientProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Theme>{children}</Theme>;
}
