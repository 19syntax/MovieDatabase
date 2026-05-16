import { useEffect, useMemo, useState } from "react";
import type { Genre, Movie } from "../types/Movie";
import { getTrendingMovies, searchMovies } from "../services/tmdb";
import { SearchBar } from "./SearchBar";
import { MovieGrid } from "./MovieGrid";
import { Link, useNavigate } from "react-router-dom";
import GenresFilter from "./GeneresFilter";
import { SortDropdown } from "./SortDropdown";

export default function HomePage() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGenre, setSelectedGenre] = useState<Genre | null>(null);
  const [selectedSort, setSelectedSort] = useState<string | null>(null);

  useEffect(() => {
    async function loadMovie() {
      const data = await getTrendingMovies();
      setMovies(data);
      console.log(data);
      setLoading(false);
    }

    loadMovie();
  }, []);

  useEffect(() => {
    async function performSearch() {
      if (searchQuery.trim() === "") {
        setLoading(true);
        const data = await getTrendingMovies();
        setMovies(data);
        setLoading(false);
      } else {
        setLoading(true);
        const response = await searchMovies(searchQuery);
        setMovies(response.results);
        setLoading(false);
      }
    }

    performSearch();
  }, [searchQuery]);

  const handleMovieClick = (movie: Movie) => {
    navigate(`/movie/${movie.id}`);
  };
  const handleGenreSelect = (genre: Genre | null) => {
    setSelectedGenre(genre);
  };
  const onSortChange = (sort: string) => {
    setSelectedSort(sort);
  };

  const filteredSortAndGenreMovies = useMemo(() => {
    let result = selectedGenre
      ? movies.filter((movie) => movie.genre_ids.includes(selectedGenre.id))
      : movies;

    return [...result].sort((a, b) => {
      switch (selectedSort) {
        case "Popularity (High to Low)":
          return b.popularity - a.popularity;
        case "Rating (High to Low)":
          return b.vote_average - a.vote_average;
        case "Rating (Low to High)":
          return a.vote_average - b.vote_average;
        case "Release Date (Newest First)":
          return (
            new Date(b.release_date).getTime() -
            new Date(a.release_date).getTime()
          );
        case "Release Date (Oldest First)":
          return (
            new Date(a.release_date).getTime() -
            new Date(b.release_date).getTime()
          );
        case "Title (A-Z)":
          return a.title.localeCompare(b.title);
        case "Title (Z-A)":
          return b.title.localeCompare(a.title);
        default:
          return 0;
      }
    });
  }, [movies, selectedGenre, selectedSort]);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-gray-900 mb-6">
              🎬 Movie Database
            </h1>
            <GenresFilter handleGenreSelect={handleGenreSelect} />
            <SortDropdown onSortChange={onSortChange} />
            <Link to="/favourite">Favourite</Link>
          </div>

          <SearchBar onSearch={setSearchQuery} />
        </div>
      </header>
      {/* main content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        <h2 className="text-2xl font-semibold mb-6">
          {searchQuery
            ? `Search Results for "${searchQuery}"`
            : "Trending Movies"}
        </h2>

        <MovieGrid
          movies={filteredSortAndGenreMovies}
          loading={loading}
          onMovieClick={handleMovieClick}
        />
      </main>
    </div>
  );
}
