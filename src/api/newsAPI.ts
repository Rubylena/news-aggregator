import axios from "axios";

const NEWS_API_KEY = "3bf4251ea80246aba499a89292be3d33";
const GUARDIAN_API_KEY = "fbc9ff53-f281-4780-b6a8-1b75d5a85b47";
const NYT_API_KEY = "DxNCZbXKjz1LGjOfWRGRaQQjPro27igl";
// const NYT_API_SECRET = "rkNKN2f31N2wyHTY";

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
  q = "",
  country = "us",
}: {
  pageParam?: number;
  q?: string;
  country?: string;
}): Promise<NewsAPIResponse> => {
  const response = await axios.get("https://newsapi.org/v2/top-headlines", {
    params: {
      apiKey: NEWS_API_KEY,
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
  q = "debate",
  from = "2025-01-01",
}): Promise<GuardianAPIResponse> => {
  const response = await axios.get("https://content.guardianapis.com/search", {
    params: {
      "api-key": GUARDIAN_API_KEY,
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
}): Promise<NYTAPIResponse | undefined> => {
  const response = await axios.get(
    "https://api.nytimes.com/svc/search/v2/articlesearch.json",
    {
      params: {
        "api-key": NYT_API_KEY,
        page: pageParam,
        q: q,
      },
    }
  );
  return response.data.response;
};
