import Controller from "./controller";
import { NextRequest, NextResponse } from "next/server";
import {
  SearchResultsArr,
  MovieDetails,
  TrendMovie,
  TrendTV,
  TrendingMovies,
} from "../lib/types/movie";

/**
 * #### Movie Controller
 * ---
 * An API / Server controller for the movie API.
 *
 * Developer Github - [tylerbert31](https://github.com/tylerbert31)
 */
class movieController extends Controller {
  constructor() {
    super();
  }

  /**
   * ### API Route - Search Movies
   * ---
   * **Request Body:**
   * ```
   * {
   *  "query": "Avengers",
   *  "page": 1
   * }
   * ```
   */
  public async apiSearch(req: NextRequest) {
    let body: any = null;
    let resData = null;
    let page: number = 1;

    try {
      body = await req.json();
    } catch (error) {
      return NextResponse.json(
        {
          message: "Invalid request body",
        },
        { status: 400 }
      );
    }

    if (!this.validateRequest(body)) {
      return NextResponse.json({
        message: "Invalid request body",
      });
    }

    page = body.page || page;
    resData = await this.searchMovie(body.query, page);

    return NextResponse.json(resData);
  }

  /**
   * Search for a movie
   * ---
   * @param query {string} - The query to search for.
   * @param page {number} - Optional, defaults to 1
   * @returns {Promise<SearchResultsArr | null>}
   */
  public async searchMovie(
    query: string,
    page: number = 1
  ): Promise<SearchResultsArr | null> {
    if (!query || !query.trim()) {
      return null;
    }

    const cacheKey = `movie_search_${query}_${page}`;
    const cacheData: SearchResultsArr | null | undefined = await this.getCache(
      cacheKey
    );

    if (cacheData) {
      return cacheData;
    }

    const url = `https://api.themoviedb.org/3/search/movie?query=${query}&language=en-US&page=${page}`;

    const data: SearchResultsArr = await this.get(url, {
      headers: {
        Authorization: `Bearer ${this.tmdbReadKey}`,
        Accept: "application/json",
      },
    }).then((res) => res.data);

    if (data) {
      await this.setCache(cacheKey, data);
    }

    return data;
  }

  /**
   * Get Movie Details
   * ---
   * @param id {number} - The movie id to get the details for.
   * @returns {Promise<MovieDetails | null>}
   */
  public async getMovieDetails(id: number): Promise<MovieDetails | null> {
    if (!id) {
      return null;
    }

    let data: MovieDetails | null = null;

    const cacheKey = `movie_details_${id}`;
    const cacheData = await this.getCache(cacheKey);

    if (cacheData) {
      return cacheData as MovieDetails;
    }

    const url = `https://api.themoviedb.org/3/movie/${id}?language=en-US&append_to_response=credits,videos,images`;

    try {
      data = await this.get(url, {
        headers: {
          Authorization: `Bearer ${this.tmdbReadKey}`,
          Accept: "application/json",
        },
      }).then((res) => res.data);
    } catch (error) {}

    if (data) {
      await this.setCache(cacheKey, data);
    }

    return data;
  }

  /**
   * Get Trending Movies (Today | This Week)
   * ---
   * @returns {Promise<TrendingMovies>}
   */
  public async getTrending(
    page = 1,
    span: "day" | "week" = "day"
  ): Promise<TrendingMovies> {
    const url = `https://api.themoviedb.org/3/trending/movie/${span}?page=${page}`;
    const today = new Date().toISOString().split("T")[0];

    const cacheKey = `trending_movie_${span}_${page}_${today}`;
    const cacheData = await this.getCache(cacheKey);

    if (cacheData) {
      return cacheData as TrendingMovies;
    }

    const data: TrendingMovies = await this.get(url, {
      headers: {
        Authorization: `Bearer ${this.tmdbReadKey}`,
        Accept: "application/json",
      },
    }).then((res) => res.data);

    if (data) {
      await this.setCache(cacheKey, data);
    }

    return data;
  }

  /**
   * Get Recommended movies for a movie
   * ---
   * @param id {number} - Movie ID
   * @returns
   */
  public async getRecommendedMovies(
    id: number
  ): Promise<SearchResultsArr | null> {
    if (!id) {
      return null;
    }
    const url = `https://api.themoviedb.org/3/movie/${id}/recommendations`;
    const cacheKey = `movie_recommendations_${id}`;
    const cacheData = await this.getCache(cacheKey);

    if (cacheData) {
      return cacheData as SearchResultsArr;
    }

    const data = await this.get(url, {
      headers: {
        Authorization: `Bearer ${this.tmdbReadKey}`,
        Accept: "application/json",
      },
    }).then((res) => res.data);

    if (data) {
      await this.setCache(cacheKey, data);
    }

    return data as SearchResultsArr;
  }
}

const MovieController = new movieController();
export default MovieController;
