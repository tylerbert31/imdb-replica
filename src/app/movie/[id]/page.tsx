"use client";

import React, { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star, Clock, Calendar } from "lucide-react";
import { useParams } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useMovieDetails } from "@/lib/client/hooks";
import {
  CastMember,
  CrewMember,
  MovieDetails as MovieDetailsType,
  VideoResult,
} from "@/lib/types/movie";
import MyTools from "@/lib/client/mytools";
import { bebasNeue, robotoCondensed } from "@/lib/fonts";
import MiniTooltip from "@/components/mini_tooltip";
import RelatedMovies from "@/app/_components/Home/Details/RelatedMovies";
import { Separator } from "@/components/ui/separator";
import { motion } from "framer-motion";

export default function MovieDetails() {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [movieDetails, setMovieDetails] = useState<MovieDetailsType | null>(
    null
  );

  // ~ If Movie Details are not found, return MovieNotFound Component
  if ((error && !isLoading && !movieDetails) || !id || typeof id !== "string") {
    return <MovieNotFound />;
  }

  // ~ Initial Fetch Movie Details from API
  const fetchMovieDetails = async () => {
    const res = await useMovieDetails(id);
    if (res) {
      setMovieDetails(res);
    } else {
      setError(true);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchMovieDetails();
  }, []);

  if (isLoading) {
    return <MovieDetailsLoading />;
  }

  // Get random trailer or teaser
  let videoTrailers = movieDetails?.videos?.results?.filter(
    (video) => video.type === "Trailer" || video.type === "Teaser"
  );

  const trailer = videoTrailers?.at(
    Math.floor(Math.random() * videoTrailers.length)
  );

  return (
    <main className={`mb-10 ${robotoCondensed.variable} min-w-fit`}>
      {/* Hero Section with Backdrop */}
      <div className="relative">
        {/* Backdrop */}
        <div className="absolute inset-0 h-[400px]">
          <img
            src={MyTools.getPosterUrl(
              movieDetails?.backdrop_path || movieDetails?.poster_path || "",
              "original"
            )}
            alt="Backdrop"
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background to-background" />
        </div>

        {/* Content */}
        <div className="container mx-auto px-4 pt-20 relative">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Left Column - Poster & Quick Info */}
            <div className="flex flex-col items-center sm:items-start space-y-4">
              {/* Poster */}
              <div className="relative w-full max-w-[300px]">
                <img
                  src={MyTools.getPosterUrl(movieDetails?.poster_path || "")}
                  alt={movieDetails?.title}
                  className="w-full rounded-lg shadow-lg"
                />
              </div>

              <Card className="border-zinc-800 bg-zinc-900/50 w-full max-w-[300px]">
                <CardContent className="p-4 space-y-3">
                  <div className="flex items-center gap-2">
                    <MiniTooltip text="Vote Average">
                      <Star className="text-yellow-500" />
                    </MiniTooltip>
                    <span className="text-zinc-100 font-roboto-condensed">
                      {movieDetails?.vote_average}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MiniTooltip text="Runtime">
                      <Clock className="text-zinc-400" />
                    </MiniTooltip>
                    <span className="text-zinc-100">
                      {movieDetails?.runtime} minutes
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MiniTooltip text="Release Date">
                      <Calendar className="text-zinc-400" />
                    </MiniTooltip>
                    <span className="text-zinc-100">
                      {movieDetails?.release_date}
                    </span>
                  </div>
                </CardContent>
              </Card>

              <div className="my-4 hidden sm:block">
                <CastAndDirector
                  cast={movieDetails?.credits?.cast || []}
                  director={movieDetails?.credits?.crew.find(
                    (person) => person.job === "Director"
                  )}
                />
              </div>
            </div>

            {/* Right Column - Details */}
            <div className="lg:col-span-2 space-y-6">
              {/* Title Section */}
              <div className="space-y-4 text-center sm:text-left">
                <div>
                  <h1
                    className={`text-4xl font-bold text-zinc-50 ${bebasNeue.className} tracking-wider`}
                  >
                    {movieDetails?.title}
                  </h1>
                  <p className="text-xl text-zinc-100 mt-2 font-roboto-condensed font-light italic">
                    {movieDetails?.tagline}
                  </p>
                </div>
                <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
                  {movieDetails?.genres.map((genre) => (
                    <Badge
                      key={genre.id}
                      variant="secondary"
                      className="bg-zinc-800 hover:bg-zinc-700 text-zinc-100 font-roboto-condensed tracking-wide"
                    >
                      {genre.name}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Overview Section */}
              <Card className="border-zinc-800 bg-zinc-900/50">
                <CardContent className="p-6">
                  <h2
                    className={`text-lg font-semibold text-zinc-50 mb-2 ${bebasNeue.className} tracking-wide`}
                  >
                    Overview
                  </h2>
                  <p className="!text-zinc-50 font-roboto-condensed font-light leading-relaxed">
                    {movieDetails?.overview}
                  </p>
                </CardContent>
              </Card>

              {/* Trailer Section */}
              {trailer && <Trailer trailer={trailer} />}

              {/* Cast and Director Section */}
              <div className="block sm:hidden">
                <CastAndDirector
                  cast={movieDetails?.credits?.cast || []}
                  director={movieDetails?.credits?.crew.find(
                    (person) => person.job === "Director"
                  )}
                />
              </div>
            </div>
          </div>
        </div>

        <Separator className="my-10 opacity-5" />

        {/* Related Movies */}
        {movieDetails?.id && <RelatedMovies movieId={movieDetails.id} />}
      </div>
    </main>
  );
}

function CastAndDirector({
  cast,
  director,
}: {
  cast: CastMember[];
  director?: CrewMember;
}) {
  return (
    <>
      <div className="my-4">
        <h2
          className={`text-lg font-semibold text-zinc-50 mb-4 ${bebasNeue.className} tracking-wide`}
        >
          Top Cast
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {cast.slice(0, 6).map((person) => (
            <div key={person.name} className="flex items-center gap-3">
              <MiniTooltip key={person.name} text={person.name}>
                <Avatar className="h-10 w-10 hover:scale-110 cursor-pointer transition-all border-2 border-zinc-800 ring-1 ring-zinc-700">
                  <AvatarImage
                    src={MyTools.getPosterUrl(person.profile_path || "", "w92")}
                    alt={person.name}
                    className="object-cover"
                  />
                  <AvatarFallback className="bg-zinc-800 text-zinc-300">
                    {person.name[0]}
                  </AvatarFallback>
                </Avatar>
              </MiniTooltip>
              <div className="block sm:hidden">
                <p className="text-zinc-50 font-medium text-sm line-clamp-2">
                  {person.name}
                </p>
                <p className="text-zinc-400 text-xs">{person.character}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      {director && (
        <div>
          <h2
            className={`text-lg font-semibold text-zinc-50 mb-4 ${bebasNeue.className} tracking-wide`}
          >
            Director
          </h2>
          <div className="flex items-center gap-3">
            <MiniTooltip text={director.name}>
              <Avatar className="h-10 w-10 border-2 hover:scale-110 cursor-pointer transition-all  border-zinc-800 ring-1 ring-zinc-700">
                <AvatarImage
                  src={MyTools.getPosterUrl(director.profile_path || "", "w92")}
                  alt={director.name}
                  className="object-cover"
                />
                <AvatarFallback className="bg-zinc-800 text-zinc-300">
                  {director.name[0]}
                </AvatarFallback>
              </Avatar>
            </MiniTooltip>
            <div>
              <p className="text-zinc-50 font-medium text-sm">
                {director.name}
              </p>
              <p className="text-zinc-400 text-xs">{director.job}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

/**
 * Movie Details Loading Component
 * @returns Movie Details Loading Component
 */
function MovieDetailsLoading() {
  return (
    <main className="mb-10">
      {/* Hero Section with Backdrop */}
      <div className="relative">
        {/* Backdrop */}
        <div className="absolute inset-0 h-[400px]">
          <div className="w-full h-full bg-zinc-900/50" />
          <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background to-background" />
        </div>

        {/* Content */}
        <div className="container mx-auto px-4 pt-20 relative">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Left Column - Poster & Quick Info */}
            <div className="flex flex-col items-center sm:items-start space-y-4">
              {/* Poster */}
              <div className="relative w-full max-w-[300px]">
                <div className="w-full aspect-[2/3] rounded-lg bg-zinc-900" />
              </div>

              <Card className="border-zinc-800 bg-zinc-900/50 w-full max-w-[300px]">
                <CardContent className="p-4 space-y-3">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex items-center gap-2">
                      <Skeleton className="h-4 w-4 bg-zinc-800" />
                      <Skeleton className="h-4 w-24 bg-zinc-800" />
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Details */}
            <div className="lg:col-span-2 space-y-6">
              {/* Title Section */}
              <div className="space-y-4 text-center sm:text-left">
                <div>
                  <Skeleton className="h-10 w-48 bg-zinc-800" />
                  <Skeleton className="h-6 w-32 mt-2 bg-zinc-800" />
                </div>
                <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="h-6 w-20 rounded bg-zinc-800" />
                  ))}
                </div>
              </div>

              {/* Overview Section */}
              <Card className="border-zinc-800 bg-zinc-900/50">
                <CardContent className="p-6 space-y-3">
                  <Skeleton className="h-6 w-24 bg-zinc-800" />
                  <div className="h-20 w-full rounded bg-zinc-800/50" />
                </CardContent>
              </Card>

              {/* Videos Section */}
              <div>
                <Skeleton className="h-6 w-24 mb-4 bg-zinc-800" />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[1, 2].map((i) => (
                    <Card
                      key={i}
                      className="border-zinc-800 bg-zinc-900/50 overflow-hidden"
                    >
                      <div className="w-full aspect-video bg-zinc-800" />
                      <CardContent className="p-3">
                        <Skeleton className="h-4 w-32 bg-zinc-800" />
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Cast Section */}
              <div>
                <Skeleton className="h-6 w-24 mb-4 bg-zinc-800" />
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-zinc-800 border-2 border-zinc-700" />
                      <div>
                        <Skeleton className="h-3 w-24 bg-zinc-800" />
                        <Skeleton className="h-2 w-20 mt-1 bg-zinc-800" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Director Section */}
              <div>
                <Skeleton className="h-6 w-24 mb-4 bg-zinc-800" />
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-zinc-800 border-2 border-zinc-700" />
                  <div>
                    <Skeleton className="h-3 w-24 bg-zinc-800" />
                    <Skeleton className="h-2 w-20 mt-1 bg-zinc-800" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

/**
 * Movie Not Found Component
 * @returns Movie Not Found Component
 */
function MovieNotFound() {
  return (
    <main className="mb-10">
      <div className="relative">
        {/* Dark backdrop */}
        <div className="absolute inset-0 h-[400px]">
          <div className="w-full h-full bg-zinc-900/50" />
          <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background to-background" />
        </div>

        {/* Content */}
        <div className="container mx-auto px-4 pt-20 relative">
          <div className="flex flex-col items-center justify-center text-center space-y-4">
            <h1 className="text-4xl font-bold text-zinc-50">Movie Not Found</h1>
            <p className="text-zinc-400 max-w-[500px]">
              We couldn't find the movie you're looking for. It might have been
              removed or you may have followed a broken link.
            </p>
            <Link href="/">
              <Button variant="secondary" className="bg-zinc-800 text-zinc-100">
                Back to Home
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}

/**
 * Trailer Component
 * @param trailer {VideoResult} - Trailer Object
 * @returns Trailer Component
 */
function Trailer({ trailer }: { trailer: VideoResult }) {
  return (
    <div>
      <h2
        className={`text-lg font-semibold text-zinc-50 mb-4 ${bebasNeue.className} tracking-wide`}
      >
        Trailer
      </h2>
      <Card className="border-zinc-800 bg-zinc-900/50 overflow-hidden">
        <div className="aspect-video">
          <iframe
            className="w-full h-full"
            src={`https://www.youtube.com/embed/${trailer.key}`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </Card>
    </div>
  );
}
