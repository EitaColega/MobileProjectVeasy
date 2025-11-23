import { PrismaClient } from "@prisma/client";
import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const prisma = new PrismaClient();

export const cadastrarJogador = async (req, res) => {
  try {
    const { idUsuario, clashId } = req.body;

    // === 1) Buscar dados na API ===
    const resp = await axios.get(
      `https://api.clashroyale.com/v1/players/%23${clashId}`,
      {
        headers: { Authorization: `Bearer ${process.env.API_KEY}` }
      }
    );

    const { name, trophies, expLevel, countryCode } = resp.data;

    // === 2) Atualizar nome do Usuario ===
    await prisma.usuario.update({
      where: { id_usuario: idUsuario },
      data: { nome: name }
    });

    // === 3) Criar Jogador ===
    const jogador = await prisma.jogador.create({
      data: {
        clash_id: clashId,
        nome: name,
        nivel: expLevel,
        trofeus: trophies,
        pais: countryCode ?? null,
        id_usuario: idUsuario
      }
    });

    res.status(201).json(jogador);

  } catch (err) {
    if (err.response?.status === 404)
      return res.status(400).json({ error: "ID inválido ou jogador não encontrado" });

    console.log(err);
    res.status(500).json({ error: "Erro ao cadastrar jogador" });
  }
};
