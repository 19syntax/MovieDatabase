import { useFavourite } from "../context/Favourite";
import { getImageUrl } from "../services/tmdb";
import type { Movie } from "../types/Movie";

interface MovieCardProps {
  movie: Movie;
  onClick?: () => void;
}

export const MovieCard = ({ movie, onClick }: MovieCardProps) => {
  const year = movie.release_date
    ? new Date(movie.release_date).getFullYear()
    : "N/A";

  const rating = movie.vote_average.toFixed(1);
  const { isFavourite, toggleFavourite } = useFavourite();
  const favourite = isFavourite(movie.id);

  const handleFavourite = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleFavourite(movie.id);
  };

  return (
    <div
      onClick={onClick}
      className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer 
                 transition-transform hover:scale-105 hover:shadow-xl"
    >
      <img
        src={getImageUrl(movie.poster_path, "w500")}
        alt={movie.title}
        className="w-full h-96 object-cover"
      />
      <button onClick={handleFavourite} className="absolute top-2 right-2">
        {favourite ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1.5em"
            height="1.5em"
            viewBox="0 0 24 24"
          >
            <path d="M0 0h24v24H0z" fill="none" />
            <path
              fill="#c71d1d"
              d="m12 21l-1.45-1.3q-2.525-2.275-4.175-3.925T3.75 12.812T2.388 10.4T2 8.15Q2 5.8 3.575 4.225T7.5 2.65q1.3 0 2.475.55T12 4.75q.85-1 2.025-1.55t2.475-.55q2.35 0 3.925 1.575T22 8.15q0 1.15-.387 2.25t-1.363 2.412t-2.625 2.963T13.45 19.7z"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1.5em"
            height="1.5em"
            viewBox="0 0 24 24"
          >
            <path d="M0 0h24v24H0z" fill="none" />
            <path
              fill="#404040"
              d="M16.5 5c-1.54 0-3.04.99-3.56 2.36h-1.87C10.54 5.99 9.04 5 7.5 5C5.5 5 4 6.5 4 8.5c0 2.89 3.14 5.74 7.9 10.05l.1.1l.1-.1C16.86 14.24 20 11.39 20 8.5c0-2-1.5-3.5-3.5-3.5"
              opacity=".3"
            />
            <path
              fill="#ffff"
              d="m12 21l-1.45-1.3q-2.525-2.275-4.175-3.925T3.75 12.812T2.388 10.4T2 8.15Q2 5.8 3.575 4.225T7.5 2.65q1.3 0 2.475.55T12 4.75q.85-1 2.025-1.55t2.475-.55q2.35 0 3.925 1.575T22 8.15q0 1.15-.387 2.25t-1.363 2.412t-2.625 2.963T13.45 19.7z"
            />
            <path
              fill="#404040"
              d="M16.5 3c-1.74 0-3.41.81-4.5 2.09C10.91 3.81 9.24 3 7.5 3C4.42 3 2 5.42 2 8.5c0 3.78 3.4 6.86 8.55 11.54L12 21.35l1.45-1.32C18.6 15.36 22 12.28 22 8.5C22 5.42 19.58 3 16.5 3m-4.4 15.55l-.1.1l-.1-.1C7.14 14.24 4 11.39 4 8.5C4 6.5 5.5 5 7.5 5c1.54 0 3.04.99 3.57 2.36h1.87C13.46 5.99 14.96 5 16.5 5c2 0 3.5 1.5 3.5 3.5c0 2.89-3.14 5.74-7.9 10.05"
            />
          </svg>
        )}
      </button>

      <div className="p-4">
        <h3 className="font-semibold text-lg mb-2 line-clamp-2">
          {movie.title}
        </h3>

        <div className="flex items-center justify-between text-sm text-gray-600">
          <span>{year}</span>
          <div className="flex gap-2">
            <span className="flex items-center gap-1">⭐ {rating}</span>
            <span className="flex items-center gap-1"></span>
          </div>
        </div>
      </div>
    </div>
  );
};
