export interface SearchedMovie {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface SearchResultsArr {
  page: number;
  results: SearchedMovie[] | [];
  total_pages: number;
  total_results: number;
}

interface CreditMemberBase {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string | null;
  credit_id: string;
}

export interface CreditMember extends CreditMemberBase {
  cast_id: number;
  character: string;
  order?: number;
  department?: string;
  job?: string;
}

export interface CastMember extends CreditMemberBase {
  cast_id: number;
  character: string;
  order: number;
}

export interface CrewMember {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string | null;
  cast_id: number;
  character: string;
  credit_id: string;
  department: string;
  job: string;
}

export interface VideoResult {
  iso_639_1: string;
  iso_3166_1: string;
  name: string;
  key: string;
  site: string;
  size: number;
  type: string;
  official: boolean;
  published_at: string;
  id: string;
}

export interface MovieDetails {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection: null | {
    id: number;
    name: string;
    poster_path: string;
    backdrop_path: string;
  };
  budget: number;
  genres: {
    id: number;
    name: string;
  }[];
  homepage: string;
  id: number;
  imdb_id: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: {
    id: number;
    logo_path: string;
    name: string;
    origin_country: string;
  }[];
  production_countries: {
    iso_3166_1: string;
    name: string;
  }[];
  release_date: string;
  revenue: number;
  runtime: number;
  spoken_languages: {
    iso_639_1: string;
    name: string;
  }[];
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  videos?: {
    results: VideoResult[];
  };
  vote_average: number;
  vote_count: number;
  credits: {
    cast: CastMember[] | [];
    crew: CrewMember[] | [];
  };
}

interface MediaBase {
  backdrop_path: string;
  id: number;
  overview: string;
  poster_path: string;
  media_type?: "movie" | "tv";
  adult: boolean;
  original_language: string;
  genre_ids: number[];
  popularity: number;
  vote_average: number;
  vote_count: number;
}

// Movie specific interface
export interface TrendMovie extends MediaBase {
  media_type?: "movie";
  title: string;
  original_title: string;
  release_date: string;
  video: boolean;
}

// TV Show specific interface
export interface TrendTV extends MediaBase {
  media_type?: "tv";
  name: string;
  original_name: string;
  first_air_date: string;
  origin_country: string[];
}

export interface TrendingMovies {
  page: number;
  results: TrendMovie[];
  total_pages: number;
  total_results: number;
}
