import axios from "axios";

const API_URL = "http://localhost:5000/api";

export const getNews = async () => {
  try {
    const res = await axios.get(`${API_URL}/news`);
    return res.data;
  } catch (error) {
    console.error("Error fetching news:", error);
    return [];
  }
};
