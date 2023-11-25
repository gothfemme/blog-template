import { Box, IconButton } from "@radix-ui/themes";
import { CheckIcon, ClipboardIcon } from "@radix-ui/react-icons";
import { HTMLAttributes, PropsWithChildren, useState } from "react";

import { cn } from "@/lib/utils";

import styles from "./code-block.module.css";

export const CopyButton = ({ text }: { text: string }) => {
  const [isCopied, setIsCopied] = useState(false);

  const copy = async () => {
    await navigator.clipboard.writeText(text);
    setIsCopied(true);

    setTimeout(() => {
      setIsCopied(false);
    }, 10000);
  };

  return (
    <IconButton
      onClick={() => void copy()}
      aria-label="Copy to clipboard"
      className={styles.copyButton}
      variant="soft"
      color="gray"
      size="2"
    >
      {isCopied ? <CheckIcon /> : <ClipboardIcon />}
    </IconButton>
  );
};

export const CodeBlock: React.FC<
  PropsWithChildren<
    HTMLAttributes<HTMLPreElement> & {
      "data-language": string;
      raw: string;
    }
  >
> = ({ children, raw, className, ...props }) => (
  <pre {...props} className={cn(styles.pre, className)}>
    <Box position="absolute" right="0" top="0" mt="3" mr="3">
      <CopyButton text={raw} />
    </Box>
    {children}
  </pre>
);
