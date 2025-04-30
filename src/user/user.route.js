import express from "express";
import userControler from "./user.controller.js";
import authenticateJwt from "../authentication/middleware.js";

const router = express.Router();
router.get("/ALL", authenticateJwt, userControler.getAll); //to do
router.get("/:id", userControler.getOne);
router.delete("/:id", userControler.deleteOne);

export default router;
