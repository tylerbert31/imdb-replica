"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { searchMovie } from "@/lib/client/server-actions";
import { SearchedMovie } from "@/lib/types/movie";

export default function Search() {
  const params = useSearchParams();
  const movie = params.get("movie") || null;

  const [results, setResults] = useState<SearchedMovie[] | null>(null);
  const [page, setPage] = useState(1);

  if (!movie) {
    return <NoResults />;
  }

  const getSearchResults = async () => {
    const res = await searchMovie(movie, page);
    if (res && res.results.length) {
      setResults(res.results);
    }
  };

  useEffect(() => {
    getSearchResults();
  }, []);

  return (
    <pre className="text-white p-5 line-clamp-1 break-words">
      {JSON.stringify(results)}
    </pre>
  );
}

function NoResults() {
  return <div className="text-white p-5">No results found</div>;
}
