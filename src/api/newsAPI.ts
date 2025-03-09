import axios from "axios";
import {
  GuardianAPIResponse,
  NewsAPIResourceResponse,
  NewsAPIResponse,
  NYTAPIResponse,
} from "../utils/interface";

export const fetchNewsFromNewsAPI = async ({
  pageParam = 1,
  q,
  category,
  sources,
}: {
  pageParam?: number;
  q?: string;
  category?: string;
  sources: string;
}): Promise<NewsAPIResponse> => {
  const response = await axios.get("https://newsapi.org/v2/everything", {
    params: {
      apiKey: import.meta.env.VITE_APP_NEWS_API_KEY,
      page: pageParam,
      pageSize: 10,
      q: q,
      category: category,
      sources: sources,
    },
  });
  return response.data;
};

export const fetchNewsFromGuardianAPI = async ({
  pageParam = 1,
  q,
  author
}: {
  pageParam?: number;
  q?: string;
  from?: string;
  author?: string;
}): Promise<GuardianAPIResponse> => {
    const params: any = {
      "api-key": import.meta.env.VITE_APP_GUARDIAN_API_KEY,
      page: pageParam,
      pageSize: 10,
    };

    if (q) params.q = q;
    if (author) params.author = author;

    const response = await axios.get(
      "https://content.guardianapis.com/search",
      { params }
    );
    return response.data.response;
};

export const fetchNewsFromNYTAPI = async ({
  pageParam = 1,
  q,
  news_desk,
  source,
  persons,
}: {
  pageParam?: number;
  q?: string;
  news_desk?: string;
  source: string;
  persons: string;
}): Promise<NYTAPIResponse> => {
  const response = await axios.get(
    "https://api.nytimes.com/svc/search/v2/articlesearch.json",
    {
      params: {
        "api-key": import.meta.env.VITE_APP_NYT_API_KEY,
        page: pageParam,
        q: q,
        pageSize: 10,
        news_desk: news_desk,
        source: source,
        persons: persons,
      },
    }
  );
  return response.data.response;
};

export const fetchResourcesFromNewsAPI = async (): Promise<NewsAPIResourceResponse[]> => {
  const response = await axios.get(
    "https://newsapi.org/v2/top-headlines/sources",
    {
      params: {
        apiKey: import.meta.env.VITE_APP_NEWS_API_KEY,
      },
    }
  );
  return response.data.sources;
};
