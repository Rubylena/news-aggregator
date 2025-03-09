import { render, screen, fireEvent } from "@testing-library/react";
import { vi } from "vitest";
import Filters from "../components/Filters";
import { BrowserRouter as Router } from "react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const queryClient = new QueryClient();
import { Provider } from "react-redux";
import { store } from "../store/store";

test("renders Filters component with all fields", () => {
  render(
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <Router>
          <Filters onFilterChange={() => {}} type="search" />
        </Router>
      </QueryClientProvider>
    </Provider>
  );

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
  render(
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <Router>
          <Filters onFilterChange={onFilterChange} type="search" />
        </Router>
      </QueryClientProvider>
    </Provider>
  );

  const categorySelect = screen.getByText(/select category/i);
  fireEvent.change(categorySelect, { target: { value: "technology" } });

  expect(categorySelect).toHaveValue("technology");
});

test("updates date value on change", () => {
  const onFilterChange = vi.fn();
  render(
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <Router>
          <Filters onFilterChange={onFilterChange} type="result" />
        </Router>
      </QueryClientProvider>
    </Provider>
  );

  const dateInput = screen.getByPlaceholderText(/search for articles by date/i);
  fireEvent.change(dateInput, { target: { value: "2023-10-01" } });

  expect(dateInput).toHaveValue("2023-10-01");
});

test("updates source value on change", () => {
  const onFilterChange = vi.fn();
  render(
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <Router>
          <Filters onFilterChange={onFilterChange} type="search" />{" "}
        </Router>
      </QueryClientProvider>
    </Provider>
  );

  const sourceSelect = screen.getByText(/select source/i);
  fireEvent.change(sourceSelect, { target: { value: "The New York Times" } });

  expect(sourceSelect).toHaveValue("The New York Times");
});

test("updates person value on change", () => {
  const onFilterChange = vi.fn();
  render(
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <Router>
          <Filters onFilterChange={onFilterChange} type="search" />{" "}
        </Router>
      </QueryClientProvider>
    </Provider>
  );

  const personInput = screen.getByPlaceholderText(
    /search for articles by author/i
  );
  fireEvent.change(personInput, { target: { value: "John Doe" } });

  expect(personInput).toHaveValue("John Doe");
});
