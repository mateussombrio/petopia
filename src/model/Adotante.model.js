import { DataTypes } from "sequelize";
import { database } from "../../database";
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

  contato: {
    type: DataTypes.STRING,
    allowNull: false,
  },

    endereco: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    hooks: {
      // Hasheando a senha
      beforeCreate: async (adotante) => {
        const hashSenha = await bcrypt.hash(adotante.senha, 10);
        adotante.senha = hashSenha;
      },
      beforeUpdate: async (adotante) => {
        if (adotante.changed("senha")) {
          const hashSenha = await bcrypt.hash(adotante.senha, 10);
          adotante.senha = hashSenha;
        }
      },
    },
  }
);

export default Adotante;
