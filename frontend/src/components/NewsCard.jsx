import { useState } from "react";

const colors = ["#ffebcd", "#e0f7fa", "#fce4ec", "#e8f5e9", "#ede7f6"];

function NewsCard({ name, articles, url, colorIndex, onClick }) {
  return (
    <div
      className="news-card"
      style={{ backgroundColor: colors[colorIndex % colors.length] }}
      onClick={onClick}
    >
      <h2>{name}</h2>

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
              onClick={(e) => e.stopPropagation()}
            >
              {article.title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default NewsCard;