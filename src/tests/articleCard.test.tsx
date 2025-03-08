// // src/tests/ArticleCard.test.tsx
// import { render, screen } from "@testing-library/react";
// import ArticleCard from "../components/ArticleCard";

// test("renders ArticleCard with correct title, description, and link", () => {
//   render(
//     <ArticleCard
//       title="Test Article"
//       description="This is a description."
//       url="https://example.com"
//     />
//   );

//   expect(screen.getByText(/Test Article/i)).toBeInTheDocument();
//   expect(screen.getByText(/This is a description./i)).toBeInTheDocument();
//   const link = screen.getByText(/Read more/i);
//   expect(link).toBeInTheDocument();
//   expect(link).toHaveAttribute("href", "https://example.com");
// });

import { render, screen } from "@testing-library/react";
import ArticleCard from "../components/ArticleCard";

const mockArticle = {
  title: "Sample Article",
  description: "This is a sample description for the article.",
  url: "http://example.com",
  imageUrl: "http://example.com/image.jpg",
};

test("renders article title", () => {
  render(<ArticleCard {...mockArticle} />);

  const titleElement = screen.getByText(/sample article/i);
  expect(titleElement).toBeInTheDocument();
});

test("renders article description", () => {
  render(<ArticleCard {...mockArticle} />);

  const descriptionElement = screen.getByText(
    /this is a sample description for the article/i
  );
  expect(descriptionElement).toBeInTheDocument();
});

test("renders article link with correct href", () => {
  render(<ArticleCard {...mockArticle} />);

  const linkElement = screen.getByText(/read more/i);
  expect(linkElement).toBeInTheDocument();
  expect(linkElement.closest("a")).toHaveAttribute(
    "href",
    "http://example.com"
  );
});

test("renders article image with correct src and alt attributes", () => {
  render(<ArticleCard {...mockArticle} />);

  const imageElement = screen.getByAltText(/sample article/i);
  expect(imageElement).toBeInTheDocument();
  expect(imageElement).toHaveAttribute("src", "http://example.com/image.jpg");
});

test("renders placeholder image when imageUrl is not provided", () => {
  const articleWithoutImage = { ...mockArticle, imageUrl: undefined };
  render(<ArticleCard {...articleWithoutImage} />);

  const imageElement = screen.getByAltText(/sample article/i);
  expect(imageElement).toBeInTheDocument();
  expect(imageElement).toHaveAttribute("src", "/assets/img/placeholder.png");
});
