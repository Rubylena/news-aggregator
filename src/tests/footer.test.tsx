// src/tests/Footer.test.tsx
import { render, screen } from "@testing-library/react";
import Footer from "../components/Footer";

test("renders Footer with copyright and links", () => {
  render(<Footer />);

  expect(screen.getByText(/News Aggregator/i)).toBeInTheDocument();
  expect(screen.getByText(/Privacy Policy/i)).toBeInTheDocument();
  expect(screen.getByText(/Contact/i)).toBeInTheDocument();
});
