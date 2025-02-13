"use server";

import MovieController from "@/controllers/movie_controller";

/**
 * # Server Actions
 * ---
 * For When Using server-actions for type-safety api and reusability.
 */

export const getTrending = MovieController.getTrending;

export const searchMovie = MovieController.searchMovie;
