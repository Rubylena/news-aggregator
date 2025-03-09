import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { vi } from "vitest";
import ErrorPage from "../components/ErrorPage";
import Home from "../app/Home";
import App from "../App";
import store from "../store/store";

vi.mock("../components/ErrorPage", () => ({
  __esModule: true,
  default: () => <div data-testid="error-page" />,
}));

vi.mock("../app/Home", () => ({
  __esModule: true,
  default: () => <div data-testid="home" />,
}));

vi.mock("react-toastify", () => ({
  ToastContainer: () => <div data-testid="toast-container" />,
}));

const queryClient = new QueryClient();

test("renders App component with Provider, QueryClientProvider, RouterProvider, and ToastContainer", () => {
  render(<App />);

  expect(screen.getByTestId("toast-container")).toBeInTheDocument();
});

test("renders Home component when path is '/'", () => {
  const router = createBrowserRouter([
    {
      errorElement: <ErrorPage />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
      ],
    },
  ]);

  render(
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </Provider>
  );

  expect(screen.getByTestId("home")).toBeInTheDocument();
});

test("renders ErrorPage component on error", () => {
  const router = createBrowserRouter([
    {
      errorElement: <ErrorPage />,
      children: [
        {
          path: "/error",
          element: <div />,
        },
      ],
    },
  ]);

  render(
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </Provider>
  );

  expect(screen.getByTestId("error-page")).toBeInTheDocument();
});