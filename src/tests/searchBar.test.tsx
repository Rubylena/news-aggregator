// src/tests/SearchBar.test.tsx
import { render, screen, fireEvent } from "@testing-library/react";
import SearchBar from "../components/SearchBar";
import { vi } from "vitest";

test("triggers search when the search form is submitted", () => {
  const onSearch = vi.fn();
  render(<SearchBar onSearch={onSearch} />);

  const searchInput = screen.getByPlaceholderText(/search for articles/i);
  fireEvent.change(searchInput, { target: { value: "React" } });

  const submitButton = screen.getByText(/Search/i);
  fireEvent.click(submitButton);

  expect(onSearch).toHaveBeenCalledWith("React");
});
