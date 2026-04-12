import { pipeline } from "@xenova/transformers";

let summarizer;
const cache = new Map(); // 🔥 cache for speed

// 🔥 Load model once at server start (optional improvement)
const loadModel = async () => {
  if (!summarizer) {
    console.log("⏳ Loading summarizer model...");
    summarizer = await pipeline(
      "summarization",
      "Xenova/distilbart-cnn-12-6"
    );
    console.log("✅ Summarizer ready");
  }
};

// 🔥 MAIN FUNCTION
export const getSummary = async (text) => {
  try {
    // ✅ 1. HANDLE SHORT TEXT
    if (!text || text.length < 20) {
      return text; // no need to summarize
    }

    // ✅ 2. CACHE (VERY IMPORTANT)
    if (cache.has(text)) {
      return cache.get(text);
    }

    // ✅ 3. LOAD MODEL
    await loadModel();

    // ✅ 4. GENERATE SUMMARY
    const result = await summarizer(text, {
      max_length: 60,
      min_length: 20
    });

    const summary = result?.[0]?.summary_text || "No summary available";

    // ✅ 5. SAVE IN CACHE
    cache.set(text, summary);

    return summary;

  } catch (error) {
    console.error("❌ Summary error:", error);
    return "Summary generation failed";
  }
};