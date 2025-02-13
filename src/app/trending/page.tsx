"use client";

import React, { useState, useEffect, useTransition } from "react";
import { getTrending } from "@/lib/client/server-actions";
import { TrendMovie } from "@/lib/types/movie";
import MovieCard, { MovieCardLoading } from "../_components/Home/movie_card";
import InfiniteScroll from "@/components/ui/InfiniteScroll";
import { Loader2 } from "lucide-react";

export default function Trending() {
  const [results, setResults] = useState<TrendMovie[] | null>(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [loading, startLoading] = useTransition();
  const [newPageLoading, startFetchNewPage] = useTransition();

  const getInitialTrending = async () => {
    const res = await getTrending();
    if (res && res.results.length) {
      setResults(res.results);
      setTotalPages(res.total_pages);
      setPage((prev) => prev + 1);
    }
  };

  const handleNextPage = () => {
    if (page < totalPages) {
      startFetchNewPage(async () => {
        setPage((prev) => prev + 1);
        const newRes = await getTrending(page);
        if (newRes && newRes.results.length) {
          // ~ Filter out duplicates before merging
          // Create a Set of existing movie IDs for efficient lookup
          const existingIds = new Set(results!.map((movie) => movie.id));
          // Filter out any movies that already exist in the results
          const uniqueNewMovies = newRes.results.filter(
            (movie) => !existingIds.has(movie.id)
          );
          setResults([...results!, ...uniqueNewMovies]);
        }
      });
    }
  };

  useEffect(() => {
    startLoading(async () => {
      await getInitialTrending();
    });
  }, []);

  return (
    <main className="flex-grow container mx-auto px-4 py-8">
      <div className="text-white p-5 mb-5">
        <h1 className="text-2xl font-bold">Trending Movies - Today</h1>
      </div>
      {/* RESULTS CARDS */}
      <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-6 mx-auto  place-items-center">
        {/* Placeholder for trending movies */}
        {!results || loading ? (
          Array.from({ length: 20 }).map((_, index) => (
            <MovieCardLoading key={index} />
          ))
        ) : (
          <>
            {results &&
              results.map((movie, index) => (
                <MovieCard key={`${movie.id}_${index}`} movie={movie} />
              ))}
          </>
        )}
      </div>

      {results && (
        <InfiniteScroll
          hasMore={page < totalPages}
          next={handleNextPage}
          isLoading={newPageLoading}
          threshold={1}
        >
          <div className="block my-10 ">
            {page < totalPages && (
              <Loader2 className="text-zinc-400 place-self-center self-center h-8 w-8 animate-spin" />
            )}
          </div>
        </InfiniteScroll>
      )}
    </main>
  );
}
