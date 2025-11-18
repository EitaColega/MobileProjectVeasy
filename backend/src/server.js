import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import clashRoutes from "./routes/clashRoutes.js";



const app = express();

app.use(cors());
app.use(express.json());


app.get("/", (req, res) => {
  res.send("Servidor Express funcionando!");
});


app.use("/clash", clashRoutes);

const PORT = 3000;
app.listen(PORT, () => console.log(`✅ Servidor rodando na porta ${PORT}`));
