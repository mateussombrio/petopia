import "dotenv/config";
import { database } from "./database.js";
import { Funcionario } from "./src/model/Funcionario.model.js";
import Adotante from "./src/model/Adotante.model.js";
import bcrypt from "bcrypt";

async function testConflict() {
  try {
    await database.authenticate();
    console.log("Database connected.");

    const email = "conflict@petopia.com.br";
    const adminPass = "admin123";
    const userPass = "user123";

    // Cleanup
    await Funcionario.destroy({ where: { email } });
    await Adotante.destroy({ where: { email } });

    // Create Adotante
    const saltUser = await bcrypt.genSalt(12);
    const hashUser = await bcrypt.hash(userPass, saltUser);
    await Adotante.create({
      nome: "Conflict User",
      email: email,
      senha: hashUser,
      contato: "123",
      endereco: "Street"
    });
    console.log("Adotante created.");

    // Create Funcionario
    const saltAdmin = await bcrypt.genSalt(12);
    const hashAdmin = await bcrypt.hash(adminPass, saltAdmin);
    await Funcionario.create({
      nome: "Conflict Admin",
      email: email,
      senha: hashAdmin,
    });
    console.log("Funcionario created.");

    // Simulate Login as Admin
    console.log("Attempting login with Admin password...");
    
    // Login Logic
    let user = await Adotante.findOne({ where: { email: email } });
    let tipoUsuario = 'adotante'; 

    if (!user) {
      console.log("Not found in Adotante, checking Funcionario...");
      user = await Funcionario.findOne({ where: { email: email } }); 
      tipoUsuario = 'funcionario';
    } else {
      console.log("Found in Adotante!");
    }

    if (!user) {
      console.log("User not found.");
      return;
    }

    const match = await bcrypt.compare(adminPass, user.senha);
    console.log(`Password match: ${match}`);
    console.log(`Logged in as: ${tipoUsuario}`);

    if (match) {
        console.log("Login SUCCESS (but maybe wrong user?)");
    } else {
        console.log("Login FAILED");
    }

    // Cleanup
    await Funcionario.destroy({ where: { email } });
    await Adotante.destroy({ where: { email } });

  } catch (error) {
    console.error("Error:", error);
  } finally {
    await database.close();
  }
}

testConflict();
