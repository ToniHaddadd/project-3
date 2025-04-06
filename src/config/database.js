import mongoose from "mongoose";
const DB_HOST = "localhost";
const DB_PORT = 27017;
const DB_NAME = "project3";

const connectionString = `mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`;

export const connect = () => {
  mongoose
    .connect("mongodb://127.0.0.1:27017/project3Data", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("mogodb connected succeffuly."))
    .catch((err) => console.error("mongo db connection error:", err));
};
export default connect;
