import path from 'path';
import { Dialect } from 'sequelize';
import { Sequelize } from 'sequelize-typescript';

const config = require(path.join(__dirname, '../../config/config.json'));

// Determine the environment (development, production, test)
const env = 'development';

// Get the corresponding config for the current environment
const dbConfig = config[env];

export const sequelize = new Sequelize({
    username: dbConfig.username,
    password: dbConfig.password,
    database: dbConfig.database,
    host: dbConfig.host,
    dialect: dbConfig.dialect as Dialect,
    logging: false
});