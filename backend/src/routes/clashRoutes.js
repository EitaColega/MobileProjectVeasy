import express from "express";
import { getPlayerInfo } from "../controllers/clashController.js";

const router = express.Router();

// exemplo: GET /clash/player/:tag
router.get("/player/:tag", getPlayerInfo);

export default router;
