import { useEffect, useState } from "react";
import { useDebounce } from "../hooks/useDebounce";

interface SearchBarProps {
  onSearch: (query: string) => void;
}

export const SearchBar = ({ onSearch }: SearchBarProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const debounceSearch = useDebounce(searchTerm, 500);

  useEffect(() => {
    onSearch(debounceSearch);
  }, [debounceSearch, onSearch]);

  return (
    <div>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search movies..."
        className="w-full px-4 py-3 pr-10 rounded-lg border border-gray-300 
                   focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      {searchTerm && (
        <button
          onClick={() => setSearchTerm("")}
          className="absolute right-3 top-1/2 -translate-y-1/2 
                     text-gray-400 hover:text-gray-600"
        >
          ✕
        </button>
      )}
    </div>
  );
};
