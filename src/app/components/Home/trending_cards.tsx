import React from "react";
import { motion } from "framer-motion";
import { TrendMovie } from "@/app/lib/types/movie";
import MyTools from "@/app/lib/client/mytools";
import Link from "next/link";
import { Star } from "lucide-react";

const containerClass: string =
  "flex flex-col justify-between bg-zinc-900 rounded-lg shadow-md overflow-hidden max-w-[250px]";

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
        <div className="px-4 pt-4">
          <h3 className="text-base md:text-lg font-bold mb-2 text-zinc-100 line-clamp-2 text-ellipsis">
            {movie.title}
          </h3>
        </div>
      </Link>
      <div className="bg-zinc-900 p-4 flex justify-between items-center">
        <div className="flex items-center">
          <Star className="w-5 h-5 text-yellow-400" />
          <span className="text-white text-sm ml-1">{movie.vote_average}</span>
        </div>
        <span className="text-zinc-500 text-sm">{movie.release_date}</span>
      </div>
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
