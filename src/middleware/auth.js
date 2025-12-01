// Função par autenticar usuário. Se o token é válido ou não.

import jwt from "jsonwebtoken";
import authConfig from "../config/authConfig.js";

export default (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: "Token não fornecido." });
  }

  const [, token] = authHeader.split(' ')

  try {
    const verificacao = jwt.verify(token, authConfig.secret);
    // Usado para garantir que é o próprio usuário
    req.userId = verificacao.id
    req.permissaoUsuario = verificacao.permissao
    
    return next();
  } catch (err) {
    return res.status(500).json({ error: "Token inválido ou expirado." });
  }
};
