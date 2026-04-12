import cron from "node-cron";
import scrapeNews from "../services/scraper.service.js";

const startCron = () => {
  cron.schedule("0 6 * * *", () => {
    console.log("Running 6AM scraper...");
    scrapeNews();
  });
};

export default startCron;
