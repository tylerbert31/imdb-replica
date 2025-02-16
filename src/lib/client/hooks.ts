import axios from "axios";
import { MovieDetails, SearchResultsArr } from "../types/movie";

/**
 * # Movie Details
 * ---
 * #### This is used to get the movie details for a given movie id.
 * ---
 * API - `POST /api/detail`
 * @param id {string | number} - Movie ID
 * @returns {Promise<MovieDetails | null>} - Movie Details
 */
export const useMovieDetails = async (
  id: string | number
): Promise<MovieDetails | null> => {
  try {
    const { data } = await axios.post("/api/detail", {
      movie_id: id,
    });

    return data as MovieDetails;
  } catch (error) {
    console.error(error);
    return null;
  }
};

/**
 * # Search Movie
 * ---
 * #### This is used to search for a movie by name.
 * ---
 * API - `POST /api/search`
 * @param query {string} - Movie Name
 * @param page {number} - Page Number
 * @returns {Promise<SearchResultsArr | null>} - Search Results
 */
export const useSearchMovie = async (
  query: string,
  page: number = 1
): Promise<SearchResultsArr | null> => {
  try {
    const { data } = await axios.post("/api/search", {
      query,
      page,
    });

    return data as SearchResultsArr;
  } catch (error) {
    console.error(error);
    return null;
  }
};
