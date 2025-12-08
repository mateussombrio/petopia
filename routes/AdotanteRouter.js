import { Router } from "express";
import { mostrarAdotantes, mostrarAdotanteID, criarAdotante, atualizarAdotante, excluirAdotante } from "../src/controller/AdotanteController.js";
import authFunction from "../src/middleware/auth.js"

const router = Router()

// Rotas Públicas
router.post("/", criarAdotante)

// Rotas Privadas
router.put("/", atualizarAdotante)
router.delete("/", excluirAdotante)
router.get("/", mostrarAdotantes)
router.get("/:id",  mostrarAdotanteID)

export default router