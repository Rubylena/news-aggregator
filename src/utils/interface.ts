// API
export interface NewsAPIResponse {
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
  pages: number;
  totalResults: number;
}

export interface GuardianAPIResponse {
  results: {
    webTitle: string;
    webUrl: string;
    id: string;
    webPublicationDate: string;
    pillarName?: string;
  }[];
  currentPage: number;
  pages: number;
}

export interface NYTAPIResponse {
  docs: {
    headline: {
      main: string;
    };
    abstract: string;
    news_desk: string;
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
  meta: {
    hits: number;
  };
}

export interface NewsAPIResourceResponse {
  id: string;
  name: string;
}

// home
export interface Article {
  title?: string;
  description?: string;
  url?: string;
  webTitle?: string;
  webUrl?: string;
  id?: string;
  publishedAt?: string;
  webPublicationDate?: string;
  pub_date?: string;
  news_desk?: string;
  pillarName?: string;
  sectionName?: string;
  source?:
    | ({
        id: string;
        name: string;
      })
    | string;
  headline?: {
    main: string;
  };
  abstract?: string;
  web_url: string;
  multimedia?: {
    url?: string;
    subtype?: "master180";
  };
  urlToImage?: string;
}

// redux
export interface ArticleState {
  query: string;
  filters: { category: string; source: string; person: string };
  resultFilters: { date: string; category: string; source: string };
}

// filters
export interface FiltersProps {
  onFilterChange: (filters: {
    category: string;
    date: string;
    source: string;
    person: string;
  }) => void;
  type: "search" | "result";
}

// articles
export interface ArticlesProps {
  articles: Article[];
  fetchNextPage: () => void;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  resultFilters?: Partial<ArticleState["resultFilters"]>;
}