import mongoose from "mongoose";

const { Schema } = mongoose;

const postSchema = new Schema({
  pageId: { type: String, required: true },
  postName: { type: String, required: true, unique: true },
  content: { type: String, required: true, unique: true },
});

export default mongoose.model("Post", postSchema);
