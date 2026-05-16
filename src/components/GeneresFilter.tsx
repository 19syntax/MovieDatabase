import { useEffect, useState } from "react";
import { getGenres } from "../services/tmdb";
import type { Genre } from "../types/Movie";

interface GenresFilterProps {
  handleGenreSelect: (genre: Genre | null) => void;
}

const GenresFilter = ({ handleGenreSelect }: GenresFilterProps) => {
  const [genres, setGenres] = useState<Genre[]>([]);
  useEffect(() => {
    async function loadGenres() {
      const data = await getGenres();
      setGenres(data);
    }

    loadGenres();
  }, []);

  return (
    <div>
      <select
        name=""
        aria-label="Filter by genre"
        onChange={(e) => {
          const value = e.target.value;
          if (value === "") {
            handleGenreSelect(null);
            return;
          }
          const selectedGenre = genres.find(
            (genre) => genre.id === parseInt(value),
          );
          if (selectedGenre) handleGenreSelect(selectedGenre);
        }}
      >
        <option key="default" value="">
          All Genres
        </option>
        {genres.map((genre) => (
          <option key={genre.id} value={genre.id}>
            {genre.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default GenresFilter;
