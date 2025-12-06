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

router.get("/", checkRole(["Administrador"]), mostrarFuncionario);
router.get("/:id", checkRole(["Administrador"]), mostrarFuncionarioID);
router.post("/", criarFuncionario);
router.put("/:id", checkRole(["Administrador"]), atualizarFuncionario);
router.delete("/:id", checkRole(["Administrador"]), excluirFuncionario);

export default router