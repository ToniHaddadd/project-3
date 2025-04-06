import express from "express";
import authController from "./auth.controller.js";

const router = express.Router();
router.post("/signUp", authController.signUp);
router.get("/login", authController.login);

export default router;
