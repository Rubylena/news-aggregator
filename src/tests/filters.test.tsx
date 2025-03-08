// // src/tests/Filters.test.tsx
// import { render, screen, fireEvent } from "@testing-library/react";
// import Filters from "../components/Filters";
// import { vi } from "vitest";

// test("triggers filter change when an option is selected", () => {
//   const onFilterChange = vi.fn();
//   render(<Filters onFilterChange={onFilterChange} />);

//   const categorySelect = screen.getByRole("combobox", {
//     name: /Select Category/i,
//   });
//   fireEvent.change(categorySelect, { target: { value: "Technology" } });
//   expect(onFilterChange).toHaveBeenCalledWith({
//     category: "Technology",
//     date: "",
//     source: "",
//   });

//   const dateSelect = screen.getByRole("combobox", { name: /Select Date/i });
//   fireEvent.change(dateSelect, { target: { value: "today" } });
//   expect(onFilterChange).toHaveBeenCalledWith({
//     category: "",
//     date: "today",
//     source: "",
//   });

//   const sourceSelect = screen.getByRole("combobox", { name: /Select Source/i });
//   fireEvent.change(sourceSelect, { target: { value: "newsapi" } });
//   expect(onFilterChange).toHaveBeenCalledWith({
//     category: "",
//     date: "",
//     source: "newsapi",
//   });
// });

import { render, screen, fireEvent } from "@testing-library/react";
import { vi } from "vitest";
import Filters from "../components/Filters";

test("renders Filters component with all fields", () => {
  render(<Filters onFilterChange={() => {}} type="search" />);

  const categorySelect = screen.getByText(/select category/i);
  const sourceSelect = screen.getByText(/select source/i);
  const personInput = screen.getByPlaceholderText(
    /search for articles by author/i
  );

  expect(categorySelect).toBeInTheDocument();
  expect(sourceSelect).toBeInTheDocument();
  expect(personInput).toBeInTheDocument();
});

test("updates category value on change", () => {
  const onFilterChange = vi.fn();
  render(<Filters onFilterChange={onFilterChange} type="search" />);

  const categorySelect = screen.getByText(/select category/i);
  fireEvent.change(categorySelect, { target: { value: "technology" } });

  expect(categorySelect).toHaveValue("technology");
});

test("updates date value on change", () => {
  const onFilterChange = vi.fn();
  render(<Filters onFilterChange={onFilterChange} type="result" />);

  const dateInput = screen.getByPlaceholderText(/search for articles by date/i);
  fireEvent.change(dateInput, { target: { value: "2023-10-01" } });

  expect(dateInput).toHaveValue("2023-10-01");
});

test("updates source value on change", () => {
  const onFilterChange = vi.fn();
  render(<Filters onFilterChange={onFilterChange} type="search" />);

  const sourceSelect = screen.getByText(/select source/i);
  fireEvent.change(sourceSelect, { target: { value: "The New York Times" } });

  expect(sourceSelect).toHaveValue("The New York Times");
});

test("updates person value on change", () => {
  const onFilterChange = vi.fn();
  render(<Filters onFilterChange={onFilterChange} type="search" />);

  const personInput = screen.getByPlaceholderText(
    /search for articles by author/i
  );
  fireEvent.change(personInput, { target: { value: "John Doe" } });

  expect(personInput).toHaveValue("John Doe");
});

test("calls onFilterChange with correct values", () => {
  const onFilterChange = vi.fn();
  render(<Filters onFilterChange={onFilterChange} type="search" />);

  const categorySelect = screen.getByText(/select category/i);
  fireEvent.change(categorySelect, { target: { value: "technology" } });

  const sourceSelect = screen.getByText(/select source/i);
  fireEvent.change(sourceSelect, { target: { value: "The New York Times" } });

  const personInput = screen.getByPlaceholderText(
    /search for articles by author/i
  );
  fireEvent.change(personInput, { target: { value: "John Doe" } });

  expect(onFilterChange).toHaveBeenCalledWith({
    category: "technology",
    date: "",
    source: "The New York Times",
    person: "John Doe",
  });
});