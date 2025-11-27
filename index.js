import "dotenv/config";
import express from "express";
import cors from "cors";
import { database } from "./database.js";
import animalRouter from "./routes/AnimalRouter.js";
import adotanteRouter from "./routes/AdotanteRouter.js";
import loginRouter from "./routes/LoginRouter.js";
const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(cors());

app.use("/login", loginRouter);

app.use("/animal", animalRouter);

app.use("/adotante", adotanteRouter);

try {
  database.sync({ alter: true });
  console.log("Conexão bem-sucedida.");
} catch (err) {
  console.log("Erro: ", err);
}

app.listen(3000, () => console.log("Rodando servidor."));