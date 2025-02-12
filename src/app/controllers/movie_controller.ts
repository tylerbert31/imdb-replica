import Controller from "./controller";
import { NextRequest, NextResponse } from "next/server";
import {
  SearchResultsArr,
  MovieDetails,
  TrendMovie,
  TrendTV,
} from "../lib/types/movie";

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
   *  "query": "Avengers"
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
   * @param query {string}
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
   * @param id {number}
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
   * Get Trending (Movie | TV Show) (Today | This Week)
   * @param type {string} `'movie' | 'tv'`
   * @param page {number}
   * @param span {string} `'day' | 'week'`
   * @returns {Promise<TrendMovie | TrendTV>}
   */
  public async getTrending(
    type: "movie" | "tv" = "movie",
    page = 1,
    span: "day" | "week" = "day"
  ) {
    const url = `https://api.themoviedb.org/3/trending/${type}/${span}?page=${page}`;
    const today = new Date().toISOString().split("T")[0];

    const cacheKey = `trending_${type}_${span}_${page}_${today}`;
    const cacheData = await this.getCache(cacheKey);

    type Trend = typeof type extends "movie" ? TrendMovie : TrendTV;

    if (cacheData) {
      return cacheData as Trend;
    }

    const data: Trend = await this.get(url, {
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
