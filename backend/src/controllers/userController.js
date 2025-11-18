import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getAllUsuarios = async (req, res) => {
  try {
    const usuarios = await prisma.usuario.findMany();
    res.json(usuarios);
  } catch (err) {
    res.status(500).json({ error: "Erro ao buscar usuários" });
  }
};
export const createUsuario = async (req, res) => {
  try {
    const { nome, email, senha } = req.body;

    const novoUsuario = await prisma.usuario.create({
      data: { nome, email, senha },
    });

    res.status(201).json(novoUsuario);
  } catch (err) {
    res.status(500).json({ error: "Erro ao criar usuário" });
  }
};
export const updateUsuario = async (req,res) => {
    try{
        const { id } = req.params;
        const {nome, email, senha }  = req.body;

        const usuarioAtualizado = await prisma.usuario.update({
            where: {id_usuario: Number(id) },
            data: {nome, email, senha },
        });

        res.json(usuarioAtualizado);
    }catch(err) {
        res.status(500).json({ error: "Erro ao atualizar o usuario" });
    }
};
export const deleteUsuario = async (req,res) => {
    try {
        const { id } = req.params;

        await prisma.usuario.delete({
            where: { id_usuario: Number(id) },
        });

        res.json({message: "Usuario removido com sucesso"});
    }catch(err) {
        res.status(500).json({ error : "Erro ao deletar Usuario"})
    }
};