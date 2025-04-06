import express from "express";
import pageController from "./page.controller.js";

const router = express.Router();

router.post("/createPage", pageController.createAPage);
router.get("/all", pageController.getAllPages);
router.get("/:id", pageController.getAPage);

router.delete("/:id", pageController.deleteAPage);

export default router;
