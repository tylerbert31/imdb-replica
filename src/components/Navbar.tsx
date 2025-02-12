"use client";

import Link from "next/link";
import { FilmIcon, Search } from "lucide-react";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();
  return (
    <nav className="bg-[#121212] p-4 shadow-md">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button className="text-white hover:text-[#F5C518] transition-colors">
            <FilmIcon size={24} />
          </button>
          <Link
            href="/"
            className="text-[#F5C518] text-3xl font-bold tracking-wider"
          >
            TmDB
          </Link>
        </div>

        <div className="flex items-center gap-0 md:gap-6">
          {pathname !== "/" && (
            <Link
              href="/"
              className="flex-1 max-w-2xl mx-4 hover:scale-105 transition-all"
            >
              <Search className=" text-gray-100" size={20} />
            </Link>
          )}
          <Link
            href="/trending"
            className="text-white hover:text-[#F5C518] transition-colors font-semibold"
          >
            Trending
          </Link>
        </div>
      </div>
    </nav>
  );
}
