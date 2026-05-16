export interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date: string;
  vote_average: number;
  vote_count: number;
  popularity: number;
  genre_ids: number[];
  adult: boolean;
  original_language: string;
}

export interface MovieDetails extends Movie {
  runtime: number;
  genres: Genre[];
  budget: number;
  revenue: number;
  tagline: string;
  homepage: string;
}

export interface Genre {
  id: number;
  name: string;
}

export interface APIResponse<T> {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
}

export interface SearchFilters {
  query: string;
  sortBy:
    | "popularity.desc"
    | "popularity.asc"
    | "release_date.desc"
    | "release_date.asc"
    | "vote_average.desc";
  genre?: number;
  year?: number;
}
