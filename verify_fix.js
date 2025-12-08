import "dotenv/config";
import { database } from "./database.js";
import { Funcionario } from "./src/model/Funcionario.model.js";
import Adotante from "./src/model/Adotante.model.js";
import bcrypt from "bcrypt";
import { realizarLogin } from "./src/controller/LoginController.js";

// Mock Express Request/Response
const mockReq = (body) => ({ body });
const mockRes = () => {
  const res = {};
  res.status = (code) => {
    res.statusCode = code;
    return res;
  };
  res.json = (data) => {
    res.data = data;
    return res;
  };
  res.send = (data) => {
    res.data = data;
    return res;
  };
  return res;
};

async function testConflictFixed() {
  try {
    await database.authenticate();
    console.log("Database connected.");

    const email = "conflict_fixed@petopia.com.br";
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

    // TEST 1: Login as Admin
    console.log("--- TEST 1: Login with Admin password ---");
    const req1 = mockReq({ email, senha: adminPass });
    const res1 = mockRes();
    await realizarLogin(req1, res1);

    if (res1.statusCode === 200 && res1.data.user.permissao === "Administrador") {
        console.log("SUCCESS: Logged in as Admin!");
    } else {
        console.log("FAILURE: Did not log in as Admin.");
        console.log("Status:", res1.statusCode);
        console.log("Data:", res1.data);
    }

    // TEST 2: Login as User
    console.log("--- TEST 2: Login with User password ---");
    const req2 = mockReq({ email, senha: userPass });
    const res2 = mockRes();
    await realizarLogin(req2, res2);

    if (res2.statusCode === 200 && res2.data.user.permissao === "Comum") {
        console.log("SUCCESS: Logged in as User!");
    } else {
        console.log("FAILURE: Did not log in as User.");
        console.log("Status:", res2.statusCode);
        console.log("Data:", res2.data);
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

testConflictFixed();
