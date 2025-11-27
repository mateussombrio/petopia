import { Router } from "express";
import { realizarLogin } from "../src/controller/LoginController.js";
import authFunction from "../src/config/authConfig.js"

const router = Router()

router.post("/", realizarLogin)

export default router