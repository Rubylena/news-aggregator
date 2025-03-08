import axios from "axios";

interface NewsAPIResponse {
  articles: {
    title: string;
    description: string;
    url: string;
    author: string;
    urlToImage: string;
    publishedAt: string;
    source: {
      id: string;
      name: string;
    };
  }[];
  page: number;
  totalResults: number;
}

interface GuardianAPIResponse {
  results: {
    webTitle: string;
    webUrl: string;
    id: string;
    webPublicationDate: string;
  }[];
  currentPage: number;
  pages: number;
}

interface NYTAPIResponse {
  docs: {
    headline: {
      main: string;
    };
    abstract: string;
    web_url: string;
    source: string;
    multimedia: {
      url: string;
      subtype: "master180";
    };
    byline: {
      original: string;
    };
    pub_date: string;
  }[];
  page: number;
}

export const fetchNewsFromNewsAPI = async ({
  pageParam = 1,
  q,
  country,
}: {
  pageParam?: number;
  q?: string;
  country?: string;
}): Promise<NewsAPIResponse> => {
  const response = await axios.get("https://newsapi.org/v2/top-headlines", {
    params: {
      apiKey: import.meta.env.VITE_APP_NEWS_API_KEY,
      page: pageParam,
      pageSize: 10,
      q: q,
      country: country,
    },
  });
  return response.data;
};

export const fetchNewsFromGuardianAPI = async ({
  pageParam = 1,
  q,
  from,
}: {
  pageParam?: number;
  q?: string;
  from?: string;
}): Promise<GuardianAPIResponse> => {
  const response = await axios.get("https://content.guardianapis.com/search", {
    params: {
      "api-key": import.meta.env.VITE_APP_GUARDIAN_API_KEY,
      page: pageParam,
      pageSize: 10,
      q: q,
      "from-date": from,
    },
  });
  return response.data.response;
};

export const fetchNewsFromNYTAPI = async ({
  pageParam = 1,
  q = "election",
}: {
  pageParam?: number;
  q?: string;
}): Promise<NYTAPIResponse | undefined> => {
  const response = await axios.get(
    "https://api.nytimes.com/svc/search/v2/articlesearch.json",
    {
      params: {
        "api-key": import.meta.env.VITE_APP_NYT_API_KEY,
        page: pageParam,
        q: q,
      },
    }
  );
  return response.data.response;
};
