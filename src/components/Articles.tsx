import React, { useEffect, useRef } from "react";
import ArticleCard from "./ArticleCard";
import { ArticlesProps } from "../utils/interface";

const Articles: React.FC<ArticlesProps> = ({
  articles,
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
  resultFilters,
}) => {
  const hasResultFilters =
    resultFilters && Object.values(resultFilters).some((value) => value);

  const loadMoreRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (!hasNextPage || isFetchingNextPage) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          fetchNextPage();
        }
      },
      { threshold: 1.0 }
    );

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }

    return () => {
      if (loadMoreRef.current) {
        observer.unobserve(loadMoreRef.current);
      }
    };
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 mt-4">
        {articles?.map((article, index) => (
          <ArticleCard
            key={index}
            title={article.title || article.webTitle || article.headline?.main}
            description={article.description || article.abstract}
            url={article.url || article.webUrl || article.web_url}
            imageUrl={article.urlToImage || article?.multimedia?.url}
          />
        ))}
      </div>

      <div className="text-center mt-4">
        {hasNextPage && !isFetchingNextPage && !hasResultFilters && (
          <button
            ref={loadMoreRef}
            className="font-medium cursor-pointer text-blue-600 hover:underline"
          >
            Load More...
          </button>
        )}
        {isFetchingNextPage && (
          <div className="mt-4 flex justify-center items-center">
            <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-gray-900 mr-2"></div>
          </div>
        )}
      </div>
    </>
  );
};

export default Articles;
