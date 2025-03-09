import { render, screen, fireEvent } from "@testing-library/react";
import { vi } from "vitest";
import SearchBar from "../components/SearchBar";

test("renders search input and button", () => {
  render(<SearchBar onSearch={() => {}} />);
  
  const searchInput = screen.getByPlaceholderText(/search for articles/i);
  const submitButton = screen.getByText(/search/i);
  
  expect(searchInput).toBeInTheDocument();
  expect(submitButton).toBeInTheDocument();
});

test("updates input value on change", () => {
  render(<SearchBar onSearch={() => {}} />);
  
  const searchInput = screen.getByPlaceholderText(/search for articles/i);
  fireEvent.change(searchInput, { target: { value: "React" } });
  
  expect(searchInput).toHaveValue("React");
});

test("triggers search when the search form is submitted", () => {
  const onSearch = vi.fn();
  render(<SearchBar onSearch={onSearch} />);
  
  const searchInput = screen.getByPlaceholderText(/search for articles/i);
  fireEvent.change(searchInput, { target: { value: "React" } });
  
  const submitButton = screen.getByText(/search/i);
  fireEvent.click(submitButton);
  
  expect(onSearch).toHaveBeenCalledWith("React");
});