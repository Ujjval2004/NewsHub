import { useEffect, useState } from "react";
import "./App.css";
import NewsCard from "./components/NewsCard";

const SOURCE_WEBSITES = {
  "Economic Times": "https://economictimes.indiatimes.com",
  "Hindustan Times": "https://www.hindustantimes.com",
  "Times of India": "https://timesofindia.indiatimes.com",
  "The Hindu": "https://www.thehindu.com",
  "Indian Express": "https://indianexpress.com"
};

function App() {
  const [news, setNews] = useState({});
  const [notes, setNotes] = useState("");
  const [trending, setTrending] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const [selectedPaper, setSelectedPaper] = useState(null);
  const [showCategoryModal, setShowCategoryModal] = useState(false);

  // 🔥 FETCH FUNCTION (REUSABLE)
  const fetchNews = () => {
    fetch("http://localhost:5000/api/news")
      .then((res) => res.json())
      .then((data) => {
        if (data.news) {
          setNews(data.news);
          setTrending(data.trending || []);
        } else {
          setNews(data);
          setTrending([]);
        }
      })
      .catch((err) => console.error("News fetch error:", err));
  };

  useEffect(() => {
    fetchNews();
  }, []);

  // 🔥 GROUP BY CATEGORY
  const groupByCategory = (articles) => {
    const grouped = {};
    articles.forEach((a) => {
      const cat = a.category || "General";
      if (!grouped[cat]) grouped[cat] = [];
      grouped[cat].push(a);
    });
    return grouped;
  };

  // 🔍 FILTER NEWS
  const getFilteredNews = () => {
    if (!searchQuery) return news;

    const filtered = {};

    Object.keys(news).forEach((source) => {
      const filteredArticles = news[source].filter((article) =>
        article.title.toLowerCase().includes(searchQuery.toLowerCase())
      );

      if (filteredArticles.length > 0) {
        filtered[source] = filteredArticles;
      }
    });

    return filtered;
  };

  const filteredNews = getFilteredNews();

  return (
    <div className="app">
      <h1 className="title">NewsHub</h1>

      {/* 🔍 SEARCH + REFRESH */}
      <div className="top-bar">
        <input
          type="text"
          placeholder="Search headlines..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        <button onClick={fetchNews}>🔄 Refresh</button>
      </div>

      {/* 📰 NEWS CARDS */}
      <div className="news-grid">
        {Object.keys(filteredNews).length === 0 ? (
          <p>No matching news found...</p>
        ) : (
          Object.keys(filteredNews).map((source, index) => (
            <NewsCard
              key={source}
              name={source}
              articles={filteredNews[source]}
              url={SOURCE_WEBSITES[source]}
              colorIndex={index}
              onClick={() => {
                setSelectedPaper(source);
                setShowCategoryModal(true);
              }}
            />
          ))
        )}
      </div>

      {/* 📂 CATEGORY MODAL */}
      {showCategoryModal && selectedPaper && (
        <div className="modal-overlay">
          <div className="modal">
            <button
              className="close-btn"
              onClick={() => setShowCategoryModal(false)}
            >
              ✖
            </button>

            <h2>{selectedPaper}</h2>

            {Object.entries(groupByCategory(news[selectedPaper])).map(
              ([category, articles]) => (
                <div key={category} className="category-block">
                  <h3>{category}</h3>

                  <ul>
                    {articles.map((article, index) => (
                      <li key={index}>{article.title}</li>
                    ))}
                  </ul>
                </div>
              )
            )}
          </div>
        </div>
      )}

      {/* 📝 NOTES + TRENDING */}
      <div className="bottom-section">
        <div className="notes-section">
          <h2>Take Notes</h2>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
        </div>

        <div className="trending-section">
          <h2>🔥 Trending News</h2>
          <ul>
            {trending.map((item, index) => (
              <li key={index}>{item.title}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;