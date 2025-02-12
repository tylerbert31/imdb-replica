import MovieController from "@/controllers/movie_controller";
import { NextRequest, NextResponse } from "next/server";

export const POST = MovieController.apiSearch;

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;

  const query = searchParams.get("query") || "";
  const page = searchParams.get("page") || 1;

  if (!query) {
    return NextResponse.json(
      {
        message: "missing '?query=movie_name' parameter",
      },
      { status: 400 }
    );
  }

  const data = await MovieController.searchMovie(query, Number(page));
  return NextResponse.json(data);
}
