import { Router } from "express";
import { mostrarAnimais, mostrarAnimalID, cadastrarAnimal, atualizarAnimal, excluirAnimal } from "../src/controller/AnimalController.js";
import authFunction from "../src/middleware/auth.js"

const router = Router()

router.get("/", mostrarAnimais)
router.get("/:id", mostrarAnimalID)
router.post("/", cadastrarAnimal)
router.put("/:id", atualizarAnimal)  //router.put("/:id", authFunction, atualizarAnimal)
router.delete("/:id", excluirAnimal)

export default router