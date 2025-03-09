// src/components/Navbar.tsx
import { Link } from "react-router";
import SearchBar from "./SearchBar";
import Filters from "./Filters";
import { useAppDispatch } from "../store/hooks/hooks";
import { setFilters, setQuery } from "../store/reducers/articleSlice";
import { useEffect, useState } from "react";

const Navbar = ({ onSearch }: { onSearch: (query: string) => void }) => {
  const dispatch = useAppDispatch();

  const handleFilterChange = (newFilters: {
    category: string;
    date: string;
    source: string;
    person: string;
  }) => {
    dispatch(setFilters(newFilters));
  };

  const handleSearch = (query: string) => {
    dispatch(setQuery(query));
    onSearch(query);
  };

  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav
      className={`p-4 sm:fixed z-10 w-full transition-all duration-300 ${
        isScrolled ? "backdrop-blur-md bg-blue-900/70" : "bg-blue-900/100"
      }`}
    >
      <div className="max-w-7xl mx-auto flex justify-center md:justify-between items-center flex-wrap gap-4">
        <Link to="/" className="text-white text-2xl font-bold">
          News Aggregator
        </Link>

        <SearchBar onSearch={handleSearch} />
        <Filters type="search" onFilterChange={handleFilterChange} />
      </div>
    </nav>
  );
};

export default Navbar;
