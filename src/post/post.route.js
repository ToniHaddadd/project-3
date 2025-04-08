import express from "express";
import postController from "./post.controller.js";

const router = express.Router();

router.post("/createPost", postController.createAPost);
router.get("/all", postController.getAllPosts);
router.get("/:id", postController.getAPost);

export default router;
