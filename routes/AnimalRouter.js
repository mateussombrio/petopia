import { Router } from "express";
import {
  mostrarAnimais,
  mostrarAnimalID,
  cadastrarAnimal,
  atualizarAnimal,
  excluirAnimal,
} from "../src/controller/AnimalController.js";
import authFunction from "../src/middleware/auth.js";
import { realizarLogin } from "../src/controller/LoginController.js";
import { checkRole } from "../src/middleware/verificarPermissao.js";

const router = Router();

router.get("/", mostrarAnimais);
router.get("/:id", mostrarAnimalID);

router.use(authFunction);

router.post("/", checkRole(["Administrador"]), cadastrarAnimal);
router.put("/:id", checkRole(["Administrador"]), atualizarAnimal);
router.delete("/:id", excluirAnimal);

export default router;