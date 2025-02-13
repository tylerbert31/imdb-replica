import React, { useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Loader2, Search } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";

export default function SearchForm() {
  const router = useRouter();
  const params = useSearchParams();

  const movie = params.get("movie") || "";

  const [searchQuery, setSearchQuery] = useState(movie);
  const [searching, startSearch] = useTransition();

  const handleSearch = (e: React.FormEvent) => {
    startSearch(() => {
      e.preventDefault();
      if (searchQuery.trim()) {
        router.push(`/search?movie=${encodeURIComponent(searchQuery.trim())}`);
      }
    });
  };
  return (
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
        <Button
          type="submit"
          disabled={searching}
          className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center"
        >
          {searching ? (
            <>
              <Loader2 className="text-zinc-400 place-self-center self-center h-5 w-5 animate-spin" />
            </>
          ) : (
            <>
              <Search className="w-5 h-5" />
            </>
          )}
        </Button>
      </form>
    </div>
  );
}
