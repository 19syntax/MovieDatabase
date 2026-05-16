const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = import.meta.env.VITE_TMDB_BASE_URL;
const IMAGE_BASE = import.meta.env.VITE_TMDB_IMAGE_BASE_URL;
const isDevelopment = import.meta.env.DEV;

import type { APIResponse, Genre, Movie, MovieDetails } from "../types/Movie";

async function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function getTrendingMovies(): Promise<Movie[]> {
  try {
    if (isDevelopment) {
      await delay(2000); // Simulate delay in development
    }
    const response = await fetch(
      `${BASE_URL}/trending/movie/week?api_key=${API_KEY}`,
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data: APIResponse<Movie> = await response.json();
    return data.results;
  } catch (error) {
    console.error("Error fetching trending movie:", error);
    return [];
  }
}

export async function searchMovies(
  query: string,
  page: number = 1,
): Promise<APIResponse<Movie>> {
  try {
    if (isDevelopment) {
      await delay(1000); // Simulate delay in development
    }
    const response = await fetch(
      `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}&page=${page}`,
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error searching movies:", error);
    return {
      page: 1,
      results: [],
      total_pages: 0,
      total_results: 0,
    };
  }
}

export async function getMovieDetails(
  id: number,
): Promise<MovieDetails | null> {
  try {
    if (isDevelopment) {
      await delay(1000); // Simulate delay in development
    }
    const response = await fetch(`${BASE_URL}/movie/${id}?api_key=${API_KEY}`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching movie details:", error);
    return null;
  }
}

export function getImageUrl(
  path: string | null,
  size: "w200" | "w500" | "original" = "w500",
): string {
  if (!path) {
    return "https://via.placeholder.com/500x750?text=No+Image";
  }
  return `${IMAGE_BASE}/${size}${path}`;
}

export async function getGenres(): Promise<Genre[]> {
  try {
    const response = await fetch(
      `${BASE_URL}/genre/movie/list?api_key=${API_KEY}`,
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data.genres;
  } catch (error) {
    console.error("Error fetching genres:", error);
  }
  return [];
}
