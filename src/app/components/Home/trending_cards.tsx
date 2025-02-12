import React from "react";
import { motion } from "framer-motion";
import { TrendMovie } from "@/app/lib/types/movie";
import MyTools from "@/app/lib/client/mytools";
import Link from "next/link";

const containerClass: string =
  "bg-zinc-900 rounded-lg shadow-md overflow-hidden";

export default function TrendingCards({
  idx,
  movie,
}: {
  idx: number;
  movie: TrendMovie;
}) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        scale: 0.8,
      }}
      whileInView={{
        opacity: 1,
        scale: 1,
      }}
      whileHover={{
        scale: 1.05,
        transition: {
          delay: 0, // Exclude delay on hover
          bounce: 0.1,
        },
      }}
      transition={{
        delay: idx * 0.05,
        bounceDamping: 0.5,
      }}
      viewport={{ once: true, amount: 0.2 }}
      className={containerClass}
    >
      <Link href={`/movie/${movie.id}`}>
        <div className=" overflow-hidden">
          <motion.img
            whileHover={{
              scale: 1.1,
            }}
            src={
              movie.poster_path ? MyTools.getPosterUrl(movie.poster_path) : ""
            }
            alt={movie.title}
            className="w-full h-64 object-cover z-10"
          />
        </div>
        <div className="p-4 !z-50">
          <h3 className="text-base md:text-lg font-bold mb-2 text-white line-clamp-2 text-ellipsis">
            {movie.title}
          </h3>
        </div>
      </Link>
    </motion.div>
  );
}

export function TrendingCardsLoading() {
  return (
    <div className={containerClass}>
      <div className="aspect-w-2 aspect-h-3 h-64  bg-gray-700 animate-pulse"></div>
      <div className="p-4">
        <div className="h-6 bg-gray-700 rounded w-3/4 mb-2"></div>
        <div className="h-4 bg-gray-700 rounded w-1/2"></div>
      </div>
    </div>
  );
}
