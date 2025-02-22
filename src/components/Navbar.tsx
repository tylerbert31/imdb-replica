"use client";

import Link from "next/link";
import { FilmIcon, TrendingUp } from "lucide-react";
import { bebasNeue } from "@/lib/fonts";

export default function Navbar() {
  return (
    <nav className="bg-[#121212] p-4 shadow-md">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button className="text-white hover:text-[#F5C518] transition-colors">
            <FilmIcon size={24} />
          </button>
          <Link
            href="/"
            className={`text-[#F5C518] text-3xl font-bold tracking-wider ${bebasNeue.className}`}
          >
            TmDB
          </Link>
        </div>

        <div className="flex items-center gap-0 md:gap-6">
          <Link
            href="/trending"
            className="text-white hover:text-[#F5C518] transition-colors font-semibold flex items-center gap-2"
          >
            <TrendingUp size={20} />
            Trending
          </Link>
        </div>
      </div>
    </nav>
  );
}
