import axios from "axios";
import * as cheerio from "cheerio";
import newspapers from "../services/newspapers.js";
import { filterAndLimitNews } from "./aiFilter.service.js";
import { detectTrendingNews } from "./trending.service.js";

export const scrapeNews = async () => {
  const articles = [];

  for (const paper of newspapers) {
    try {
      const response = await axios.get(paper.address, {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120 Safari/537.36",
          "Accept-Language": "en-US,en;q=0.9"
        }
      });

      const html = response.data;
      const $ = cheerio.load(html);

      let count = 0;

      const selector =
        paper.name === "Hindustan Times"
          ? "h3 a, h2 a"
          : paper.selector;

      $(selector).each((_, el) => {
        if (count >= 10) return false;

        const title = $(el).text().trim();
        let url = $(el).attr("href");

        if (!title || title.length < 25) return;

        if (url && url.startsWith("/")) {
          url = paper.base + url;
        }

        if (!url || !url.startsWith("http")) return;

        articles.push({
          source: paper.name,
          title,
          url
        });

        count++;
      });

      if (count === 0) {
        console.log(`⚠ No headlines scraped for ${paper.name}`);
      }

    } catch (error) {
      console.log(`❌ Error scraping ${paper.name}: ${error.message}`);
    }
  }

  // 🧠 STEP 1: GROUP BY NEWSPAPER
  const groupedNews = {};

  articles.forEach((article) => {
    if (!groupedNews[article.source]) {
      groupedNews[article.source] = [];
    }
    groupedNews[article.source].push(article.title);
  });

  // 🧠 STEP 2: AI FILTER
  const filteredNews = await filterAndLimitNews(groupedNews);

  // 🧠 STEP 3: MAP BACK TO FULL ARTICLE OBJECT
  const finalResult = {};

  Object.keys(filteredNews).forEach((paper) => {
    finalResult[paper] = filteredNews[paper]
      .map((title) => {
        return articles.find(
          (a) =>
            a.source === paper &&
            a.title.trim() === title.trim()
        );
      })
      .filter(Boolean);
  });

  // 🧠 STEP 4: TRENDING DETECTION
  const trending = await detectTrendingNews(finalResult);

  // ✅ FINAL RETURN (IMPORTANT)
  return {
    news: finalResult,
    trending
  };
};

export default scrapeNews;