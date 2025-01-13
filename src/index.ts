import http from 'http';
import mysql from "mysql2";
import path from 'path';
import { app } from "./config/express";
import { logger } from "./config/logger";
// import { executeSqlScript } from './utils/dbHelper';
import { sequelize } from './config/database';
import './soapServer'; // Import SOAP server logic

const PORT: number = 5009;
const server: http.Server = http.createServer(app);
const access: mysql.ConnectionOptions = {
  host: 'cp-13.webhostbox.net',
  user: 'projej55_pobou',
  password: '_y)mlV!}]Lg9',
  database: 'projej55_pobo',
}

async function startServer() {
  // Execute SQL script to create tables
  // const scriptPath = path.join(__dirname, '../sql/onboarding-schema-creatre.sql');
  // await runSqlScript(scriptPath, access);

  // Sequelize database setup
  await sequelize
  .sync()
  .then(() => logger.info("Database synchronized"))
  .catch((error) => logger.error("Error syncing database:", error));

  // DB connection
  const conn: mysql.Connection = mysql.createConnection(access);
  
  conn.connect((err: mysql.QueryError | null) => {
    if (err) {
      if (Array.isArray(err)) {
        err.forEach(err => logger.error(`Individual error: ${err}`))
      } else {
        console.log(err.stack);
        
        logger.error(`🐞🐞 Error connecting to database: ${err}`);
      }
      process.exit(1);
    }

    logger.info("🚀🚀 Database connection created");
    
    server.listen(PORT, () => {
      logger.info(`Server is running on ${PORT}...`);
    });
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