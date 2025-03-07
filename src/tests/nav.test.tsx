// src/tests/Navbar.test.tsx
import { render, screen, fireEvent } from "@testing-library/react";
import Navbar from "../components/Navbar";
import { vi } from "vitest";

test("renders Navbar with search bar and links", () => {
  const onSearch = vi.fn();
  render(<Navbar onSearch={onSearch} />);

  // Check if search bar is present
  const searchInput = screen.getByPlaceholderText(/search articles/i);
  expect(searchInput).toBeInTheDocument();

  // Check if links are present
  expect(screen.getByText(/Sports/i)).toBeInTheDocument();
  expect(screen.getByText(/Technology/i)).toBeInTheDocument();
  expect(screen.getByText(/Business/i)).toBeInTheDocument();
  expect(screen.getByText(/Sources/i)).toBeInTheDocument();
});

test("triggers search when the search form is submitted", () => {
  const onSearch = vi.fn();
  render(<Navbar onSearch={onSearch} />);

  const searchInput = screen.getByPlaceholderText(/search articles/i);
  fireEvent.change(searchInput, { target: { value: "React" } });

  const submitButton = screen.getByText(/Search/i);
  fireEvent.click(submitButton);

  expect(onSearch).toHaveBeenCalledWith("React");
});
