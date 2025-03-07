// src/tests/Filters.test.tsx
import { render, screen, fireEvent } from "@testing-library/react";
import Filters from "../components/Filters";
import { vi } from "vitest";

test("triggers filter change when an option is selected", () => {
  const onFilterChange = vi.fn();
  render(<Filters onFilterChange={onFilterChange} />);

  const categorySelect = screen.getByRole("combobox", {
    name: /Select Category/i,
  });
  fireEvent.change(categorySelect, { target: { value: "Technology" } });
  expect(onFilterChange).toHaveBeenCalledWith({
    category: "Technology",
    date: "",
    source: "",
  });

  const dateSelect = screen.getByRole("combobox", { name: /Select Date/i });
  fireEvent.change(dateSelect, { target: { value: "today" } });
  expect(onFilterChange).toHaveBeenCalledWith({
    category: "",
    date: "today",
    source: "",
  });

  const sourceSelect = screen.getByRole("combobox", { name: /Select Source/i });
  fireEvent.change(sourceSelect, { target: { value: "newsapi" } });
  expect(onFilterChange).toHaveBeenCalledWith({
    category: "",
    date: "",
    source: "newsapi",
  });
});
