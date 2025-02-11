import autoBind from "../auto_bind";

class myTools {
  constructor() {
    autoBind(this);
  }

  /**
   * Build Poster URL from TMDB Poster Path
   * @param posterPath {string}
   * @returns
   */
  public getPosterUrl(posterPath: string): string {
    return `https://image.tmdb.org/t/p/w500/${posterPath}`;
  }
}

const MyTools = new myTools();
export default MyTools;
