import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import connectDB from "./config/db.js";
import newsRoutes from "./routes/newsRoutes.js";
import notesRoutes from "./routes/notesRoutes.js";
import startCron from "./config/cron.js";
// ✅ FIXED IMPORT

dotenv.config();

const app = express();

// ✅ Middleware
app.use(cors());
app.use(express.json());

// ✅ Routes
app.use("/api/news", newsRoutes);
app.use("/api/notes", notesRoutes);

// ✅ SUMMARY ROUTE (FIXED)
app.post("/api/summary", async (req, res) => {
  try {
    const { text } = req.body;

    console.log("📩 Received text:", text);

    if (!text) {
      return res.status(400).json({ error: "No text provided" });
    }

    const summary = await getSummary(text);

    console.log("✅ Summary:", summary);

    res.json({ summary });

  } catch (error) {
    console.error("❌ Summary route error:", error);
    res.status(500).json({ error: "Summary failed" });
  }
});

// ✅ Connect DB
connectDB();

// ✅ START CRON (if you added auto update feature)
startCron();

// ✅ START SERVER (MOST IMPORTANT FIX)
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});