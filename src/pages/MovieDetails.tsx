import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import type { MovieDetails as MovieDetailsType } from "../types/Movie";
import { getImageUrl, getMovieDetails } from "../services/tmdb";
import {
  formatRuntime,
  formatCurrency,
  getYear,
} from "../utils/helperFunctions";

export default function MovieDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [movie, setMovie] = useState<MovieDetailsType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadMovieDetails() {
      if (!id) return;

      setLoading(true);
      setError(null);

      try {
        const movieId = parseInt(id, 10);

        if (isNaN(movieId)) {
          setError("Invalid movie ID");
          setLoading(false);
          return;
        }

        const data = await getMovieDetails(movieId);

        if (!data) {
          setError("Movie not found");
        } else {
          setMovie(data);
        }
      } catch (error) {
        setError("Failed to load movie details");
        console.error("Error fetching movie details:", error);
      } finally {
        setLoading(false);
      }
    }

    loadMovieDetails();
  }, [id]);

  if (loading) {
    return <LoadingSkeleton />;
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl text-red-600 mb-4">{error}</p>
          <button
            onClick={() => navigate("/")}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Go Home
          </button>
        </div>
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-xl text-gray-600">Movie not found</p>
      </div>
    );
  }

  const genres = movie.genres.map((genre) => genre.name).join(", ");
  const year = getYear(movie.release_date);
  const runtime = formatRuntime(movie.runtime);
  const rating = movie.vote_average.toFixed(1);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-gray-900">
            🎬 Movie Database
          </h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 
                     transition-colors mb-6 focus:outline-none focus:ring-2 
                     focus:ring-blue-500 rounded px-2 py-1"
          aria-label="Go back to previous page"
        >
          <span aria-hidden="true">←</span>
          <span>Back</span>
        </button>

        {movie.backdrop_path && (
          <div className="relative w-full h-64 md:h-96 mb-8 rounded-lg overflow-hidden">
            <img
              src={getImageUrl(movie.backdrop_path, "original")}
              alt={`${movie.title} backdrop`}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-linear-to-t from-gray-900/60 to-transparent" />
          </div>
        )}

        <div className="md:flex gap-8">
          <div className="md:w-1/3 mb-6 md:mb-0">
            <img
              src={getImageUrl(movie.poster_path, "w500")}
              alt={`${movie.title} poster`}
              className="w-full rounded-lg shadow-lg"
            />
          </div>

          <div className="md:w-2/3">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {movie.title}
            </h1>

            <div className="flex flex-wrap items-center gap-3 text-gray-600 mb-6">
              <span className="font-medium">{year}</span>
              <span>•</span>
              <span>{runtime}</span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <span aria-label="Rating">⭐</span>
                {rating}{" "}
                <span className="text-sm">
                  ({movie.vote_count.toLocaleString()} votes)
                </span>
              </span>
            </div>

            <div className="mb-6">
              <h2 className="font-semibold text-gray-900 mb-2">Genres</h2>
              <div className="flex flex-wrap gap-2">
                {movie.genres.map((genre) => (
                  <span
                    key={genre.id}
                    className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                  >
                    {genre.name}
                  </span>
                ))}
              </div>
            </div>

            {movie.tagline && (
              <p className="text-lg italic text-gray-600 mb-6">
                "{movie.tagline}"
              </p>
            )}

            <div className="mb-6">
              <h2 className="font-semibold text-gray-900 mb-2">Overview</h2>
              <p className="text-gray-700 leading-relaxed">{movie.overview}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-100 p-4 rounded-lg">
              {movie.budget > 0 && (
                <div>
                  <p className="font-semibold text-gray-900">Budget</p>
                  <p className="text-gray-700">
                    {formatCurrency(movie.budget)}
                  </p>
                </div>
              )}
              {movie.revenue > 0 && (
                <div>
                  <p className="font-semibold text-gray-900">Revenue</p>
                  <p className="text-gray-700">
                    {formatCurrency(movie.revenue)}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

// Loading Skeleton Component
function LoadingSkeleton() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="h-8 bg-gray-200 rounded w-64 animate-pulse" />
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="h-4 bg-gray-200 rounded w-20 mb-6 animate-pulse" />
        <div className="h-64 md:h-96 bg-gray-200 rounded-lg mb-8 animate-pulse" />

        <div className="md:flex gap-8">
          <div className="md:w-1/3 mb-6 md:mb-0">
            <div className="aspect-2/3 bg-gray-200 rounded-lg animate-pulse" />
          </div>
          <div className="md:w-2/3 space-y-4">
            <div className="h-8 bg-gray-200 rounded w-3/4 animate-pulse" />
            <div className="h-4 bg-gray-200 rounded w-1/2 animate-pulse" />
            <div className="h-4 bg-gray-200 rounded w-full animate-pulse" />
            <div className="h-4 bg-gray-200 rounded w-full animate-pulse" />
          </div>
        </div>
      </main>
    </div>
  );
}
