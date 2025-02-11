import Controller from "./controller";
import { NextRequest, NextResponse } from "next/server";

class movieController extends Controller {
  constructor() {
    super();
  }
}

const MovieController = new movieController();
export default MovieController;
