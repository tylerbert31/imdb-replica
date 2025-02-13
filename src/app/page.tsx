"use client";

import { useEffect, useState } from "react";
import MovieCard, { MovieCardLoading } from "./components/Home/movie_card";
import { getTrending } from "../lib/client/server-actions";
import { TrendingMovies } from "../lib/types/movie";
import { motion } from "framer-motion";
import SearchForm from "@/components/SearchForm";

export default function Home() {
  const [trending, setTrending] = useState<TrendingMovies | null>(null);

  const fetchTrending = async () => {
    const movies = await getTrending();
    setTrending(movies);
  };

  useEffect(() => {
    fetchTrending();
  }, []);

  return (
    <>
      <main className="flex-grow container mx-auto px-4 py-8">
        {/* SEARCH FORM */}
        <SearchForm />

        {/* TRENDING SECTION */}
        <section className="mb-12">
          {!trending ? (
            <div className=" h-4 bg-gray-700 w-56 animate-pulse p-4 my-5 rounded-lg" />
          ) : (
            <motion.h2
              initial={{ opacity: 0, x: -20 }}
              animate={{
                opacity: 1,
                x: 0,
                transition: {
                  duration: 0.5,
                },
              }}
              className="text-2xl font-bold mb-6 text-zinc-50"
            >
              Top 20 Trending Movies - Today
            </motion.h2>
          )}
          {/* TRENDING CARDS */}
          <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-6 mx-auto place-items-center">
            {/* Placeholder for trending movies */}
            {!trending ? (
              Array.from({ length: 20 }).map((_, index) => (
                <MovieCardLoading key={index} />
              ))
            ) : (
              <>
                {trending.results.map((movie) => (
                  <MovieCard key={movie.id} movie={movie} />
                ))}
              </>
            )}
          </div>
        </section>
      </main>
    </>
  );
}
