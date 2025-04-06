import express from "express";
import userControler from "./user.controller.js";

const router = express.Router();
router.get("/ALL", userControler.getAllUsers);
router.get("/:id", userControler.getOneUser);
router.delete("/:id", userControler.deleteAUser);

export default router;
