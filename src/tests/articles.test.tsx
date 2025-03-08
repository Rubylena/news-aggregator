import { render, screen, fireEvent } from "@testing-library/react";
import { vi } from "vitest";
import Articles from "../components/Articles";
import { Article } from "../utils/interface";

const mockArticles = [
  {
    title: "Article 1",
    description: "Description 1",
    url: "http://example.com/1",
    urlToImage: "http://example.com/image1.jpg",
  },
  {
    title: "Article 2",
    description: "Description 2",
    url: "http://example.com/2",
    urlToImage: "http://example.com/image2.jpg",
  },
] as Article[];

test("renders articles correctly", () => {
  render(
    <Articles
      articles={mockArticles}
      fetchNextPage={() => {}}
      hasNextPage={false}
      isFetchingNextPage={false}
      resultFilters={{}}
    />
  );

  const articleTitles = screen.getAllByText(/Article/i);
  expect(articleTitles).toHaveLength(2);

  const articleDescriptions = screen.getAllByText(/Description/i);
  expect(articleDescriptions).toHaveLength(2);
});

test("renders 'Load More' button when there are more pages and result filters", () => {
  render(
    <Articles
      articles={mockArticles}
      fetchNextPage={() => {}}
      hasNextPage={true}
      isFetchingNextPage={false}
      resultFilters={{ category: "technology" }}
    />
  );

  const loadMoreButton = screen.getByText(/Load More/i);
  expect(loadMoreButton).toBeInTheDocument();
});

test("does not render 'Load More' button when there are no more pages", () => {
  render(
    <Articles
      articles={mockArticles}
      fetchNextPage={() => {}}
      hasNextPage={false}
      isFetchingNextPage={false}
      resultFilters={{ category: "technology" }}
    />
  );

  const loadMoreButton = screen.queryByText(/Load More/i);
  expect(loadMoreButton).not.toBeInTheDocument();
});

test("renders loading spinner when fetching next page", () => {
  render(
    <Articles
      articles={mockArticles}
      fetchNextPage={() => {}}
      hasNextPage={true}
      isFetchingNextPage={true}
      resultFilters={{ category: "technology" }}
    />
  );

  const spinner = screen.getByRole("status");
  expect(spinner).toBeInTheDocument();
});

test("calls fetchNextPage when 'Load More' button is clicked", () => {
  const fetchNextPage = vi.fn();
  render(
    <Articles
      articles={mockArticles}
      fetchNextPage={fetchNextPage}
      hasNextPage={true}
      isFetchingNextPage={false}
      resultFilters={{ category: "technology" }}
    />
  );

  const loadMoreButton = screen.getByText(/Load More/i);
  fireEvent.click(loadMoreButton);

  expect(fetchNextPage).toHaveBeenCalled();
});
