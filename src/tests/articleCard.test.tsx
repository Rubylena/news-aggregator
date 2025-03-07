// src/tests/ArticleCard.test.tsx
import { render, screen } from "@testing-library/react";
import ArticleCard from "../components/ArticleCard";

test("renders ArticleCard with correct title, description, and link", () => {
  render(
    <ArticleCard
      title="Test Article"
      description="This is a description."
      url="https://example.com"
    />
  );

  expect(screen.getByText(/Test Article/i)).toBeInTheDocument();
  expect(screen.getByText(/This is a description./i)).toBeInTheDocument();
  const link = screen.getByText(/Read more/i);
  expect(link).toBeInTheDocument();
  expect(link).toHaveAttribute("href", "https://example.com");
});
