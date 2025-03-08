import { render, screen } from "@testing-library/react";
import Loader from "../components/Loader";

test("renders the correct number of loading items", () => {
  render(<Loader />);

  const loadingItems = screen.getAllByRole("article");
  expect(loadingItems).toHaveLength(10);
});

test("each loading item has the correct structure and classes", () => {
  render(<Loader />);

  const loadingItems = screen.getAllByRole("article");
  loadingItems.forEach((item) => {
    expect(item).toHaveClass(
      "bg-white shadow-md drop-shadow-md border-t border-gray-200 rounded-lg p-4 mb-4 hover:shadow-lg hover:scale-105 transition-all duration-200"
    );

    const pulseDiv = item.querySelector(".animate-pulse");
    expect(pulseDiv).toBeInTheDocument();
    expect(pulseDiv).toHaveClass("flex animate-pulse space-x-4");

    const roundedFullDiv = pulseDiv?.querySelector(
      ".size-10.rounded-full.bg-gray-200"
    );
    expect(roundedFullDiv).toBeInTheDocument();

    const flex1Div = pulseDiv?.querySelector(".flex-1.space-y-6.py-1");
    expect(flex1Div).toBeInTheDocument();

    const h2Divs = flex1Div?.querySelectorAll(".h-2.rounded.bg-gray-200");
    expect(h2Divs).toHaveLength(4);

    const gridDiv = flex1Div?.querySelector(".grid.grid-cols-3.gap-4");
    expect(gridDiv).toBeInTheDocument();

    const colSpan2Div = gridDiv?.querySelector(
      ".col-span-2.h-2.rounded.bg-gray-200"
    );
    expect(colSpan2Div).toBeInTheDocument();

    const colSpan1Div = gridDiv?.querySelector(
      ".col-span-1.h-2.rounded.bg-gray-200"
    );
    expect(colSpan1Div).toBeInTheDocument();
  });
});
