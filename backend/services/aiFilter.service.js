import { pipeline } from "@xenova/transformers";

// Load embedding model once
let extractor;

async function getExtractor() {
  if (!extractor) {
    extractor = await pipeline("feature-extraction", "Xenova/all-MiniLM-L6-v2");
  }
  return extractor;
}

// Cosine similarity
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

export const filterAndLimitNews = async (newsData) => {
  const extractor = await getExtractor();

  let allHeadlines = [];
  let meta = [];

  // Flatten data
  Object.keys(newsData).forEach((paper) => {
    newsData[paper].forEach((headline) => {
      allHeadlines.push(headline);
      meta.push(paper);
    });
  });

  // Get embeddings
  const embeddings = [];
  for (let h of allHeadlines) {
    const output = await extractor(h, { pooling: "mean", normalize: true });
    embeddings.push(output.data);
  }

  const toRemove = new Set();

  // Compare headlines
  for (let i = 0; i < embeddings.length; i++) {
    for (let j = i + 1; j < embeddings.length; j++) {

      if (meta[i] !== meta[j]) {
        const sim = cosineSim(embeddings[i], embeddings[j]);

        if (sim > 0.8) {
          toRemove.add(j);
        }
      }
    }
  }

  // Build filtered result
  let result = {};
  Object.keys(newsData).forEach((p) => (result[p] = []));

  for (let i = 0; i < allHeadlines.length; i++) {
    if (!toRemove.has(i)) {
      result[meta[i]].push(allHeadlines[i]);
    }
  }

  // Limit to 5 + replacement
  Object.keys(result).forEach((paper) => {
    const original = newsData[paper];
    let current = result[paper];

    const remaining = original.filter((h) => !current.includes(h));

    while (current.length < 5 && remaining.length > 0) {
      current.push(remaining.shift());
    }

    result[paper] = current.slice(0, 5);
  });

  return result;
};