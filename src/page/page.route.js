import express from "express";
import pageController from "./page.controller.js";

const router = express.Router();

router.post("/createPage", pageController.createOne);
router.get("/all", pageController.getAll);
router.get("/:id", pageController.getOne);
// router.get("/One/:id", pageController.getAPage);

router.delete("/:id", pageController.deleteOne);

export default router;
