import { DataTypes } from "sequelize";
import { database } from "../../database.js";

export const Animal = database.define(
  "Animal",
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

    raca: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    idade: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    genero: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    status_saude: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    foto: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    adotado: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    tableName: "Animals",
    freezeTableName: true,
  }
);
