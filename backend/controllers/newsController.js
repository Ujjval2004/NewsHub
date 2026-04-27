import scrapeNews from "../services/scraper.service.js";

export const getNews = async (req, res) => {
  try {
    const data = await scrapeNews();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch news" });
  }
};