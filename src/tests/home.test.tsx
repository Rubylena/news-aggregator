// src/tests/Home.test.tsx
import { render, screen } from "@testing-library/react";
import Home from "../app/Home";

test("renders Home page with Navbar, Filters, Article Cards, and Footer", () => {
  render(<Home />);

  // Check if Navbar is rendered
  expect(screen.getByText(/News Aggregator/i)).toBeInTheDocument();

  // Check if Filters dropdowns are present
  expect(
    screen.getByRole("combobox", { name: /Select Category/i })
  ).toBeInTheDocument();

  // Check if Footer is present
  expect(screen.getByText(/News Aggregator/i)).toBeInTheDocument();

  // Ensure the ArticleCard is rendered (dummy articles will be shown)
  expect(screen.getByText(/React 18 Released!/i)).toBeInTheDocument();
  expect(screen.getByText(/TailwindCSS v3 Update/i)).toBeInTheDocument();
});
