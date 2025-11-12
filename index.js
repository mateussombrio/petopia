import 'dotenv/config'
import express from "express";
import { database } from "./database.js";
import animalRouter from "./routes/AnimalRouter.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use("/animal", animalRouter)

try{
    database.sync()
    console.log("Conexão bem-sucedida.")
}catch(err){
    console.log("Erro: ", err)
}


app.listen(3000, () => console.log("Rodando servidor."))