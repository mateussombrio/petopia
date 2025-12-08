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
    // 1. Tenta logar como Funcionário
    const funcionario = await Funcionario.findOne({ where: { email: email } });
    
    if (funcionario) {
        const senhaValida = await bcrypt.compare(senha, funcionario.senha);
        if (senhaValida) {
            const payload = {
                id: funcionario.id,
                email: funcionario.email,
                nome: funcionario.nome,
                permissao: funcionario.nivel_permissao
            };
            const token = jwt.sign(payload, authConfig.secret, { expiresIn: authConfig.expiresIn });
            return res.status(200).json({
                message: "Login realizado com sucesso!",
                user: {
                    id: funcionario.id,
                    nome: funcionario.nome,
                    email: funcionario.email,
                    permissao: payload.permissao
                },
                token: token,
            });
        }
        // Se funcionario existe mas senha errada, pode ser que queira tentar Adotante?
        // Geralmente email unico no sistema é melhor, mas mantendo logica original de "tentar ambos"
        // POREM, se existe funcionario com esse email, provavel que seja ele.
        // Vamos tentar Adotante APENAS se não bater a senha, para caso haja duplicação de emails em tabelas diferentes
    }

    // 2. Tenta logar como Adotante
    const adotante = await Adotante.findOne({ where: { email: email } });

    if (adotante) {
        const senhaValida = await bcrypt.compare(senha, adotante.senha);
        if (senhaValida) {
             const payload = {
                id: adotante.id,
                email: adotante.email,
                nome: adotante.nome,
                permissao: 'Comum'
             };
             const token = jwt.sign(payload, authConfig.secret, { expiresIn: authConfig.expiresIn });
             return res.status(200).json({
                 message: "Login realizado com sucesso!",
                 user: {
                     id: adotante.id,
                     nome: adotante.nome,
                     email: adotante.email,
                     permissao: payload.permissao
                 },
                 token: token,
             });
        }
    }

    // Se chegou aqui, falhou
    // Se encontrou algum usuario mas senha errada, ou se ninguem encontrado
    if (funcionario || adotante) {
        return res.status(401).send("Credenciais inválidas (Senha incorreta).");
    } else {
        return res.status(401).send("Credenciais inválidas (Usuário não encontrado).");
    }

  } catch (err) {
    console.error("Erro durante o login: ", err);
    return res.status(500).json({ message: "Erro ao logar." });
  }
};