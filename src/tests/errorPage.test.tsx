import { render, screen, fireEvent } from "@testing-library/react";
import { vi } from "vitest";
import ErrorPage from "../components/ErrorPage";

test("renders error page with correct text", () => {
  render(<ErrorPage />);

  const errorCode = screen.getByText(/404/i);
  const errorMessage = screen.getByText(/page not found/i);
  const errorDescription = screen.getByText(
    /sorry, we couldn't find the page you're looking for/i
  );
  const goBackButton = screen.getByText(/go back/i);

  expect(errorCode).toBeInTheDocument();
  expect(errorMessage).toBeInTheDocument();
  expect(errorDescription).toBeInTheDocument();
  expect(goBackButton).toBeInTheDocument();
});


test("calls history.back() when the button is clicked", () => {
  const historyBackMock = vi.fn();
  global.history.back = historyBackMock;

  render(<ErrorPage />);

  const goBackButton = screen.getByText(/go back/i);
  fireEvent.click(goBackButton);

  expect(historyBackMock).toHaveBeenCalled();
});
