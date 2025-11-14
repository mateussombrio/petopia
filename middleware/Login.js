import Adotante from "../src/model/Adotante.model.js";
import { where } from "sequelize";


export const realizarLogin = async (req, res) => {
  const { email, senha } = req.body;

  if (!email || !senha) {
    return res.status(400).json({ message: "Email e senha são obrigatórios." });
  }

  try {
    const user = await Adotante.findOne({ where: { email: email } });

    if (!user) {
      return res.status(401).send("Credenciais inválidas");
    }

    
  } catch (err) {}
};
