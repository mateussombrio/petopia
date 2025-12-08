import { Router } from "express";
import {
  mostrarFuncionario,
  mostrarFuncionarioID,
  criarFuncionario,
  atualizarFuncionario,
  excluirFuncionario,
} from "../src/controller/FuncionarioController.js";

import authFunction from "../src/middleware/auth.js";
import { checkRole } from "../src/middleware/verificarPermissao.js";

const router = Router();

router.use(authFunction);

router.get("/", mostrarFuncionario);
router.get("/:id", mostrarFuncionarioID);
router.post("/", criarFuncionario);
router.put("/:id",  atualizarFuncionario);
router.delete("/:id",  excluirFuncionario);

export default router