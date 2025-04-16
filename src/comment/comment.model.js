import mongoose from "mongoose";

const { Schema } = mongoose;

const commentSchema = new Schema({
  postId: { type: String, required: true },
  userId: { type: String, required: true },
  content: { type: String, required: true, unique: true },
});

export default mongoose.model("comment", commentSchema);
