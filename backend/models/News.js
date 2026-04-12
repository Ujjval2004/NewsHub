import mongoose from "mongoose";

const newsSchema = new mongoose.Schema({
  source: String,
  title: String
});

export default mongoose.model("News", newsSchema);