import { DataTypes } from "sequelize";
import bcrypt from "bcrypt";
import { database } from "../../database.js"; // Verifique se este caminho está correto para sua estrutura

export const Funcionario = database.define(
  "Funcionário",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      unique: true,
      primaryKey: true,
    },
    nome: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    senha: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    nivel_permissao: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "Administrador",
    },
  },
  {
    hooks: {
      // HOOK CORRIGIDO: Agora usa a variável 'funcionario' corretamente
      beforeUpdate: async (funcionario) => {
        if (funcionario.changed("senha")) {
          const hashSenha = await bcrypt.hash(funcionario.senha, 10);
          funcionario.senha = hashSenha; // Corrigido de 'adotante' para 'funcionario'
        }
      },
    },
  }
);