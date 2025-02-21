"use client";
// Libraries imports
import { useCallback, useState, useEffect, Suspense } from "react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { MagnifyingGlass } from "@phosphor-icons/react";

// Component imports
import { Input } from "@/components/ui/input";

// Hooks imports
import { useDebounce } from "@/hooks/use-debounce";

type InputProps = {
  searchable: string;
  id?: string;
};

export function QuerySearchInput(props: InputProps) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SearchInput {...props} />
    </Suspense>
  );
}

export function SearchInput(props: InputProps) {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [search, setSearch] = useState(searchParams.get("search") || "");
  const debouncedSearch = useDebounce(search, 300);

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  function handleSearch(e: React.ChangeEvent<HTMLInputElement>) {
    setSearch(e.target.value);
  }

  //* Update the URL with the new search query
  useEffect(() => {
    const trimmedSearch = debouncedSearch.trim();
    if (debouncedSearch)
      router.push(`${pathname}?${createQueryString("search", trimmedSearch)}`);
    else router.push(`${pathname}?${createQueryString("search", "")}`);
  }, [debouncedSearch, createQueryString, pathname, router]);

  return (
    <div className="flex flex-row relative w-full max-w-[512px]">
      <div className="absolute -translate-y-1/2 left-4 top-1/2">
        <MagnifyingGlass className="size-4" />
      </div>
      <Input
        id={props.id}
        placeholder={`Pesquisar por ${props.searchable}...`}
        className="w-full pl-12"
        value={search}
        onChange={handleSearch}
      />
    </div>
  );
}