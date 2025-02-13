import MovieController from "@/controllers/movie_controller";
import { NextRequest, NextResponse } from "next/server";

/**
 * ## GET Movie Details
 * ---
 * @param req {NextRequest} - Request Object
 * @param movie_id {string} - Movie ID
 * ---
 * Sample Request Query:
 * ```
 * /api/detail?movie_id=123
 * ```
 */
export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;

  const movie_id = searchParams.get("movie_id");

  if (!movie_id) {
    return NextResponse.json(
      {
        message: "missing '?movie_id=movie_id' parameter",
      },
      { status: 400 }
    );
  }

  const data = await MovieController.getMovieDetails(Number(movie_id));
  return NextResponse.json(data);
}

/**
 * #### POST Movie Details
 * ---
 * @param req {NextRequest} Request Object
 * @param movie_id {string}
 *
 *
 * Sample Request Body:
 * ```
 * {
 *   "movie_id": "123"
 * }
 * ```
 */
export async function POST(req: NextRequest) {
  const body = await req.json();

  if (!body.movie_id) {
    return NextResponse.json(
      {
        message: "missing 'movie_id' parameter",
      },
      { status: 400 }
    );
  }

  const movie_id = body.movie_id;

  const data = await MovieController.getMovieDetails(Number(movie_id));
  return NextResponse.json(data);
}
