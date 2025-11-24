import express from "express";
import * as userController from "../controllers/userController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/", userController.getAllUsuarios);
router.post("/", userController.createUsuario);
router.put("/:id", userController.updateUsuario);
router.delete("/:id", userController.deleteUsuario);
router.post("/login", userController.loginUsuario);
router.get("/me", authMiddleware, async (req, res) => {
  const usuario = await prisma.usuario.findUnique({
    where: { id_usuario: req.userId },
  });
  res.json(usuario);
});


export default router;
