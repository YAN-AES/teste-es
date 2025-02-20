"use client";
// Libraries imports
import React from "react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";

// Components imports
import Pagination from "@/components/ui/pagination";
import { Button } from "@/components/ui/button";

type PaginationProps = {
  total: number;
  limit: number;
}

export function PaginationComponent(props: PaginationProps) {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [offset, setOffset] = React.useState(searchParams.get("offset") || "");

  const createQueryString = React.useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  //* Update the URL with the new search query
  React.useEffect(() => {
    if (offset)
      router.push(`${pathname}?${createQueryString("offset", offset)}`);
    else router.push(`${pathname}?${createQueryString("offset", "")}`);
  }, [createQueryString, pathname, router, offset]);

  const previousPage = React.useCallback(() => {
    const newOffset = Number(offset) - props.limit;
    setOffset(newOffset.toString());
  }, [offset, props.limit]);

  const nextPage = React.useCallback(() => {
    const newOffset = Number(offset) + props.limit;
    setOffset(newOffset.toString());
  }, [offset, props.limit]);

  return (
    <Pagination.Root>
      <Pagination.Content>
        <Pagination.Item>
          <Button
            onClick={previousPage}
            disabled={Number(offset) === 0}
          >
            Anterior
          </Button>
        </Pagination.Item>
        <Pagination.Item>
          <Button
            onClick={nextPage}
            disabled={Number(offset) + props.limit >= props.total}
          >
            Próximo
          </Button>
        </Pagination.Item>
      </Pagination.Content>
    </Pagination.Root>
  );
}