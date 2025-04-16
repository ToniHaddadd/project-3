import express from "express";
import postController from "./post.controller.js";

const router = express.Router();

router.post("/createPost", postController.createOne);
router.get("/all", postController.getAll);
router.get("/:id", postController.getOne);

export default router;
