import MovieController from "@/app/controllers/movie_controller";
import { NextRequest, NextResponse } from "next/server";

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
