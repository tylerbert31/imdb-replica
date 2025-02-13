import React from "react";
import { motion } from "framer-motion";
import { TrendMovie } from "@/lib/types/movie";
import MyTools from "@/lib/client/mytools";
import Link from "next/link";
import { Star } from "lucide-react";
import { format } from "date-fns";
import MiniTooltip from "@/components/mini_tooltip";

const containerClass: string =
  "bg-zinc-900 rounded-lg shadow-md overflow-hidden w-[160px] sm:w-[180px] md:w-[200px] lg:w-[220px]";

export default function MovieCard({ movie }: { movie: TrendMovie }) {
  if (!movie.poster_path) {
    return null;
  }
  return (
    <MiniTooltip text={movie.title}>
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
        }}
        transition={{
          bounceDamping: 0.5,
        }}
        viewport={{ once: true, amount: 0.2 }}
        className={containerClass}
      >
        <Link
          href={`/movie/${movie.id}`}
          className="block aspect-[2/3] relative"
        >
          <div className="relative w-full h-full overflow-hidden">
            <motion.img
              whileHover={{
                scale: 1.1,
              }}
              src={MyTools.getPosterUrl(movie.poster_path)}
              alt={movie.title}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-zinc-900 via-zinc-900/70 to-transparent p-4">
            <h3 className="text-sm sm:text-base md:text-lg font-bold text-zinc-100 line-clamp-2 text-ellipsis">
              {movie.title}
            </h3>
            <div className="flex justify-between items-center mt-2">
              <div className="flex items-center">
                <Star className="w-4 h-4 text-yellow-400" />
                <span className="text-white text-xs sm:text-sm ml-1">
                  {movie.vote_average
                    ? movie.vote_average.toFixed(1)
                    : (Math.random() * 2 + 8).toFixed(1)}
                </span>
              </div>
              {movie.release_date && (
                <span className="text-zinc-400 text-xs sm:text-sm">
                  {format(new Date(movie.release_date), "y")}
                </span>
              )}
            </div>
          </div>
        </Link>
      </motion.div>
    </MiniTooltip>
  );
}

export function MovieCardLoading() {
  return (
    <motion.div
      initial={{
        scale: 0.8,
      }}
      className={containerClass}
    >
      <div className="aspect-[2/3] bg-gray-700 animate-pulse relative">
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-zinc-900 to-transparent p-4">
          <div className="h-4 sm:h-5 md:h-6 bg-gray-600 rounded w-3/4 mb-2"></div>
          <div className="flex justify-between items-center">
            <div className="h-3 sm:h-4 bg-gray-600 rounded w-12"></div>
            <div className="h-3 sm:h-4 bg-gray-600 rounded w-8"></div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
