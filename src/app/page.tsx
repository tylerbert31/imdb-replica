"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import MovieCard, { MovieCardLoading } from "./components/Home/movie_card";
import { getTrending } from "../lib/client/server-actions";
import { TrendingMovies } from "../lib/types/movie";
import { Search } from "lucide-react";
import { motion } from "framer-motion";

export default function Home() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  const [trending, setTrending] = useState<TrendingMovies | null>(null);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?movie=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

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
        <div className="max-w-4xl mx-auto text-center mb-14">
          <h1 className="text-4xl font-bold mb-8 text-zinc-50">
            Find Your Next Favorite Movie
          </h1>
          <form onSubmit={handleSearch} className="flex gap-2">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for movies..."
              className="flex-grow text-black px-4 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
            />
            <button
              type="submit"
              className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center"
            >
              <Search className="w-5 h-5" />
            </button>
          </form>
        </div>

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
              Top 20 Trending Movies
            </motion.h2>
          )}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {/* Placeholder for trending movies */}
            {!trending ? (
              Array.from({ length: 20 }).map((_, index) => (
                <MovieCardLoading key={index} />
              ))
            ) : (
              <>
                {trending.results.map((movie, index) => (
                  <MovieCard key={movie.id} idx={index} movie={movie} />
                ))}
              </>
            )}
          </div>
        </section>
      </main>
    </>
  );
}
