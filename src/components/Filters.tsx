// src/components/Filters.tsx
interface FiltersProps {
  onFilterChange: (filters: {
    category: string;
    date: string;
    source: string;
  }) => void;
}

const Filters: React.FC<FiltersProps> = ({ onFilterChange }) => {
  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const category = e.target.value;
    onFilterChange({ category, date: "", source: "" });
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const date = e.target.value;
    onFilterChange({ category: "", date, source: "" });
  };

  const handleSourceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const source = e.target.value;
    onFilterChange({ category: "", date: "", source });
  };

  return (
    <div className="space-x-4 bg-white rounded-sm px-5">
      <select
        onChange={handleCategoryChange}
        className="px-4 py-2 rounded-md border-x border-gray-300 focus:outline-none"
      >
        <option value="">Select Category</option>
        <option value="Technology">Technology</option>
        <option value="Business">Business</option>
        <option value="Sports">Sports</option>
      </select>
      <select
        onChange={handleDateChange}
        className="px-4 py-2 rounded-md border-x border-gray-300 focus:outline-none"
      >
        <option value="">Select Date</option>
        <option value="today">Today</option>
        <option value="week">This Week</option>
        <option value="month">This Month</option>
      </select>
      <select
        onChange={handleSourceChange}
        className="px-4 py-2 rounded-md border-x border-gray-300 focus:outline-none"
      >
        <option value="">Select Source</option>
        <option value="newsapi">NewsAPI</option>
        <option value="theguardian">The Guardian</option>
        <option value="nytimes">NY Times</option>
      </select>
    </div>
  );
};

export default Filters;
