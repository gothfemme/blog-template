import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";
import { Box, Flex, IconButton } from "@radix-ui/themes";
import Link from "next/link";

export function Pagination({
  currentPage,
  total,
  perPage,
}: {
  currentPage: number;
  total: number;
  perPage: number;
}) {
  const totalPages = Math.ceil(total / perPage);

  return (
    <Flex align={"center"} justify="center" gap="4" mt="6">
      <IconButton
        disabled={currentPage < 2}
        color="gray"
        variant="outline"
        asChild
      >
        {currentPage < 2 ? (
          <Box>
            <ChevronLeftIcon />
          </Box>
        ) : (
          <Link href={`?page=${currentPage - 1}`}>
            <ChevronLeftIcon />
          </Link>
        )}
      </IconButton>
      <Flex gap="2">
        {new Array(totalPages).fill("").map((_, i) => {
          const pageNum = i + 1;
          return (
            <IconButton
              key={`pagination-${pageNum}`}
              color={currentPage === pageNum ? "blue" : "gray"}
              variant={currentPage === pageNum ? "solid" : "outline"}
              asChild
            >
              <Link href={`?page=${pageNum}`}>{pageNum}</Link>
            </IconButton>
          );
        })}
      </Flex>
      <IconButton
        disabled={currentPage >= totalPages}
        color="gray"
        variant="outline"
        asChild
      >
        {currentPage >= totalPages ? (
          <Box>
            <ChevronRightIcon />
          </Box>
        ) : (
          <Link href={`?page=${currentPage + 1}`}>
            <ChevronRightIcon />
          </Link>
        )}
      </IconButton>
    </Flex>
  );
}
