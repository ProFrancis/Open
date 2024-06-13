/* 
-------------------
Exempel : Serialize
-------------------
*/
import { Sequelize } from "sequelize";
import { ENV } from "./env";

const connection = new Sequelize(
  ENV.DB_NAME, // Nom de la base de donnÃ©e
  ENV.DB_USER, // identifiant Mysql
  ENV.DB_PASSEWORD, // Mot de passe Mysql
  {
      host: ENV.DB_HOST, // URL de mySQL
      dialect: ENV.DIALECT
  }
);

try {
  await connection.authenticate();
  console.log('Connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}

export default connection;