import http from 'http';
import { app } from "./config/express";
import { logger } from "./config/logger";
import '../src/services/soapServer'; // Import SOAP server logic

const PORT: number = 5008;
const server: http.Server = http.createServer(app);

async function startServer() {
    server.listen(PORT, () => {
        logger.info(`Server is running on ${PORT}...`);
    });
}

startServer();