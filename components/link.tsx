import {
  Link as RadixLink,
  linkPropDefs,
  GetPropDefTypes,
} from "@radix-ui/themes";
import NextLink from "next/link";
import { CSSProperties } from "react";

export function Link({
  href = "",
  ...props
}: GetPropDefTypes<typeof linkPropDefs> & {
  href: string;
  style?: CSSProperties | undefined;
  children: React.ReactNode;
}) {
  if (href.startsWith("http")) {
    return <RadixLink {...props} href={href} target="_blank" rel="noopener" />;
  }
  return (
    <NextLink href={href} passHref legacyBehavior>
      <RadixLink {...props} />
    </NextLink>
  );
}
