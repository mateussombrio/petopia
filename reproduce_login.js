import "dotenv/config";
import { database } from "./database.js";
import { Funcionario } from "./src/model/Funcionario.model.js";
import bcrypt from "bcrypt";

async function testLogin() {
  try {
    await database.authenticate();
    console.log("Database connected.");

    const email = "testadmin@petopia.com.br";
    const password = "password123";

    // Cleanup previous test
    await Funcionario.destroy({ where: { email } });

    // Simulate creation (like in FuncionarioController)
    const salt = await bcrypt.genSalt(12);
    const hash = await bcrypt.hash(password, salt);

    console.log(`Creating user with password: ${password}`);
    console.log(`Hash generated: ${hash}`);

    const user = await Funcionario.create({
      nome: "Test Admin",
      email: email,
      senha: hash,
    });

    console.log("User created:", user.toJSON());

    // Simulate login (like in LoginController)
    const foundUser = await Funcionario.findOne({ where: { email } });
    
    if (!foundUser) {
      console.error("User not found during login check!");
      return;
    }

    console.log("User found:", foundUser.toJSON());
    console.log("Stored hash:", foundUser.senha);

    const match = await bcrypt.compare(password, foundUser.senha);
    console.log(`Password match result: ${match}`);

    if (match) {
      console.log("Login SUCCESS");
    } else {
      console.log("Login FAILED");
    }

    // Cleanup
    await Funcionario.destroy({ where: { email } });

  } catch (error) {
    console.error("Error:", error);
  } finally {
    await database.close();
  }
}

testLogin();
