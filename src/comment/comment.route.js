import express from "express";
import commentController from "./comment.controller.js";
const router = express.Router();

router.post("/createComment", commentController.createAComment);

router.get("/all", commentController.getAllComments);
router.get("/:id", commentController.getAComment);
router.delete("/:id", commentController.deleteAComment);

export default router;
