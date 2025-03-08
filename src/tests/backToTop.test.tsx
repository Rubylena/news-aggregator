import { render, screen, fireEvent } from "@testing-library/react";
import { vi } from "vitest";
import BackToTop from "../components/BackToTop";

test("renders BackToTop component", () => {
  render(<BackToTop />);

  const button = screen.queryByRole("button");
  expect(button).not.toBeInTheDocument();
});

test("shows button when scrolled down", () => {
  render(<BackToTop />);

  // Simulate scroll
  fireEvent.scroll(window, { target: { pageYOffset: 400 } });

  const button = screen.getByRole("button");
  expect(button).toBeInTheDocument();
});

test("hides button when scrolled up", () => {
  render(<BackToTop />);

  // Simulate scroll down
  fireEvent.scroll(window, { target: { pageYOffset: 400 } });

  // Simulate scroll up
  fireEvent.scroll(window, { target: { pageYOffset: 100 } });

  const button = screen.queryByRole("button");
  expect(button).not.toBeInTheDocument();
});

test("scrolls to top when button is clicked", () => {
  const scrollToMock = vi.fn();
  global.scrollTo = scrollToMock;

  render(<BackToTop />);

  // Simulate scroll
  fireEvent.scroll(window, { target: { pageYOffset: 400 } });

  const button = screen.getByRole("button");
  fireEvent.click(button);

  expect(scrollToMock).toHaveBeenCalledWith({
    top: 0,
    behavior: "smooth",
  });
});
