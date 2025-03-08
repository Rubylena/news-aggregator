# News Aggregator

## Description
A news aggregator website that pulls articles from various sources and displays them in a clean, easy-to-read format.

## Features
- Article search and filtering
- Personalized news feed
- Mobile-responsive design

## Data Sources
- NewsAPI
- GuardianAPI
- NewYorkTimesAPI

## Getting Started

### Prerequisites
- Docker
- Docker Compose

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/news-aggregator.git
   cd news-aggregator

   npm run dev

For Docker
docker build -t news-aggregator .
docker run -p 3000:3000 news-aggregator

added docker, seo (react-helmet, sitemap dynamic generation), redux, vitest testing, api integration, react-query.