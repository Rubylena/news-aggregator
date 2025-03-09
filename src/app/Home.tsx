import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { setQuery, setResultFilters } from "../store/reducers/articleSlice";
import { Helmet } from "react-helmet";
import { useAppDispatch, useAppSelector } from "../store/hooks/hooks";
import { useInfiniteQuery } from "@tanstack/react-query";
import {
  fetchNewsFromGuardianAPI,
  fetchNewsFromNewsAPI,
  fetchNewsFromNYTAPI,
} from "../api/newsAPI";
import { Article } from "../utils/interface";
import Filters from "../components/Filters";
import { useCallback, useMemo, useState } from "react";
import Loader from "../components/Loader";
import Articles from "../components/Articles";
import BackToTop from "../components/BackToTop";

const Home = () => {
  const dispatch = useAppDispatch();
  const filters = useAppSelector((state) => state.articles.filters);
  const query = useAppSelector((state) => state.articles.query);
  const resultFilters = useAppSelector((state) => state.articles.resultFilters);
  const [isFiltering, setIsFiltering] = useState(false);

  const handleSearch = (searchQuery: string) => {
    dispatch(setQuery(searchQuery));
  };

  const fetchArticles = async ({ pageParam = 1 }) => {
    const [newsAPI, guardianAPI, nytAPI] = await Promise.all([
      fetchNewsFromNewsAPI({
        pageParam,
        q: query,
        category: filters.category,
        sources: filters.source,
      }),
      fetchNewsFromGuardianAPI({
        pageParam,
        q: query,
        author: filters.person,
      }),
      fetchNewsFromNYTAPI({
        pageParam,
        q: query,
        news_desk: filters.category,
        source: filters.source,
        persons: filters.person,
      }),
    ]);

    return {
      newsAPI,
      guardianAPI,
      nytAPI,
    };
  };

  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ["articles", query, filters],
    initialPageParam: 1,
    queryFn: fetchArticles,
    retry: 0,
    retryDelay: 4000,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    //   console.log(lastPage);
    //   lastPage;
    // },
    getNextPageParam: (lastPage, allPages) => {
      const calculatePages = (totalResults: number, pageSize: number) =>
        Math.ceil(totalResults / pageSize);

      const currentPage = allPages.length;
      const newsAPIPages = calculatePages(lastPage.newsAPI.totalResults, 10);
      const guardianAPIPages = lastPage.guardianAPI.pages;
      const nytAPIPages = calculatePages(lastPage.nytAPI.meta.hits, 10);

      const minPages = Math.min(newsAPIPages, guardianAPIPages, nytAPIPages);

      if (currentPage >= minPages) {
        return 1;
      }

      return currentPage + 1;
    },
  });

  const mergedData: Article[] = useMemo(
    () =>
      (data?.pages.flatMap((page) => [
        ...page.newsAPI.articles,
        ...page.guardianAPI.results,
        ...page.nytAPI.docs,
      ]) || []) as Article[],
    [data?.pages.length]
  );

  const filteredData = useMemo(() => {
    setIsFiltering(true);
    const result = mergedData.filter((article) => {
      const matchesDate = resultFilters.date
        ? article?.publishedAt?.includes(resultFilters.date) ||
          article?.webPublicationDate?.includes(resultFilters.date) ||
          article?.pub_date?.includes(resultFilters.date)
        : true;
      const matchesCategory = resultFilters.category
        ? article?.news_desk?.includes(resultFilters.category) ||
          article?.pillarName?.includes(resultFilters.category)
        : true;
      const matchesSource = resultFilters.source
        ? typeof article.source === "string"
          ? article.source.includes(resultFilters.source)
          : article.source?.name?.includes(resultFilters.source)
        : true;
      return matchesDate && matchesCategory && matchesSource;
    });
    setIsFiltering(false);
    return result;
  }, [mergedData, resultFilters]);

  const handleFilterChange = useCallback(
    (newFilters: {
      category: string;
      date: string;
      source: string;
      person: string;
    }) => {
      dispatch(setResultFilters(newFilters));
    },
    [dispatch]
  );

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
        <meta
          property="og:url"
          content="https://news-aggregator-grace.netlify.app"
        />
      </Helmet>
      <div
        className={`${
          isError || (filteredData?.length === 0 && !isLoading)
            ? "h-screen"
            : ""
        } flex flex-col justify-between bg-gray-200`}
      >
        <Navbar onSearch={handleSearch} />
        <div className="p-4 sm:mt-32 lg:mt-28 lg:mx-20">
          {isLoading || isFiltering ? (
            <Loader />
          ) : isError ? (
            <div className="text-center lg:h-88 w-full flex justify-center items-center">
              <img
                src="/assets/img/error.webp"
                alt="Error fetching data"
                className="object-cover h-full"
              />
            </div>
          ) : (
            <>
              <Filters type="result" onFilterChange={handleFilterChange} />

              {filteredData?.length === 0 ? (
                <div className="text-center lg:h-88 flex justify-center items-center font-medium">
                  No data found based on filters selected
                </div>
              ) : (
                <Articles
                  articles={filteredData}
                  fetchNextPage={fetchNextPage}
                  hasNextPage={hasNextPage}
                  isFetchingNextPage={isFetchingNextPage}
                  resultFilters={resultFilters}
                />
              )}
            </>
          )}
        </div>
        <Footer />
        <BackToTop />
      </div>
    </>
  );
};

export default Home;
