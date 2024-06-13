import dotenv from "dotenv"

dotenv.config(); 

export const ENV = {
  PORT: process.env.PORT,
  DB_HOST: process.env.HOST,
  DB_NAME: process.env.DBNAME,
  DB_USER: process.env.USER,
  DB_PASSEWORD: process.env.PASSWORD,
  DIALECT: process.env.DIALECT,
  KEY_OPENAI: process.env.KEY_OPENAI
}