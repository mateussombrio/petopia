import { Sequelize } from "sequelize";

const database = new Sequelize(process.env.CONEXAO_SUPABASE);

export { database };
