import { useEffect, useState } from "react";
import { useFavourite } from "../context/Favourite";
import type { Movie, MovieDetails } from "../types/Movie";
import { getImageUrl, getMovieDetails } from "../services/tmdb";
import { useNavigate } from "react-router-dom";

export const FavouritePage = () => {
  const { favourite, removeFavourite, clearAll } = useFavourite();
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
              <div
                className="relative bg-white rounded-lg shadow-md overflow-hidden cursor-pointer 
                   transition-transform hover:scale-105 hover:shadow-xl"
              >
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    removeFavourite(movie.id);
                  }}
                  className="absolute top-2 right-2 z-10 text-white rounded-full 
                 w-8 h-8 flex items-center justify-center hover:scale-110
                 transition-colors"
                  aria-label="Remove from favorites"
                >
                  ❤️
                </button>
                <img
                  src={getImageUrl(movie.poster_path, "w500")}
                  alt={movie.title}
                  className="w-full h-96 object-cover"
                />

                <div className="p-4">
                  <h3 className="font-semibold text-lg mb-2 line-clamp-2">
                    {movie.title}
                  </h3>

                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <span>{new Date(movie.release_date).getFullYear()}</span>
                    <div className="flex gap-2">
                      <span className="flex items-center gap-1">
                        ⭐ {movie.vote_average.toFixed(1)}
                      </span>
                      <span className="flex items-center gap-1"></span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};
