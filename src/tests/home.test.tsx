import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../store/store";
import { BrowserRouter as Router } from "react-router";
import { vi, Mock } from "vitest";
import * as reactQuery from "@tanstack/react-query";
import Home from "../app/Home";

vi.mock("../components/Navbar", () => ({
  __esModule: true,
  default: () => <div data-testid="navbar" />,
}));

vi.mock("../components/Footer", () => ({
  __esModule: true,
  default: () => <div data-testid="footer" />,
}));

vi.mock("../components/Filters", () => ({
  __esModule: true,
  default: () => <div data-testid="filters" />,
}));

vi.mock("../components/Loader", () => ({
  __esModule: true,
  default: () => <div data-testid="loader" />,
}));

vi.mock("../components/Articles", () => ({
  __esModule: true,
  default: () => <div data-testid="articles" />,
}));

vi.mock("../components/BackToTop", () => ({
  __esModule: true,
  default: () => <div data-testid="back-to-top" />,
}));

vi.mock("@tanstack/react-query", () => ({
  ...vi.importActual("@tanstack/react-query"),
  useInfiniteQuery: vi.fn(),
}));

vi.mock("../api/newsAPI", () => ({
  fetchNewsFromGuardianAPI: vi.fn(),
  fetchNewsFromNewsAPI: vi.fn(),
  fetchNewsFromNYTAPI: vi.fn(),
}));

const mockUseInfiniteQuery = reactQuery.useInfiniteQuery as Mock;

describe("Home component", () => {
  beforeEach(() => {
    mockUseInfiniteQuery.mockReturnValue({
      data: {
        pages: [
          {
            newsAPI: { articles: [] },
            guardianAPI: { results: [] },
            nytAPI: { docs: [] },
          },
        ],
      },
      isLoading: false,
      isError: false,
      fetchNextPage: vi.fn(),
      isFetchingNextPage: false,
      hasNextPage: true,
    });
  });

  test("renders Home component with Navbar, Footer, Filters, and BackToTop", () => {
    render(
      <Provider store={store}>
        <Router>
          <Home />
        </Router>
      </Provider>
    );

    expect(screen.getByTestId("navbar")).toBeInTheDocument();
    expect(screen.getByTestId("footer")).toBeInTheDocument();
    expect(screen.getByTestId("filters")).toBeInTheDocument();
    expect(screen.getByTestId("back-to-top")).toBeInTheDocument();
  });

  test("displays 'No data found' message when filtered data is empty", () => {
    mockUseInfiniteQuery.mockReturnValueOnce({
      data: {
        pages: [
          {
            newsAPI: { articles: [] },
            guardianAPI: { results: [] },
            nytAPI: { docs: [] },
          },
        ],
      },
      isLoading: false,
      isError: false,
      fetchNextPage: vi.fn(),
      isFetchingNextPage: false,
      hasNextPage: true,
    });

    render(
      <Provider store={store}>
        <Router>
          <Home />
        </Router>
      </Provider>
    );

    expect(
      screen.getByText(/No data found based on filters selected/i)
    ).toBeInTheDocument();
  });
});
