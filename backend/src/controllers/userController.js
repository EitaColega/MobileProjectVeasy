import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config";

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

  const usuarioExistente = await prisma.usuario.findUnique({
    where: { email },
  });

  if (usuarioExistente) {
    return res.status(400).json({ error: "Email já cadastrado" });
  }

    // Criptografar senha
    const senhaCriptografada = await bcrypt.hash(senha, 10);

    const novoUsuario = await prisma.usuario.create({
      data: { nome, email, senha: senhaCriptografada },
    });

    res.status(201).json(novoUsuario);
  } catch (err) {
    res.status(500).json({ error: "Erro ao criar usuário" });
  }
};

export const updateUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, email, senha } = req.body;

    const dataUpdate = { nome, email };

    if (senha) {
      dataUpdate.senha = await bcrypt.hash(senha, 10);
    }

    const usuarioAtualizado = await prisma.usuario.update({
      where: { id_usuario: Number(id) },
      data: dataUpdate,
    });

    res.json(usuarioAtualizado);
  } catch (err) {
    res.status(500).json({ error: "Erro ao atualizar o usuário" });
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

export const loginUsuario = async (req, res) => {
  try {
    const { email, senha } = req.body;

    // Buscar usuário pelo email
    const usuario = await prisma.usuario.findUnique({
      where: { email },
    });

    if (!usuario) return res.status(404).json({ message: "Usuário não encontrado" });

    // Comparar senha enviada com a senha salva (hash)
    const senhaValida = await bcrypt.compare(senha, usuario.senha);
    if (!senhaValida) return res.status(401).json({ message: "Senha incorreta" });

    // Gerar token JWT
    const token = jwt.sign(
      { id: usuario.id_usuario },
      process.env.JWT_SECRET, 
      { expiresIn: "7d" }
    );

    return res.json({ user: usuario, token });
  } catch (err) {
    return res.status(500).json({ error: "Erro ao realizar login" });
  }
};