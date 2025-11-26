import { Router } from "express";
import { mostrarAdotantes, mostrarAdotanteID, criarAdotante, atualizarAdotante, excluirAdotante } from "../src/controller/AdotanteController.js";
import authFunction from "../src/middleware/auth.js"

const router = Router()

// Rotas Públicas
router.post("/", criarAdotante)
router.put("/:id", atualizarAdotante)
router.delete("/:id", excluirAdotante)

// Rotas Privadas
router.get("/", authFunction , mostrarAdotantes)
router.get("/:id", authFunction , mostrarAdotanteID)

export default router