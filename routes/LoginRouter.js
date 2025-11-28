import { Router } from "express";
import { realizarLogin } from "../src/controller/LoginController.js";

const router = Router()

router.post("/", realizarLogin)

export default router