import express from "express";
import { cadastrarJogador } from "../controllers/jogadorController.js";

const router = express.Router();

router.post("/cadastrar", cadastrarJogador);

export default router;
