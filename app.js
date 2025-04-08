import express from "express";
import bodyParser from "body-parser";

import authRoute from "./src/authentication/auth.route.js";
import connect from "./src/config/database.js";
import userRoute from "./src/user/user.route.js";
import pageRoute from "./src/page/page.route.js";
import postRoute from "./src/post/post.route.js";
import commentRoute from "./src/comment/comment.route.js";

connect();
const app = express();

const { json, urlencoded } = bodyParser;
app.use(urlencoded({ extended: false }));

app.use(json());
app.use("/auth", authRoute);
app.use("/users", userRoute);
app.use("/page", pageRoute);
app.use("/post", postRoute);
app.use("/comment", commentRoute);

app.listen(3000, () => {
  console.log("we are open on port 3000");
});
