// src/components/Navbar.tsx
import { Link } from "react-router";
import SearchBar from "./SearchBar";
import Filters from "./Filters";
import { useAppDispatch } from "../store/hooks/hooks";
import { setFilters, setQuery } from "../store/reducers/articleSlice";

const Navbar = ({ onSearch }: { onSearch: (query: string) => void }) => {
  const dispatch = useAppDispatch();

  const handleFilterChange = (newFilters: {
    category: string;
    date: string;
    source: string;
  }) => {
    dispatch(setFilters(newFilters));
  };

  const handleSearch = (query: string) => {
    dispatch(setQuery(query));
    onSearch(query);
  };

  return (
    <nav className="bg-blue-600 p-4 fixed z-30 w-full">
      <div className="max-w-7xl mx-auto flex justify-center md:justify-between items-center flex-wrap gap-4">
        <Link to="/" className="text-white text-2xl font-bold">
          News Aggregator
        </Link>
        <SearchBar onSearch={handleSearch} />
        <Filters onFilterChange={handleFilterChange} />
      </div>
    </nav>
  );
};

export default Navbar;
