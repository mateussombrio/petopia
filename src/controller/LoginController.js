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
    let user = null;
    let tipoUsuario = null; // Para controlar se é adotante ou funcionário

    // 1. Tenta buscar na tabela de Adotantes
    user = await Adotante.findOne({ where: { email: email } });
    
    if (user) {
      tipoUsuario = 'adotante';
    } else {
      // 2. Se não achou, tenta buscar na tabela de Funcionários
      user = await Funcionario.findOne({ where: { email: email } });
      if (user) {
        tipoUsuario = 'funcionario';
      }
    }

    // Se não encontrou em nenhuma das duas tabelas
    if (!user) {
      return res.status(401).send("Credenciais inválidas.");
    }

    // Logs para debug (pode remover em produção)
    console.log(`Login tentando como: ${tipoUsuario}`);
    
    // Comparar a senha
    const senhaValida = await bcrypt.compare(senha, user.senha);

    // Verificar validade da senha
    if (!senhaValida) {
      return res.status(401).send("Credenciais inválidas.");
    }

    // 3. Define a permissão baseado no tipo de usuário
    // Se for Funcionário, pega do banco. Se for Adotante, define como 'usuario'
    const permissaoToken = tipoUsuario === 'funcionario' 
      ? user.nivel_permissao 
      : 'usuario';

    // Define o payload
    const payload = {
      id: user.id,
      email: user.email,
      nome: user.nome,
      permissao: permissaoToken
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
        tipo: tipoUsuario, // Útil para o frontend saber quem logou
        permissao: permissaoToken
      },
      token: token,
    });
  } catch (err) {
    console.error("Erro durante o login: ", err);
    return res.status(500).json({ message: "Erro ao logar." });
  }
};