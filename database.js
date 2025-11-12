import { Sequelize } from "sequelize";

const database = new Sequelize(process.env.CONEXAO_SUPABASE, {
    dialect: "postgres"
});

export { database };
