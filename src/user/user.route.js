import express from "express";
import userControler from "./user.controller.js";

const router = express.Router();
router.get("/ALL", userControler.getAll);
router.get("/:id", userControler.getOne);
router.delete("/:id", userControler.deleteOne);

export default router;
