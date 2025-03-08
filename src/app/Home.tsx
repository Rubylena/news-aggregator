import Navbar from "../components/Navbar";
import ArticleCard from "../components/ArticleCard";
import Footer from "../components/Footer";
import { setQuery } from "../store/reducers/articleSlice";
import { Helmet } from "react-helmet";
import { useAppDispatch, useAppSelector } from "../store/hooks/hooks";
import { useInfiniteQuery } from "@tanstack/react-query";
import {
  fetchNewsFromGuardianAPI,
  fetchNewsFromNewsAPI,
  fetchNewsFromNYTAPI,
} from "../api/newsAPI";

interface Article {
  title?: string;
  description?: string;
  url?: string;
  webTitle?: string;
  webUrl?: string;
  id?: string;
  headline?: {
    main: string;
  };
  abstract?: string;
  web_url: string;
}

const Home = () => {
  const dispatch = useAppDispatch();
  const filters = useAppSelector((state) => state.articles.filters);
  const query = useAppSelector((state) => state.articles.query);

  const handleSearch = (searchQuery: string) => {
    dispatch(setQuery(searchQuery));
  };

  // const handleFilterChange = (newFilters: {
  //   category: string;
  //   date: string;
  //   source: string;
  // }) => {
  //   dispatch(setFilters(newFilters));
  // };
  console.log(filters.category);
  const fetchArticles = async ({ pageParam = 1 }) => {
    const [newsAPI, guardianAPI, nytAPI] = await Promise.all([
      fetchNewsFromNewsAPI({
        pageParam,
        q: query,
        country: filters.category || "us",
      }),
      fetchNewsFromGuardianAPI({
        pageParam,
        q: query,
        from: filters.date || "2025-01-01",
      }),
      fetchNewsFromNYTAPI({ pageParam, q: query }),
    ]);

    return {
      newsAPI,
      guardianAPI,
      nytAPI,
    };
  };

  const { data, isLoading, isError, fetchNextPage, hasNextPage } =
    useInfiniteQuery({
      queryKey: ["articles", query, filters],
      initialPageParam: 1,
      queryFn: fetchArticles,
      getNextPageParam: (lastPage) => lastPage.guardianAPI.currentPage + 1,
      // getNextPageParam: (lastPage) => lastPage.newsAPI.page + 1,
    });

  const mergedData: Article[] = [
    ...(data?.pages.flatMap((page) => page.newsAPI.articles) || []),
    ...(data?.pages.flatMap((page) => page.guardianAPI.results) || []),
    ...(data?.pages.flatMap((page) => page.nytAPI?.docs) || []),
  ] as Article[];

  const loaderArray = Array.from({ length: 10 }, () => ({}));

  return (
    <>
      <Helmet>
        <title>News Aggregator - Latest Articles</title>
        <meta
          name="description"
          content="Stay updated with the latest articles from top sources. Customize your news feed based on your preferences."
        />
        <meta property="og:title" content="News Aggregator" />
        <meta
          property="og:description"
          content="Get the latest news from your preferred sources and categories in one place."
        />
        <meta property="og:url" content="https://yourwebsite.com" />
      </Helmet>
      <div
        className={`${
          isError ? "h-screen" : "lg:h-screen"
        } flex flex-col justify-between`}
      >
        <Navbar onSearch={handleSearch} />
        <div className="p-4 overflow-y-auto mt-24">
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-4">
              {loaderArray.map((_, index) => (
                <div
                  key={index}
                  className="bg-white shadow-md drop-shadow-md border-t border-gray-200 rounded-lg p-4 mb-4 hover:shadow-lg hover:scale-105 transition-all duration-200"
                >
                  <div className="flex animate-pulse space-x-4">
                    <div className="size-10 rounded-full bg-gray-200"></div>
                    <div className="flex-1 space-y-6 py-1">
                      <div className="h-2 rounded bg-gray-200"></div>
                      <div className="space-y-3">
                        <div className="grid grid-cols-3 gap-4">
                          <div className="col-span-2 h-2 rounded bg-gray-200"></div>
                          <div className="col-span-1 h-2 rounded bg-gray-200"></div>
                        </div>
                        <div className="h-2 rounded bg-gray-200"></div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : isError ? (
            <div className="text-center h-96 flex justify-center items-center">
              Error fetching data
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-4">
                {mergedData?.map((article, index) => (
                  <ArticleCard
                    key={index}
                    title={
                      article.title ||
                      article.webTitle ||
                      article.headline?.main
                    }
                    description={article.description || article.abstract}
                    url={article.url || article.webUrl || article.web_url}
                  />
                ))}
              </div>

              <div className="text-center">
                {hasNextPage && (
                  <button onClick={() => fetchNextPage()}>Load More</button>
                )}
              </div>
            </>
          )}
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Home;
