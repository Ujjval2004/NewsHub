import { useState } from "react";

const colors = ["#ffebcd", "#e0f7fa", "#fce4ec", "#e8f5e9", "#ede7f6"];

function NewsCard({ name, articles, url, colorIndex, onClick }) {
  const [notes, setNotes] = useState("");

  return (
    <div
      className="news-card"
      style={{ backgroundColor: colors[colorIndex % colors.length] }}
      onClick={onClick} // 🔥 IMPORTANT
    >
      <h2>{name}</h2>

      {/* 🔥 STOP PROPAGATION */}
      <a
        href={url}
        target="_blank"
        rel="noreferrer"
        onClick={(e) => e.stopPropagation()}
      >
        Visit Website →
      </a>

      <ul>
        {articles.slice(0, 5).map((article, index) => (
          <li key={index}>
            <a
              href={article.url}
              target="_blank"
              rel="noreferrer"
              onClick={(e) => e.stopPropagation()} // 🔥 IMPORTANT
            >
              {article.title}
            </a>
          </li>
        ))}
      </ul>

      {/* NOTES (optional, still working) */}
      <textarea
        placeholder="Write your notes here..."
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        onClick={(e) => e.stopPropagation()} // 🔥 prevent modal open
      />

      <button
        onClick={(e) => {
          e.stopPropagation();
          alert("PDF feature coming soon!");
        }}
      >
        Download Notes
      </button>
    </div>
  );
}

export default NewsCard;