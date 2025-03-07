import { render, screen } from "@testing-library/react";
import { expect, it, describe } from "vitest";
import App from "../App";

describe("app component", () => {
  it("should render text", () => {
    render(<App />);

    expect(
      screen.getByText(/Click on the Vite and React logos to learn more/i)
    ).toBeInTheDocument();
  });
});
