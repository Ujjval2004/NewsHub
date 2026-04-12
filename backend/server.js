import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import connectDB from "./config/db.js";
import newsRoutes from "./routes/newsRoutes.js";
import notesRoutes from "./routes/notesRoutes.js";
import startCron from "./config/cron.js";
import { getSummary } from "./services/summary.service.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// ✅ Routes
app.use("/api/news", newsRoutes);
app.use("/api/notes", notesRoutes);

// ✅ SUMMARY ROUTE
app.post("/api/summary", async (req, res) => {
  try {
    const { text } = req.body;

    console.log("📩 Received text:", text); // 🔥 ADD THIS

    if (!text) {
      return res.status(400).json({ error: "No text provided" });
    }

    const summary = await getSummary(text);

    console.log("✅ Summary:", summary); // 🔥 ADD THIS

    res.json({ summary });

  } catch (error) {
    console.error("❌ Summary route error:", error);
    res.status(500).json({ error: "Summary failed" });
  }
});