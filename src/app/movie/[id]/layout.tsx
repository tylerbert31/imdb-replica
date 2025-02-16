import React from "react";
import { Metadata } from "next";
import MovieController from "@/controllers/movie_controller";
import MyTools from "@/lib/client/mytools";

interface Props {
  children: React.ReactNode;
  params: Promise<{ id: string }>;
}

/**
 * Generate Metadata for the Movie Detail Page
 * @param params {Promise<{ id: string }>} - The parameters for the movie detail page
 * @returns {Promise<Metadata>} - The metadata for the movie detail page
 */
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const { id } = await params;
    const movieId = parseInt(id);
    const movieDetails = await MovieController.getMovieDetails(movieId);

    if (!movieDetails) {
      throw new Error("Movie not found");
    }

    return {
      title: `${movieDetails.title} | TMDB - Tyler's Movie Database`,
      description: movieDetails.overview,
      openGraph: {
        title: `${movieDetails.title} | TMDB - Tyler's Movie Database`,
        description: movieDetails.overview,
        images: [
          {
            url: MyTools.getPosterUrl(
              movieDetails.backdrop_path || movieDetails.poster_path
            ),
            width: 1200,
            height: 630,
            alt: movieDetails.title,
          },
        ],
        siteName: "TMDB - Tyler's Movie Database",
        type: "website",
      },
      twitter: {
        card: "summary_large_image",
        title: `${movieDetails.title} | TMDB - Tyler's Movie Database`,
        description: movieDetails.overview,
        images: [
          MyTools.getPosterUrl(
            movieDetails.backdrop_path || movieDetails.poster_path
          ),
        ],
      },
    };
  } catch (error) {
    return {
      title: "Not Found",
      description: "The requested page could not be found.",
    };
  }
}

export default function MovieDetailLayout({ children, params }: Props) {
  return <>{children}</>;
}
