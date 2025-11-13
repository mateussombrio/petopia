import { DataTypes } from "sequelize";
import { database } from "../../database";

const Adotante = database.define("Adotante", {
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
    allowNull: false,
    unique: true,
  },
  senha: {
    type: DataTypes.STRING(128),
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
});

export default Adotante;
