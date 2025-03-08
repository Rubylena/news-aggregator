import { useEffect, useState } from "react";
import { fetchResourcesFromNewsAPI } from "../api/newsAPI";
import { FiltersProps } from "../utils/interface";
import { useQuery } from "@tanstack/react-query";

const Filters: React.FC<FiltersProps> = ({ onFilterChange, type }) => {
  const [date, setDate] = useState("");
  const [person, setPerson] = useState("");
  const [category, setCategory] = useState("");
  const [source, setSource] = useState("");

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCategory(e.target.value);
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDate(e.target.value);
  };

  const handleSourceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSource(e.target.value);
  };

  const handlePersonChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPerson(e.target.value);
  };

  const fetchNEWSAPIResources = async () => {
    const resources = await fetchResourcesFromNewsAPI();

    return resources;
  };

  const { data } = useQuery({
    queryKey: ["resources"],
    queryFn: fetchNEWSAPIResources,
  });

  useEffect(() => {
    const handler = setTimeout(() => {
      onFilterChange({ category, date, source, person });
    }, 700);

    return () => {
      clearTimeout(handler);
    };
  }, [category, date, source, person, onFilterChange]);

  return (
    <div
      className={`cursor-pointer rounded-md w-fit ${
        type === "search" ? "max-w-sm" : ""
      } text-sm flex flex-wrap gap-4`}
    >
      <div className="flex-1">
        <select
          onChange={handleCategoryChange}
          className="w-full bg-white shadow-md px-4 py-1 rounded-md border border-gray-300 focus:outline-none"
        >
          <option value="">Select Category</option>
          <option value="general">General</option>
          <option value="technology">Technology</option>
          <option value="business">Business</option>
          <option value="sports">Sports</option>
          <option value="entertainment">Entertainment</option>
          <option value="health">Health</option>
          <option value="science">Science</option>
          <option value="cars">Cars</option>
          <option value="lifestyle">Lifestyle</option>
        </select>
      </div>

      {type === "result" && (
        <div className="flex-1 rounded-md border border-gray-300 focus:outline-none">
          <input
            type="date"
            placeholder="Search for articles by date"
            value={date}
            onChange={handleDateChange}
            className="shadow-md px-4 py-1 rounded-md w-full focus:outline-none bg-white"
          />
        </div>
      )}
      <div className="flex-1">
        <select
          onChange={handleSourceChange}
          className="w-full bg-white shadow-md px-4 py-1 rounded-md border border-gray-300 focus:outline-none"
        >
          <option value="">Select Source</option>
          <option value="The New York Times">NY Times</option>
          {data?.map((item) => (
            <option key={item.id} value={item.id}>
              {item.name}
            </option>
          ))}
        </select>
      </div>
      {type === "search" && (
        <div className="flex-1 rounded-md border border-gray-300 focus:outline-none">
          <input
            type="text"
            placeholder="Search for articles by author"
            value={person}
            onChange={handlePersonChange}
            className="shadow-md px-4 py-1 rounded-md w-full focus:outline-none bg-white"
          />
        </div>
      )}
    </div>
  );
};

export default Filters;
