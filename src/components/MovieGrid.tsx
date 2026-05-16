import type { Movie } from "../types/Movie";
import { MovieCard } from "./MovieCard";
import { MovieDetailsSkeleton } from "./MovieDetailsSkeleton";

interface MovieGridProps {
  movies: Movie[];
  loading: boolean;
  onMovieClick: (movie: Movie) => void;
}
export const MovieGrid = ({
  movies,
  loading,
  onMovieClick,
}: MovieGridProps) => {
  if (loading) {
    return <MovieDetailsSkeleton />;
  }

  if (movies.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-100">
        <div className="text-center">
          <p className="text-xl text-gray-600 mb-2">No movies found</p>
          <p className="text-gray-500">Try a different search term</p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          onClick={() => onMovieClick(movie)}
        />
      ))}
    </div>
  );
};
