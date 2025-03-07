import fs from "fs";
import { SitemapStream, streamToPromise } from "sitemap";
import * as path from "path"; // Use named import for path module
import { fileURLToPath } from "url"; // Import for fileURLToPath

interface Article {
  title: string;
  url: string;
  updated_at: string;
}

// Function to get the directory path of the current file
const getDirname = (importMetaUrl: string) => {
  return path.dirname(fileURLToPath(importMetaUrl));
};

const generateSitemap = async () => {
  // Sample articles data (replace with actual data or fetch dynamically)
  const articles: Article[] = [
    {
      title: "React 18 Released!",
      url: "/article/react-18-released",
      updated_at: "2025-03-07",
    },
    {
      title: "TailwindCSS v3 Update",
      url: "/article/tailwindcss-v3-update",
      updated_at: "2025-03-07",
    },
    // Add more dynamic or static article data as needed
  ];

  // Add other pages you want in the sitemap (e.g., homepage, category pages)
  const urls = [
    {
      url: "/",
      changefreq: "daily",
      priority: 1.0,
      lastmod: new Date().toDateString(),
    },
    {
      url: "/category/technology",
      changefreq: "weekly",
      priority: 0.8,
      lastmod: new Date().toDateString(),
    },
    {
      url: "/category/business",
      changefreq: "weekly",
      priority: 0.8,
      lastmod: new Date().toDateString(),
    },
    {
      url: "/category/sports",
      changefreq: "weekly",
      priority: 0.8,
      lastmod: new Date().toDateString(),
    },
    ...articles.map((article) => ({
      url: article.url,
      lastmod: article.updated_at || new Date().toDateString(),
      changefreq: "monthly",
      priority: 0.7,
    })),
  ];

  // Get the current directory path using import.meta.url
  const currentDir = getDirname(import.meta.url);

  // Create the SitemapStream instance
  const sitemapStream = new SitemapStream({
    hostname: "https://yourwebsite.com",
  });
  const writeStream = fs.createWriteStream(
    path.join(currentDir, "../public", "sitemap.xml")
  );

  sitemapStream.pipe(writeStream);
  urls.forEach((url) => sitemapStream.write(url));

  sitemapStream.end();

  await streamToPromise(sitemapStream);
  console.log("Sitemap generated successfully!");
};

// Run the sitemap generation
generateSitemap();
