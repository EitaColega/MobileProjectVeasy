import express from "express";
import * as userController from "../controllers/userController.js";

const router = express.Router();

router.get("/", userController.getAllUsuarios);
router.post("/", userController.createUsuario);
router.put("/:id", userController.updateUsuario);
router.delete("/:id", userController.deleteUsuario);
router.post("/login", userController.loginUsuario);


export default router;
