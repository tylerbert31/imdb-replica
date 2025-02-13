"use client";

import React, { useState, useEffect, useTransition, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { searchMovie } from "@/lib/client/server-actions";
import { SearchedMovie } from "@/lib/types/movie";
import MovieCard, { MovieCardLoading } from "../components/Home/movie_card";
import SearchForm from "@/components/SearchForm";
import InfiniteScroll from "@/components/ui/InfiniteScroll";
import { Loader2 } from "lucide-react";

function SearchContent() {
  const params = useSearchParams();
  const movie = params.get("movie") || null;

  const [results, setResults] = useState<SearchedMovie[] | null>(null);
  const [totalResults, setTotalResults] = useState(0);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, startLoading] = useTransition();
  const [newPageLoading, startFetchNewPage] = useTransition();

  if (!movie) {
    return <NoResults />;
  }

  const getSearchResults = async () => {
    const res = await searchMovie(movie, page);
    if (res && res.results.length) {
      setResults(res.results);
      setTotalResults(res.total_results);
      setTotalPages(res.total_pages);
    }
  };

  const handleNextPage = () => {
    if (page < totalPages) {
      startFetchNewPage(async () => {
        console.log("Fetching new page", page);
        setPage(page + 1);
        const newRes = await searchMovie(movie, page);
        if (newRes && newRes.results.length) {
          setResults([...results!, ...newRes.results]);
        }
      });
    }
  };

  useEffect(() => {
    startLoading(async () => {
      await getSearchResults();
    });
  }, [params]);

  return (
    <main className="flex-grow container mx-auto px-4 py-8">
      <SearchForm />
      <div className="text-white p-5 mb-5">
        <h1 className="text-2xl font-bold">Search results for "{movie}"</h1>
        <p className="text-gray-400 mt-2">
          {results ? `${totalResults} results found` : "Loading..."}
        </p>
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

function NoResults() {
  return <div className="text-white p-5">No results found</div>;
}

export default function Search() {
  return (
    <Suspense fallback={<div className="text-white p-5">Loading...</div>}>
      <SearchContent />
    </Suspense>
  );
}
