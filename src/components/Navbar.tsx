// src/components/Navbar.tsx
import { Link } from "react-router";
import SearchBar from "./SearchBar";
import Filters from "./Filters";
import { useAppDispatch } from "../store/hooks/hooks";
import { setFilters } from "../store/reducers/articleSlice";
// import { fetchArticles } from "../api/newsAPI";

const Navbar = ({ onSearch }: { onSearch: (query: string) => void }) => {
    const dispatch = useAppDispatch();

    // const query = useAppSelector((state) => state.articles.query);

    const handleFilterChange = (newFilters: {
      category: string;
      date: string;
      source: string;
    }) => {
      dispatch(setFilters(newFilters));
      // Fetch articles based on the updated filters
      // fetchArticles(query, newFilters);
    };

  return (
    <nav className="bg-blue-600 p-4 fixed z-30 w-full">
      <div className="max-w-7xl mx-auto flex justify-center md:justify-between items-center flex-wrap gap-4">
        <Link to="/" className="text-white text-2xl font-bold">
          News Aggregator
        </Link>

        <SearchBar onSearch={onSearch} />

        <Filters onFilterChange={handleFilterChange} />
      </div>
    </nav>
  );
};

export default Navbar;
