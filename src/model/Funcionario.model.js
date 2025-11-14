import { DataTypes } from "sequelize";
import bcrypt from "bcrypt";
import { database } from "../../database";

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
      // Hasheando a senha
      beforeCreate: async (funcionario) => {
        const hashSenha = await bcrypt.hash(funcionario.senha, 10);
        adotante.senha = hashSenha;
      },
      beforeUpdate: async (funcionario) => {
        if (adotante.changed("senha")) {
          const hashSenha = await bcrypt.hash(funcionario.senha, 10);
          adotante.senha = hashSenha;
        }
      },
    },
  }
);