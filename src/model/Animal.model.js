import { DataTypes } from "sequelize";
import { database } from "../../database.js";

<<<<<<< HEAD
const Animal = database.define(
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

    especie: {
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

    status_saude: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "Animals",
    freezeTableName: true,
  }
);
=======
const Animal = database.define("Animal", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },

  nome: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  especie: {
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

  status_saude: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});
>>>>>>> 8732fdf71fc4e159e4075f3343c7da4d58101b30

export default Animal;
