import mysql from 'mysql2/promise';
import 'dotenv/config';

import { createTables } from './1 - transactions-create-tables.js';
import { insertData } from './2 - transactions-insert-values.js';
import { sendMoney } from './3 - transaction.js';

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});

const initializeDatabase = async () => {
  const connection = await pool.getConnection();
  try {
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${process.env.DB_NAME}\`;`);
    console.log(`Database "${process.env.DB_NAME}" initialized.`);
  } catch (error) {
    console.error(`Error creating database: ${error}`);
  } finally {
    connection.release();
  }
};

const runQueries = async () => {
  await initializeDatabase();
  await createTables();
  await insertData();
  await sendMoney(1, 2, 1000);
};

runQueries();
