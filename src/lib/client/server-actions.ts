"use server";

import MovieController from "@/controllers/movie_controller";

export const getTrending = MovieController.getTrending;

export const searchMovie = MovieController.searchMovie;
