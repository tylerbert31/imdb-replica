"use client";

import Link from "next/link";
import { Github } from "lucide-react";
import { bebasNeue } from "@/lib/fonts";

export default function Footer() {
  return (
    <footer className="bg-[#121212] text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3
              className={`text-[#F5C518] text-xl font-bold mb-4 ${bebasNeue.className}`}
            >
              TmDB
            </h3>
            <p className="text-gray-300">Your ultimate movie database</p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">
              <p>
                Quick Links <span>⚡️</span>
              </p>
            </h4>
            <ul className="space-y-2">
              <li>
                <a href="/" className="text-gray-300 hover:text-[#F5C518]">
                  Home
                </a>
              </li>
              <li>
                <a
                  href="/trending"
                  className="text-gray-300 hover:text-[#F5C518]"
                >
                  Trending
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact ✉️</h4>
            <Link
              href="mailto:baringtylerbert31@gmail.com"
              className="text-gray-300"
            >
              Email: baringtylerbert31@gmail.com
            </Link>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">
              <p className="flex gap-2">
                Github{" "}
                <span>
                  <Github className="h-5" />
                </span>
              </p>
            </h4>
            <Link href="https://github.com/tylerbert31" target="_blank">
              <p className="text-gray-300">tylerbert31</p>
            </Link>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">
              <p className="flex gap-2">LinkedIn 🧑🏻‍💻</p>
            </h4>
            <Link
              href="https://www.linkedin.com/in/tyler-bert-baring-156464270"
              target="_blank"
            >
              <p className="text-gray-300">Tyler Bert</p>
            </Link>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-300">
            &copy; {new Date().getFullYear()} TylerMDB. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
