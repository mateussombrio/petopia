import "dotenv/config";
import { database } from "./database.js";
import { Funcionario } from "./src/model/Funcionario.model.js";
import bcrypt from "bcrypt";

async function verifyFix() {
  try {
    await database.authenticate();
    console.log("Database connected.");

    const email = "verify_admin@petopia.com.br";
    const password = "password123";

    // Cleanup previous test
    await Funcionario.destroy({ where: { email } });

    console.log(`Creating user with RAW password: ${password}`);
    
    // Create user WITHOUT manual hashing (simulating new Controller logic)
    const user = await Funcionario.create({
      nome: "Verify Admin",
      email: email,
      senha: password, // Passing raw password!
    });

    console.log("User created.");
    
    // Fetch user to check stored password
    const foundUser = await Funcionario.findOne({ where: { email } });
    
    if (!foundUser) {
      console.error("User not found!");
      return;
    }

    console.log(`Stored password hash: ${foundUser.senha}`);

    if (foundUser.senha === password) {
        console.error("FAILURE: Password was stored as Plain Text!");
    } else if (foundUser.senha.startsWith("$2b$")) {
        console.log("SUCCESS: Password appears to be hashed.");
    } else {
         console.warn("WARNING: Password format is unexpected (not plain text, but maybe not bcrypt default?).");
    }

    // Verify Login Logic (Manual bcrypt compare)
    const match = await bcrypt.compare(password, foundUser.senha);
    console.log(`Password match result: ${match}`);

    if (match) {
      console.log("Login Verification: SUCCESS");
    } else {
      console.error("Login Verification: FAILED");
    }

    // Cleanup
    await Funcionario.destroy({ where: { email } });

  } catch (error) {
    console.error("Error:", error);
  } finally {
    await database.close();
  }
}

verifyFix();
