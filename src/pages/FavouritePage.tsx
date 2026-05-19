import { useEffect, useState } from "react";
import { useFavourite } from "../context/Favourite";
import type { Movie, MovieDetails } from "../types/Movie";
import { getMovieDetails } from "../services/tmdb";
import { useNavigate } from "react-router-dom";
import { MovieCard } from "../components/MovieCard";

export const FavouritePage = () => {
  const { favourite, clearAll } = useFavourite();
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function loadFavourite() {
      if (favourite.length === 0) {
        setMovies([]);
        setLoading(false);
        return;
      }

      setLoading(true);
      const moviePromise = favourite.map((id) => getMovieDetails(id));

      const results = await Promise.all(moviePromise);
      const validMovies = results.filter(
        (movie): movie is MovieDetails => movie !== null,
      );

      setMovies(validMovies);
      setLoading(false);
    }

    loadFavourite();
  }, [favourite]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-xl text-gray-600">Loading favorites...</p>
      </div>
    );
  }
  const handleFavoriteDetail = (movie: Movie) => {
    navigate(`/movie/${movie.id}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl flex justify-between items-center mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">
            🎬 Favourite ({favourite.length})
          </h1>

          <div className="flex gap-4 items-center">
            {favourite.length > 0 && (
              <button onClick={clearAll}>Clear All</button>
            )}
          </div>
        </div>
      </header>
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 bg-gray-300 text-gray-600 hover:text-gray-900 
                     transition-colors mb-6 focus:outline-none focus:ring-2 
                     focus:ring-blue-500 rounded m-5 px-6 py-2"
        aria-label="Go back to previous page"
      >
        <span aria-hidden="true">←</span>
        <span>Back</span>
      </button>
      <main className="max-w-7xl mx-auto px-4 py-8">
        {movies.length === 0 ? (
          <div className="text-center text-gray-500">
            No favorite movies yet.
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {movies.map((movie) => (
              <MovieCard
                key={movie.id}
                movie={movie}
                onClick={() => handleFavoriteDetail(movie)}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};
