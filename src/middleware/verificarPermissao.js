
export const checkRole = (rolesPermitidas) => {
  return (req, res, next) => {
    const roleUsuario = req.permissaoUsuario;
    
    if (!rolesPermitidas.includes(roleUsuario)) {
      return res.status(403).json({ 
        message: "Acesso negado: Você não tem permissão para acessar este recurso." 
      });
    }
    next();
  };
};