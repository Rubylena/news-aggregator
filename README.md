# News Aggregator

## Description
A news aggregator website that pulls articles from various sources and displays them in a clean, easy-to-read format.

## Features
- Article search and filtering
- Personalized news feed
- Mobile-responsive design using tailwind css v4
- SEO optimization using react-helmet and dynamic sitemap generation
- Redux for state management
- Vitest for testing
- React query for API integration
- Containerization using docker

## Data Sources
- NewsAPI
- GuardianAPI
- NewYorkTimesAPI

## Getting Started

### Prerequisites
- Docker
- Node

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/Rubylena/news-aggregator.git
   ```

2. Change directory
   ```bash
   cd news-aggregator
   ```

3. Install dependencies
   ```bash
   npm install
   ```

4. Run application
   ```bash
   npm run dev
   ```
You can now use [http://localhost:5173/](http://localhost:5173/) to view the application.

## For Docker
After cloning repository and changing directory

1. Build docker
   ```bash
   npm run docker:build
   ```

2. Run docker
   ```bash
   docker run -dp 3000:5173   -e VITE_APP_NEWS_API_KEY="VITE_APP_NEWS_API_KEY"   -e VITE_APP_GUARDIAN_API_KEY="VITE_APP_GUARDIAN_API_KEY"   -e VITE_APP_NYT_API_KEY="VITE_APP_NYT_API_KEY" news-aggregator-app
   ```

3. Aftwards open in browser through docker

You can now use [http://localhost:3000/](http://localhost:3000/) to view the application.

Note: ensure you have docker running in your local environment and use bash to run the commands. Also the API keys will be sent across.