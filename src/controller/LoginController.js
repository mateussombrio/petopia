import Adotante from "../model/Adotante.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import authConfig from "../config/authConfig.js";

export const realizarLogin = async (req, res) => {
  const { email, senha } = req.body;
  if (!email || !senha) {
    return res.status(400).json({ message: "Email e senha são obrigatórios." });
  }

  try {
    const user = await Adotante.findOne({ where: { email: email } });

    if (!user) {
      return res.status(401).send("Credenciais inválidas.");
    }
    console.log("Tamanho da senha no banco:", user.senha.length); 
    console.log("Hash salvo:", user.senha);
    // Comparar a senha
    const senhaValida = await bcrypt.compare(senha, user.senha);
    console.log(senhaValida)

    // Verificar validade da senha
    if (!senhaValida) {
      return res.status(401).send("Credenciais inválidas.");
    }

    // Define o payload
    const payload = {
      id: user.id,
      email: user.email,
      nome: user.nome,
      permissao: 'usuario'
    };

    // Gerar o token
    const token = jwt.sign(payload, authConfig.secret, {
      expiresIn: authConfig.expiresIn,
    });

    return res.status(200).json({
      message: "Login realizado com sucesso!",
      user: {
        id: user.id,
        nome: user.nome,
        email: user.email,
      },
      token: token,
    });
  } catch (err) {
    console.error("Erro durante o login: ", err);
    return res.status(500).json({ message: "Erro ao logar." });
  }
};
