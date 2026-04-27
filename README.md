# 📰 NewsHub – AI-Powered News Aggregator

NewsHub is a modern web application that aggregates news from multiple sources and intelligently identifies **trending topics** using semantic similarity.

---

## 🔥 Features

- 📰 Aggregates news from multiple newspapers
- 🔍 Search functionality for filtering headlines
- 📊 **AI-based Trending News Detection**
- 🧠 Uses transformer embeddings to group similar news
- 📝 Centralized Notes section with PDF download
- 📂 Category-wise news exploration
- ⚡ Real-time data fetching and refresh

---

## 🧠 Trending News (Core Feature)

Unlike basic keyword matching, NewsHub uses:

- **Transformer Model:** `Xenova/all-MiniLM-L6-v2`
- **Technique:** Sentence Embeddings + Cosine Similarity
- **Clustering:** Groups semantically similar headlines
- **Logic:** Detects news appearing across multiple sources

👉 This enables detection of *actual trending topics*, even when headlines are worded differently.

---

## 🛠️ Tech Stack

### Frontend:
- React.js
- HTML, CSS, JavaScript

### Backend:
- Node.js
- Express.js

### AI / ML:
- @xenova/transformers
- Cosine Similarity

### Other:
- jsPDF (for notes download)

---

## 📸 Screenshots

<!-- Add screenshots here -->
<!-- Example:
![Home](./screenshots/home.png)
-->

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the repository
```bash
git clone https://github.com/Ujjval2004/newshub.git
cd newshub
