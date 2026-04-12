import { pipeline } from "@xenova/transformers";

let extractor;

console.log("🔥 Trending function called");

async function getExtractor() {
  if (!extractor) {
    extractor = await pipeline(
      "feature-extraction",
      "Xenova/all-MiniLM-L6-v2"
    );
  }
  return extractor;
}

function cosineSim(a, b) {
  let dot = 0.0;
  let normA = 0.0;
  let normB = 0.0;

  for (let i = 0; i < a.length; i++) {
    dot += a[i] * b[i];
    normA += a[i] * a[i];
    normB += b[i] * b[i];
  }

  return dot / (Math.sqrt(normA) * Math.sqrt(normB));
}

export const detectTrendingNews = async (groupedNews) => {
  const extractor = await getExtractor();

  const allHeadlines = [];
  const meta = [];

  // 🔹 Flatten headlines
  Object.keys(groupedNews).forEach((paper) => {
    groupedNews[paper].forEach((article) => {
      allHeadlines.push(article.title);
      meta.push({ paper, article });
    });
  });

  // 🔹 Generate embeddings
  const embeddings = [];

  for (let h of allHeadlines) {
    const output = await extractor(h, {
      pooling: "mean",
      normalize: true
    });
    embeddings.push(output.data);
  }

  const clusters = [];

  // 🔥 CLUSTER SIMILAR HEADLINES
  for (let i = 0; i < embeddings.length; i++) {
    let added = false;

    for (let cluster of clusters) {
      const sim = cosineSim(embeddings[i], cluster.embedding);

      // 🔥 LOWERED THRESHOLD (IMPORTANT)
      if (sim > 0.5) {
        cluster.items.push(meta[i]);
        added = true;
        break;
      }
    }

    if (!added) {
      clusters.push({
        embedding: embeddings[i],
        items: [meta[i]]
      });
    }
  }

  // 🔥 FILTER TRENDING
  const trending = clusters
    .filter((c) => {
      const sources = new Set(c.items.map((i) => i.paper));

      // ✅ RELAXED CONDITION
      return c.items.length >= 2 ;
    })
    .map((c) => ({
      title: c.items[0].article.title,
      count: c.items.length,
      sources: [...new Set(c.items.map((i) => i.paper))]
    }))
    // 🔥 SORT BY MOST TRENDING
    .sort((a, b) => b.count - a.count)
    // 🔥 LIMIT RESULTS
    .slice(0, 5);

  // 🔍 DEBUG (optional)
  console.log("TRENDING RESULT:", trending);

  return trending;
};