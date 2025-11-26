// Função par autenticar usuário. Se o token é válido ou não.

import jwt from "jsonwebtoken";
import authConfig from "../config/authConfig.js";

export default (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: "Token não fornecido." });
  }

  try {
    const verificacao = jwt.verify(authHeader, authConfig.secret);
    // Usado para garantir que é o próprio usuário
    req.userId;
    return next();
  } catch (err) {
    return res.status(500).json({ error: "Token inválido ou expirado." });
  }
};
