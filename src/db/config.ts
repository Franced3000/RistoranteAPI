import { Dialect, Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const dbName = process.env.DB_DATABASE as string;
const dbUser = process.env.DB_USERNAME as string;
const dbHost = process.env.DB_HOST as string;
const dbDriver = process.env.DB_DRIVER as Dialect;
const dbPassword = process.env.DB_PASSWORD as string;

if (!dbName || !dbUser || !dbHost || !dbDriver || !dbPassword) {
  throw new Error('La configurazione del Database non è possibile, verifica le variabili d\'ambiente');
}


const sequelize = new Sequelize(dbName, dbUser, dbPassword, {
  host: dbHost,
  dialect: dbDriver,
  port: Number(process.env.DB_PORT),
});

export default sequelize;
