import Controller from "./controller";
import { NextRequest, NextResponse } from "next/server";

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
  public async search(req: NextRequest) {
    let body: any = null;
    let resData = null;

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

    resData = await this.searchMovie(body.query);

    return NextResponse.json(resData);
  }

  public async searchMovie(query: string) {
    if (!query || !query.trim() || query.trim().length < 3) {
      return null;
    }

    const cacheKey = `movie_search_${query}`;
    const cacheData = await this.getCache(cacheKey);

    if (cacheData) {
      return cacheData;
    }

    const url = `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=1`;

    this.log("Fetching data from TMDB");

    const data = await this.get(url, {
      headers: {
        Authorization: `Bearer ${this.tmdbReadKey}`,
        Accept: "application/json",
      },
    }).then((res) => res.data);

    if (data) {
      this.setCache(cacheKey, data);
    }

    return data;
  }
}

const MovieController = new movieController();
export default MovieController;
