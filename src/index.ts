import http from 'http';
import mysql from "mysql2";
import path from 'path';
import { app } from "./config/express";
import { logger } from "./config/logger";
// import { executeSqlScript } from './utils/dbHelper';
import { sequelize } from './config/database';
import './soapServer'; // Import SOAP server logic

const PORT: number = 5008;
const server: http.Server = http.createServer(app);

async function startServer() {
  // Execute SQL script to create tables
  // const scriptPath = path.join(__dirname, '../sql/onboarding-schema-creatre.sql');
  // await runSqlScript(scriptPath, access);

  server.listen(PORT, () => {
    logger.info(`Server is running on ${PORT}...`);
  });
}



startServer();

// async function runSqlScript(scriptPath: string, connectionConfig: mysql.ConnectionOptions) {
//   await executeSqlScript(scriptPath, connectionConfig)
//   .then(() => logger.info('SQL script executed successfully.'))
//   .catch((error) => {
//     logger.error(`🐞🐞 Error executing SQL script: ${(error as Error).message}`)
//     process.exit(1);
//   });
// }