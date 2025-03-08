import { useState } from "react";

// src/components/SearchBar.tsx
interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form onSubmit={handleSearchSubmit} className="flex text-sm items-center">
      <input
        type="text"
        placeholder="Search for articles..."
        value={query}
        onChange={handleSearchChange}
        className="px-4 py-1 rounded-l-md w-full focus:outline-none bg-white"
      />
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-1 rounded-r-md shadow"
      >
        Search
      </button>
    </form>
  );
};

export default SearchBar;
