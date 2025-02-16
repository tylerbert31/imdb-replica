"use server";

import MovieController from "@/controllers/movie_controller";

/**
 * # Server Actions
 * ---
 * For When Using server-actions for type-safety api and reusability.
 */

/**
 * #### Server Action - Get Trending Movies
 * ---
 * #### This is used to get the trending movies.
 * ---
 * @returns The trending movies.
 */
export const getTrending = MovieController.getTrending;

/**
 * #### Server Action - Search Movie
 * ---
 * #### This is used to search for a movie by name.
 * ---
 * @param query {string} - The query to search for.
 * @returns The search results for the given query.
 */
export const searchMovie = MovieController.searchMovie;

/**
 * Server Action - Get Recommended Movies
 * ---
 * #### This is used to get the recommended movies for a given movie id.
 * ---
 * @param id {number} - The movie id to get the recommended movies for.
 * @returns The recommended movies for the given movie id.
 */
export const getRecommendedMovies = MovieController.getRecommendedMovies;
