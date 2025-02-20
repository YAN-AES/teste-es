"use server";
// Libraries imports
import React from "react";
import z from "zod";

// Components imports
import ArtistCard from "@/components/artist-card";
import { PaginationComponent } from "@/components/pagination";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { ArtistCardSkeleton } from "@/components/artist-card";

// Actions imports
import { searchArtists } from "@/actions/search-artists";

type Props = {
  search?: string;
  offset?: string;
};

export async function SearchResults(props: Props) {
  const { search, offset } = props;

  const safeOffset = z.coerce.number().safeParse(offset);
  const parsedNumber = safeOffset.success ? safeOffset.data : 0;

  const searchedArtists = await searchArtists({
    search,
    limit: 10,
    offset: parsedNumber,
  });

  return (
    <>
      {searchedArtists?.items?.length > 0 && (
        <div className="w-full max-w-7xl px-4">
          <h2 className="text-2xl font-bold py-4">Artistas pesquisados</h2>
          <div className="flex flex-row w-full gap-2 py-2">
            <Carousel className="w-full" opts={{ loop: true }}>
              <CarouselContent className="w-full">
                {searchedArtists.items?.map((artist, index) => (
                  <CarouselItem
                    key={`${artist.id}-${index}`}
                    className="basis-1/1"
                  >
                    <div className="py-4 pb-7">
                      <ArtistCard artist={artist} />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="hidden" />
              <CarouselNext className="hidden" />
            </Carousel>
          </div>

          <PaginationComponent
            total={searchedArtists.total}
            limit={searchedArtists.limit}
          />
        </div>
      )}
    </>
  );
}

export async function SearchResultsSkeleton() {
  return (
    <>
      <div className="w-full max-w-7xl px-4">
        <h2 className="text-2xl font-bold pb-4">Artistas pesquisados</h2>
        <div className="flex flex-row w-full gap-2">
          <Carousel className="w-full" opts={{ loop: true, active: false }}>
            <CarouselContent className="w-full">
              <CarouselItem className="basis-1/1">
                <ArtistCardSkeleton />
              </CarouselItem>
              <CarouselItem className="basis-1/1">
                <ArtistCardSkeleton />
              </CarouselItem>
              <CarouselItem className="basis-1/1">
                <ArtistCardSkeleton />
              </CarouselItem>
              <CarouselItem className="basis-1/1">
                <ArtistCardSkeleton />
              </CarouselItem>
              <CarouselItem className="basis-1/1">
                <ArtistCardSkeleton />
              </CarouselItem>
              <CarouselItem className="basis-1/1">
                <ArtistCardSkeleton />
              </CarouselItem>
            </CarouselContent>
            <CarouselPrevious className="hidden" />
            <CarouselNext className="hidden" />
          </Carousel>
        </div>

        {/* <PaginationComponent
          total={searchedArtists.total}
          limit={searchedArtists.limit}
        /> */}
      </div>
    </>
  );
}
