"use client";

import Link from "next/link";
import { Menu, Search } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="bg-[#121212] p-4 shadow-md">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button className="text-white hover:text-[#F5C518] transition-colors">
            <Menu size={24} />
          </button>
          <Link
            href="/"
            className="text-[#F5C518] text-3xl font-bold tracking-wider"
          >
            IMDb
          </Link>
        </div>

        <div className="flex-1 max-w-2xl mx-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search IMDb"
              className="w-full py-2 px-4 pl-10 bg-white rounded focus:outline-none focus:ring-2 focus:ring-[#F5C518]"
            />
            <Search
              className="absolute left-3 top-2.5 text-gray-400"
              size={20}
            />
          </div>
        </div>

        <div className="flex items-center space-x-6">
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
