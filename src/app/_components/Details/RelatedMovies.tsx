"use client";

import React, { useEffect, useState } from "react";
import { bebasNeue, robotoCondensed } from "@/lib/fonts";
import MovieCard, { MovieCardLoading } from "@/app/_components/Home/movie_card";
import { SearchResultsArr } from "@/lib/types/movie";
import { getRecommendedMovies } from "@/lib/client/server-actions";
import { Sparkles } from "lucide-react";
import { Separator } from "@/components/ui/separator";

export default function RelatedMovies({
  movieId,
}: {
  movieId: string | number;
}) {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [relatedMovies, setRelatedMovies] = useState<SearchResultsArr | null>(
    null
  );

  const fetchRelatedMovies = async () => {
    const res = await getRecommendedMovies(Number(movieId));
    if (res) {
      setRelatedMovies(res);
    } else {
      setError(true);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchRelatedMovies();
  }, []);

  if (error || !relatedMovies?.results.length) {
    return null;
  }

  return (
    <>
      <Separator className="mt-10 opacity-5" />
      <div
        className={`container mx-auto px-4 mt-20 ${robotoCondensed.variable}`}
      >
        <div className="flex items-center justify-center gap-2 mb-6">
          <Sparkles className="w-5 h-5 text-yellow-500" />
          <h2
            className={`text-2xl font-bold text-zinc-50 ${bebasNeue.className} tracking-wider text-center`}
          >
            You Might Also Like
          </h2>
          <Sparkles className="w-5 h-5 text-yellow-500" />
        </div>
        <div className="pb-4">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 place-items-center">
            {isLoading
              ? // Show loading skeletons while fetching
                Array.from({ length: 6 }).map((_, index) => (
                  <MovieCardLoading key={index} />
                ))
              : // Show actual movie cards
                relatedMovies?.results.slice(0, 12).map((movie) => (
                  <MovieCard
                    key={movie.id}
                    movie={{
                      ...movie,
                      media_type: "movie",
                    }}
                  />
                ))}
          </div>
        </div>
      </div>
    </>
  );
}
