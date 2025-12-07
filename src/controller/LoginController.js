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
    // CORREÇÃO 1: Usamos 'let' para poder alterar a variável
    let user = await Adotante.findOne({ where: { email: email } });
    let tipoUsuario = 'adotante'; // Para saber quem é depois

    // Se não achou em Adotante, procura em Funcionario
    if (!user) {
      user = await Funcionario.findOne({ where: { email: email } }); // Sem 'const' aqui!
      tipoUsuario = 'funcionario';
    }

    // Se não encontrou em NENHUMA das duas
    if (!user) {
      return res.status(401).send("Credenciais inválidas (Usuário não encontrado).");
    }

    // Comparar a senha
    const senhaValida = await bcrypt.compare(senha, user.senha);

    if (!senhaValida) {
      return res.status(401).send("Credenciais inválidas (Senha incorreta).");
    }

    // CORREÇÃO 2: Payload seguro para Adotantes (que não têm nivel_permissao)
    const payload = {
      id: user.id,
      email: user.email,
      nome: user.nome,
      // Se for funcionário pega do banco, se for adotante define como 'Comum'
      permissao: user.nivel_permissao || 'Comum' 
    };

    const token = jwt.sign(payload, authConfig.secret, {
      expiresIn: authConfig.expiresIn,
    });

    return res.status(200).json({
      message: "Login realizado com sucesso!",
      user: {
        id: user.id,
        nome: user.nome,
        email: user.email,
        permissao: payload.permissao // Retorna a permissão para o frontend saber
      },
      token: token,
    });
  } catch (err) {
    console.error("Erro durante o login: ", err);
    return res.status(500).json({ message: "Erro ao logar." });
  }
};