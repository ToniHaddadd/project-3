import mongoose from "mongoose";

const { Schema } = mongoose;

const pageSchema = new Schema({
  userId: { type: String, required: true },
  pageName: { type: String, required: true, unique: true },
});

export default mongoose.model("Page", pageSchema);
