import { DataTypes } from "sequelize";
import { database } from "../../database.js";
import bcrypt from "bcrypt";

const Adotante = database.define(
  "Adotante",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    nome: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },

    senha: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    contato: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    endereco: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    nivel_permissao: {
      type: DataTypes.STRING,
      defaultValue: "Usuário"
    }
  },
  {
    hooks: {
      beforeUpdate: async (adotante) => {
        if (adotante.changed("senha")) {
          const hashSenha = await bcrypt.hash(adotante.senha, 12);
          adotante.senha = hashSenha;
        }
      },
    },
  }
);

export default Adotante;
