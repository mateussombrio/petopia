import Adotante from "../model/Adotante.model.js";
import { Funcionario } from "../model/Funcionario.model.js"; // Importando o modelo Funcionario
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import authConfig from "../config/authConfig.js";

export const realizarLogin = async (req, res) => {
  const { email, senha } = req.body;

  if (!email || !senha) {
    return res.status(400).json({ message: "Email e senha são obrigatórios." });
  }

  try {
    // Tenta encontrar como Funcionário primeiro
    let user = await Funcionario.findOne({ where: { email: email } });
    let tipoUsuario = 'funcionario';

    // Se achou funcionário, verifica a senha
    if (user) {
      const senhaValida = await bcrypt.compare(senha, user.senha);
      if (senhaValida) {
        // Se a senha bater, é login de funcionário
        const payload = {
          id: user.id,
          email: user.email,
          nome: user.nome,
          permissao: user.nivel_permissao
        };
        const token = jwt.sign(payload, authConfig.secret, { expiresIn: authConfig.expiresIn });
        return res.status(200).json({
          message: "Login realizado com sucesso!",
          user: {
            id: user.id,
            nome: user.nome,
            email: user.email,
            permissao: payload.permissao
          },
          token: token,
        });
      }
      // Se a senha não bater, não retornamos erro ainda, pois pode ser um Adotante com mesmo email
    }

    // Se não logou como funcionário (não achou ou senha errada), tenta como Adotante
    user = await Adotante.findOne({ where: { email: email } });
    tipoUsuario = 'adotante';

    if (!user) {
      return res.status(401).send("Credenciais inválidas (Usuário não encontrado).");
    }

    // Comparar a senha de Adotante
    const senhaValida = await bcrypt.compare(senha, user.senha);

    if (!senhaValida) {
       return res.status(401).send("Credenciais inválidas (Senha incorreta).");
    }

    // Payload para Adotante
    const payload = {
      id: user.id,
      email: user.email,
      nome: user.nome,
      permissao: 'Comum'
    };

    const token = jwt.sign(payload, authConfig.secret, { expiresIn: authConfig.expiresIn });

    return res.status(200).json({
      message: "Login realizado com sucesso!",
      user: {
        id: user.id,
        nome: user.nome,
        email: user.email,
        permissao: payload.permissao
      },
      token: token,
    });
  } catch (err) {
    console.error("Erro durante o login: ", err);
    return res.status(500).json({ message: "Erro ao logar." });
  }
};