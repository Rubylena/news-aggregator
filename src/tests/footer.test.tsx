import { render, screen } from "@testing-library/react";
import Footer from "../components/Footer";

test("renders footer with correct text", () => {
  render(<Footer />);

  const footerText = screen.getByText(/news aggregator/i);
  expect(footerText).toBeInTheDocument();
  expect(footerText).toHaveTextContent(
    `© ${new Date().getFullYear()} News Aggregator`
  );
});

test("renders LinkedIn link with correct href", () => {
  render(<Footer />);

  const linkedInLink = screen.getByText(/linkedin/i);
  expect(linkedInLink).toBeInTheDocument();
  expect(linkedInLink.closest("a")).toHaveAttribute(
    "href",
    "https://www.linkedin.com/in/grace-effiong/"
  );
});

test("renders GitHub link with correct href", () => {
  render(<Footer />);

  const gitHubLink = screen.getByText(/github/i);
  expect(gitHubLink).toBeInTheDocument();
  expect(gitHubLink.closest("a")).toHaveAttribute(
    "href",
    "https://github.com/Rubylena"
  );
});

test("renders Portfolio link with correct href", () => {
  render(<Footer />);

  const portfolioLink = screen.getByText(/portfolio/i);
  expect(portfolioLink).toBeInTheDocument();
  expect(portfolioLink.closest("a")).toHaveAttribute(
    "href",
    "https://graceeffiong.me/"
  );
});