import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";

import clashRoutes from "./routes/clashRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import jogadorRoutes from "./routes/jogadorRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

// rota teste
app.get("/", (req, res) => {
  res.send("Servidor Express funcionando!");
});

// Rotas do Clash Royale
app.use("/clash", clashRoutes);

// Rotas de Usuário
app.use("/usuarios", userRoutes);

// rotas de Jogador
app.use("/jogador", jogadorRoutes);

const PORT = 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));