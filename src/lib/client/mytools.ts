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
  public getPosterUrl(
    posterPath: string,
    size:
      | "w92"
      | "w154"
      | "w185"
      | "w342"
      | "w500"
      | "w780"
      | "original" = "w500"
  ): string {
    return `https://image.tmdb.org/t/p/${size}/${posterPath}`;
  }

  /**
   * Get Genre Name from Genre ID
   * @param genreId {number}
   */
  public getGenreName(genreId: number): string {
    const genre = this.genres.find((g) => g.id === genreId);
    return genre ? genre.name : "";
  }

  /**
   * Get Genres from Genre IDs
   * @param genreIds {number[]}
   */
  public getGenres(genreIds: number[]): string[] {
    return genreIds.map((id) => this.getGenreName(id));
  }

  private genres: {
    id: number;
    name: string;
  }[] = [
    {
      id: 28,
      name: "Action",
    },
    {
      id: 12,
      name: "Adventure",
    },
    {
      id: 16,
      name: "Animation",
    },
    {
      id: 35,
      name: "Comedy",
    },
    {
      id: 80,
      name: "Crime",
    },
    {
      id: 99,
      name: "Documentary",
    },
    {
      id: 18,
      name: "Drama",
    },
    {
      id: 10751,
      name: "Family",
    },
    {
      id: 14,
      name: "Fantasy",
    },
    {
      id: 36,
      name: "History",
    },
    {
      id: 27,
      name: "Horror",
    },
    {
      id: 10402,
      name: "Music",
    },
    {
      id: 9648,
      name: "Mystery",
    },
    {
      id: 10749,
      name: "Romance",
    },
    {
      id: 878,
      name: "Science Fiction",
    },
    {
      id: 10770,
      name: "TV Movie",
    },
    {
      id: 53,
      name: "Thriller",
    },
    {
      id: 10752,
      name: "War",
    },
    {
      id: 37,
      name: "Western",
    },
  ];
}

const MyTools = new myTools();
export default MyTools;
export { myTools };
