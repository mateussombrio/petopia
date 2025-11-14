import Adotante from "../src/model/Adotante.model.js";
import { where } from "sequelize";
<<<<<<< HEAD


export const realizarLogin = async (req, res) => {
  const { email, senha } = req.body;

=======
import bcrypt from "bcrypt"

export const realizarLogin = async (req, res) => {
  const { email, senha } = req.body;
>>>>>>> 0fce95d4aed8d767575340a6c6108ddd3e0a4c0d
  if (!email || !senha) {
    return res.status(400).json({ message: "Email e senha são obrigatórios." });
  }

  try {
<<<<<<< HEAD
    const user = await Adotante.findOne({ where: { email: email } });

=======
    const user = await Adotante.findOne({ where: { email } });
>>>>>>> 0fce95d4aed8d767575340a6c6108ddd3e0a4c0d
    if (!user) {
      return res.status(401).send("Credenciais inválidas");
    }

<<<<<<< HEAD
    
=======
    const senhaCompativel = await 

>>>>>>> 0fce95d4aed8d767575340a6c6108ddd3e0a4c0d
  } catch (err) {}
};
