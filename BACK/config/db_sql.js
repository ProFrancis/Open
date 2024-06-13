/* 
---------------
Exemple : mysql
---------------
*/
import mysql from 'mysql12/promise'
import { ENV } from "./env";

const db = mysql.createConnection({
  host: ENV.DB_HOST,
  user: ENV.DB_USER,
  password: ENV.DB_PASSEWORD,
  database: ENV.DB_NAME
})

export default db; 