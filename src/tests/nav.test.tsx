import { render, screen, fireEvent } from "@testing-library/react";
import { vi } from "vitest";
import { Provider } from "react-redux";
import { store } from "../store/store";
import Navbar from "../components/Navbar";
import { BrowserRouter as Router } from "react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

test("renders Navbar with SearchBar and Filters", () => {
  render(
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <Router>
          <Navbar onSearch={() => {}} />
        </Router>
      </QueryClientProvider>
    </Provider>
  );

  const linkElement = screen.getByText(/news aggregator/i);

  expect(linkElement).toBeInTheDocument();
});

test("updates Navbar background on scroll", () => {
  render(
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <Router>
          <Navbar onSearch={() => {}} />
        </Router>
      </QueryClientProvider>
    </Provider>
  );

  const navbar = screen.getByRole("navigation");

  // Simulate scroll
  fireEvent.scroll(window, { target: { scrollY: 100 } });

  expect(navbar).toHaveClass("backdrop-blur-md bg-blue-900/70");
});

test("triggers search when the search form is submitted", () => {
  const onSearch = vi.fn();
  render(
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <Router>
          <Navbar onSearch={onSearch} />
        </Router>
      </QueryClientProvider>
    </Provider>
  );

  const searchInputs = screen.getAllByPlaceholderText(
    /search for articles.../i
  );
  expect(searchInputs.length).toBeGreaterThan(1);
  fireEvent.change(searchInputs[0], { target: { value: "React" } });

  const submitButton = screen.getByText(/search/i);
  fireEvent.click(submitButton);

  expect(onSearch).toHaveBeenCalledWith("React");
});

test("dispatches filter change action", () => {
  render(
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <Router>
          <Navbar onSearch={() => {}} />
        </Router>
      </QueryClientProvider>
    </Provider>
  );

  const categorySelect = screen.getByText(/select category/i);
  fireEvent.change(categorySelect, { target: { value: "technology" } });

  const dateInput = screen.queryByPlaceholderText(
    /search for articles by date/i
  );
  expect(dateInput).toBeNull();

  const sourceSelect = screen.getByText(/select source/i);
  fireEvent.change(sourceSelect, { target: { value: "The New York Times" } });

  const authorInput = screen.getByPlaceholderText(
    /search for articles by author/i
  );
  fireEvent.change(authorInput, { target: { value: "John Doe" } });
});
